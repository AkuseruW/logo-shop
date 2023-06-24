import Image from "next/image";
import Link from "next/link";
import { TagIcon, UserGroupIcon, RectangleStackIcon, Cog6ToothIcon, ArchiveBoxIcon, ChartPieIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';

const Aside = () => {
  return (
    <aside className="hidden lg:block w-1/5 bg-white shadow-md">
      <header className="p-4">
        <div className="flex items-center mb-6">
          <Image className="h-8 w-auto mr-2" src="https://via.placeholder.com/50" width={50} height={50} alt="Logo" />
          <h2 className="text-lg font-bold text-gray-900">Logo</h2>
        </div>
      </header>
      <nav className="flex-grow mt-5 h-4/5">
        <ul className="space-y-4 flex flex-col justify-between">
          <li className="pl-4 py-2">
            <Link href="/dashboard" className="flex items-center text-gray-800 hover:text-gray-600 font-medium">
              <ChartPieIcon className="h-6 w-6 mr-3" />
              <span className="text-lg">Dashboard</span>
            </Link>
          </li>
          <li className="pl-4 py-2">
            <Link href="/dashboard/products" className="flex items-center text-gray-800 hover:text-gray-600 font-medium">
              <TagIcon className="h-6 w-6 mr-3" />
              <span className="text-lg">Products</span>
            </Link>
          </li>
          <li className="pl-4 py-2">
            <Link href="/dashboard/categories" className="flex items-center text-gray-800 hover:text-gray-600 font-medium">
              <RectangleStackIcon className="h-6 w-6 mr-3" />
              <span className="text-lg">Categories</span>
            </Link>
          </li>
          <li className="pl-4 py-2">
            <Link href="/dashboard/orders" className="flex items-center text-gray-800 hover:text-gray-600 font-medium">
              <ArchiveBoxIcon className="h-6 w-6 mr-3" />
              <span className="text-lg">Orders</span>
            </Link>
          </li>
          <li className="pl-4 py-2">
            <Link href="/dashboard/customers" className="flex items-center text-gray-800 hover:text-gray-600 font-medium">
              <UserGroupIcon className="h-6 w-6 mr-3" />
              <span className="text-lg">Customers</span>
            </Link>
          </li>
          <li className="pl-4 py-2">
            <Link href="/dashboard/settings" className="flex items-center text-gray-800 hover:text-gray-600 font-medium">
              <Cog6ToothIcon className="h-6 w-6 mr-3" />
              <span className="text-lg">Settings</span>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="pl-4">
        <Link href="/" className="flex items-center text-gray-800 hover:text-gray-600 font-medium mt-auto">
          <ArrowLeftOnRectangleIcon className="h-6 w-6 mr-3" />
          <span className="text-lg">Logout</span>
        </Link>
      </div>
    </aside>
  );
};

export default Aside;




