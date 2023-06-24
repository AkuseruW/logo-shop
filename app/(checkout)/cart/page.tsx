import Link from "next/link";
import Image from "next/image";
import { Metadata } from 'next';
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { Product, ProductCart } from "@/type";
import { CART_COOKIE_KEY } from "@/utils/const";
import CartItems from "@/components/layouts/cart";
import emptyCart from "@/public/images/empty-cart.svg";

export const metadata: Metadata = {
  title: 'Cart',
  description: 'Your shopping cart',
};

const getProductsCart = async ({ itemsCookies }: { itemsCookies: any }): Promise<Product[] | ProductCart[]> => {
  const data = await prisma.products.findMany({
    where: {
      AND: [{ id: { in: itemsCookies.map((item: any) => item.id) } }, { publish: true }],
    },
  });

  const products = data.map(({ updatedAt, createdAt, ...rest }) => {
    const cartItem = itemsCookies.find((item: any) => item.id === rest.id);
    return {
      ...rest,
      quantity: cartItem ? cartItem.quantity : 1,
    };
  });

  prisma.$disconnect();
  return products;
};

const Cart = async () => {
  const cookieStore = cookies();
  const cartItems = cookieStore.get(CART_COOKIE_KEY);
  const itemsCookies = cartItems ? JSON.parse(cartItems.value) : [];

  const items = await getProductsCart({ itemsCookies });

  return (
    <div>
      {items.length > 0 && (
        <div>
          <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
            <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
              Shopping Cart
            </div>
          </div>
          {/* @ts-ignore */}
          <CartItems data={items} />
        </div>
      )}

      {/* empty screen */}
      {items.length < 1 && (
        <div className="flex-[2] flex flex-col items-center pb-[50px] mt-8">
          <Image
            src={emptyCart.src}
            width={300}
            height={300}
            className="w-[300px] md:w-[400px]"
            alt="{emptyCart.name}"
          />
          <span className="text-xl font-bold">Your cart is empty</span>
          <Link
            href="/products"
            className="py-4 px-8 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 mt-8"
          >
            Continue Shopping
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
