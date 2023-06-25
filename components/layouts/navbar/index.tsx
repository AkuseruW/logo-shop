'use client';
import { useState } from 'react';
import SearchDialog from './search';
import MobileMenu from './mobileMenu';
import { Products } from '@prisma/client';
import CartModal from '@/components/cart/modal';
import { NavigationMenuHead } from './navigation';
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, HeartIcon } from '@heroicons/react/24/outline';


const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'Trends', href: '/trends' },
  { name: 'Blog', href: '/blog' },
];

const Navbar = ({ products }: { products: Products[] }) => {
  const [open, setOpen] = useState(false);
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <MobileMenu open={open} onClose={() => setOpen(false)} navigation={navigation} />

      <nav className="bg-white" aria-label="Top">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Mobile menu */}
            <button
              type="button"
              className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
              onClick={() => setOpen(true)}
            >
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Logo */}
            <div className="flex-shrink-0 w-16">
              {/*display the logo */}
            </div>

            {/* Navigation */}
            <div className="flex-grow hidden lg:flex justify-center w-64">
              {/* <div>
                {navigation.map((page) => (
                  <Link key={page.name} href={page.href} className="text-sm font-medium text-gray-700 hover:text-gray-800 mx-4">
                    {page.name}
                  </Link>
                ))}
              </div> */}
              <NavigationMenuHead />
            </div>

            {/* Icons */}
            <div className="flex items-center ml-auto space-x-2">
              {/* Search */}
              <div className="flex ml-2">
                <button
                  className="p-2 text-gray-400 hover:text-gray-500"
                  onClick={() => setOpenSearch(true)}
                >
                  <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                </button>
                <SearchDialog open={openSearch} onOpenChange={setOpenSearch} products={products} />
              </div>

              {/* Favorite */}
              <div className="flex ml-2">
                <button className="p-2 text-gray-400 hover:text-gray-500">
                  <HeartIcon className="h-6 w-6" />
                </button>
              </div>

              {/* Cart */}
              <div className="ml-2">
                <div className="group -m-2 flex items-center">
                  <CartModal isOpen={cartIsOpen} onClose={() => setCartIsOpen(false)} />
                  <button
                    aria-label="Open cart"
                    onClick={() => setCartIsOpen(true)}
                    className="p-2 text-gray-400 hover:text-gray-500"
                  >
                    <ShoppingBagIcon className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
