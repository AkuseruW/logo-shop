import { useState, useContext } from "react";
import CartModal from "@/components/cart/modal";
import CartContext from "@/context/CartContext";
import { Product } from "@/type";

interface AddToCartProps {
  item: Product;
  qty: number;
}

export function AddToCart({ item, qty }: AddToCartProps) {
  const [cartIsOpen, setCartIsOpen] = useState(false);
  //@ts-ignore
  const { addItemToCart } = useContext(CartContext);


  const addToCartHandler = () => {
    addItemToCart({
      id: item.id,
      cover: item.cover,
      name: item.name,
      price: item.price,
      slug: item.slug,
      stock: item.stock,
      quantity: qty,
    });
    setCartIsOpen(true);
  }

  return (
    <>
      <CartModal isOpen={cartIsOpen} onClose={() => setCartIsOpen(false)} />
      <button
        type="submit"
        className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-black py-3 px-8 text-base font-medium text-white hover:bg-stone-800 focus:outline-none focus:ring-2 focus:bg-black-500 focus:ring-offset-2"
        onClick={addToCartHandler}
        disabled={item.stock === 0}
      >
        {item.stock === 0 ? "Out of stock" : "Add to cart"}
      </button>
    </>
  );
}
