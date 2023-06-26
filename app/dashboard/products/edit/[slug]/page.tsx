import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { ProductFormUpdate } from "@/components/admin/form/products/patch";
import { getProductBySlug } from "@/controller/products/getProduct";
import { getAllCategories } from '@/controller/categories/getCategories';

const getProduct = async ({ slug }: { slug: string }) => {
  const product = await getProductBySlug(slug)
  return product
};


const getCategories = async () => {
  const categories = await getAllCategories()

  return categories
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const { product } = await getProduct({ slug });
  const { categories } = await getCategories()

  return (
    <div className="container mx-auto px-4">
      <h2 className="mt-12 text-2xl font-bold">Edit {product.name}</h2>
      <ProductFormUpdate product={product} categories={categories} />
    </div>
  );
}
