import { cache } from 'react'
import Navbar from '../navbar';
import TopHeader from './top-head';
import { getAllProducts } from '@/controller/products/getProducts';

const getProducts = async () => {
    const products = await getAllProducts()

    return products
}

const Header = async () => {
    const { products } = await getProducts()

    return (
        <header className="">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* @ts-expect-error Server Component */}
                <TopHeader />
            </div>
            <hr />
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8  ">
                <Navbar products={products} />
            </nav>
        </header>
    );
}

export default Header