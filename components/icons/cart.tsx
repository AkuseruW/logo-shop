import { ShoppingBagIcon } from '@heroicons/react/24/outline';


export default function CartIcon({ quantity }: { quantity?: number }) {
  return (
    <div className="p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-700">
      <ShoppingBagIcon className='h-6 w-6' />
      {quantity ? (
        <div className="absolute bottom-0 left-0 -mb-3 -ml-3 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-black text-xs text-white dark:border-black dark:bg-white dark:text-black">
          {quantity}
        </div>
      ) : null}
    </div>
  );
}
