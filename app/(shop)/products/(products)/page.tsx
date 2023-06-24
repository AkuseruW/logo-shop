import { Metadata } from 'next';
import { Suspense } from 'react';
import Pagination from "@/components/pagination";
import { GetProducts } from '@/controller/products/GetProducts';
import ProductGridItems from '@/components/layouts/product-grid-items';

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
    title: 'Products',
    description: 'Browse our collection of products.',
};

const getProducts = async (searchParams: string) => {
    const data = await GetProducts(searchParams as any)
    return data
}

const Products = async ({ searchParams }: { searchParams: string }) => {
    const { products, totalPages } = await getProducts(searchParams);
    const url = '/products';
    console.log(products)

    if (products && products.length > 0) {
        return (
            <>
                <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
                    <Suspense>
                        <ProductGridItems items={products} />
                    </Suspense>
                </div>
                <div className="flex justify-center mt-10">
                    <Pagination pageSize={totalPages} initialPage={searchParams} url={url} />
                </div>
            </>
        )
    }
    else {
        return <p>No products found</p>
    }
}

export default Products