import { Metadata } from 'next';
import { prisma } from "@/lib/prisma";
import Categories from "@/components/categories";
import Banner from "@/components/layouts/carousel";
import ProductGridItems from "@/components/layouts/product-grid-items";
import { GetSelectedCategories } from "@/controller/categories/getCategories"
import { GetLastedProducts } from "@/controller/products/getProducts"

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to our online store!',
};

const getProduct = async () => {
  const products = await GetLastedProducts()
  return products
}

const getCategories = async () => {
  const categories = await GetSelectedCategories()
  return categories
}

const Home = async () => {
  const { products } = await getProduct()
  const { categories } = await getCategories()

  return (
    <main>
      <Banner />
      <div className=" mx-auto py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 mx-4">New arrives</h2>
        <div className="py-8">
          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-4 lg:gap-x-6 lg:space-y-0">
            {/* affichage des produits */}
            <ProductGridItems items={products} />
          </div>
        </div>
        {/* affichage des catégories */}
        <Categories categories={categories} />
      </div>
    </main>
  )
}

export default Home