'use client'
import Image from 'next/image';
import { useContext } from 'react';
import { Products } from '@prisma/client';
import { useRouter } from 'next/navigation';
import CartContext from '@/context/CartContext';

interface ProductCart extends Products {
  subtitle: string;
  image: string;
  quantity: number;
}

interface CartItemProps {
  item: ProductCart;
  qty: number;
  handleQtyChange: (item: string, newQty: number) => void;
  handleRemove: (itemId: string) => void;
}

const CartListItem = ({ item, qty, handleQtyChange }: CartItemProps) => {
  const router = useRouter();
  const { updateItemQty, removeItemFromCart }: any = useContext(CartContext);

  const handleQtySelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newQty = parseInt(e.target.value);
    handleQtyChange(item.id, newQty);
    updateItemQty(item.id, newQty);
  };

  const handleRemoveClick = () => {
    removeItemFromCart(item.id);
    router.refresh();
  };

  return (
    <div className="flex py-5 gap-3 md:gap-5 border-b">
      <div className="shrink-0 aspect-square w-[50px] md:w-[120px]">
        <Image src={item.cover} alt={item.name} width={120} height={120} />
      </div>
      <div className="w-full flex flex-col">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="text-lg md:text-2xl font-semibold text-black/[0.8]">
            {item.name}
          </div>
          <div className="text-sm md:text-md font-medium text-black/[0.5] block md:hidden">
            {item.subtitle}
          </div>
          <div className="text-sm md:text-md font-bold text-black/[0.5] mt-2">
            &euro;{item.price}
          </div>
        </div>
        <div className="text-md font-medium text-black/[0.5] hidden md:block">
          {item.subtitle}
        </div>
        <div className="flex items-center justify-between mt-4">
          <div
            className={
              'flex items-center text-black/[0.5] text-sm md:text-md ' +
              (item.stock === 0 ? 'text-red-500' : '')
            }
          >
            {item.stock > 0 ? (
              <div className="mt-3">
                <label
                  htmlFor="qty"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Quantity
                </label>
                <select
                  value={qty}
                  onChange={handleQtySelection}
                  id="qty"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                  {Array.from({ length: item.stock }, (_, index) => (
                    <option key={index + 1} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div className="mt-6">Out of stock</div>
            )}
          </div>
          <div className="flex">
            <button
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-500"
              onClick={handleRemoveClick}>
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartListItem;
