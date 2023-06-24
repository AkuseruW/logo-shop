'use client'
import Summary from './summary';
import { Products } from '@prisma/client';
import CartListItem from './cartListItem';
import { useRouter } from 'next/navigation';
import CartContext from '@/context/CartContext';
import { useContext, useState, useEffect } from 'react';

interface ProductCart extends Products {
  image: string;
  subtitle: string;
  quantity: number;
}

const CartItems = ({ data }: { data: ProductCart[] }) => {
  const router = useRouter();
  const { updateItemQty, removeItemFromCart }: any = useContext(CartContext);
  const [qty, setQty] = useState(() => {
    const quantities: Record<string, number> = {};
    data.forEach((item) => {
      quantities[item.id] = item.quantity;
    });
    return quantities;
  });

  useEffect(() => {
    router.refresh();
  }, [router]);

  const handleQtyChange = (itemId: string, newQty: number) => {
    setQty((prevQty) => ({
      ...prevQty,
      [itemId]: newQty,
    }));
    updateItemQty(itemId, newQty);
  };

  const handleRemove = (itemId: string) => {
    removeItemFromCart(itemId);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-12 py-10">
      <div className="flex-[2]">
        <div className="text-lg font-bold">Cart Items</div>
        {data.map((item, index: number) => (
          <CartListItem
            key={index}
            item={item}
            qty={qty[item.id]}
            handleQtyChange={handleQtyChange}
            handleRemove={handleRemove}
          />
        ))}
      </div>
      <div className="flex-[1]">
        <Summary qty={qty} data={data} />
      </div>
    </div>
  );
};

export default CartItems;
