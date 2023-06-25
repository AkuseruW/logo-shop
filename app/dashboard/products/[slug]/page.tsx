import Link from "next/link";
import Image from "next/image";
import { Review } from '@prisma/client';
import { getServerSession } from 'next-auth';
import BtnDelete from "@/components/admin/btnDelete";
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getProductBySlug } from "@/controller/products/getProduct";

const getProduct = async ({ slug }: { slug: string }) => {
  const product = await getProductBySlug(slug)
  return product
}


export default async function Page({ params, searchParams }: { params: { slug: string }, searchParams: string }) {
  const { slug } = params;
  const urlSearchParams = new URLSearchParams(searchParams);
  const hasUpdatedParam = urlSearchParams.has('updated');
  const { product } = await getProduct({ slug });
  const session = await getServerSession(authOptions)

  const calculateAverageRating = (reviews: Review[]): number => {
    if (!reviews || reviews.length === 0) {
      return 0;
    }

    const validReviews = reviews.filter((review) => review.rating !== null);
    if (validReviews.length === 0) {
      return 0;
    }

    const totalRating = validReviews.reduce(
      (sum, review) => sum + (review.rating || 0),
      0
    );
    const averageRating = totalRating / validReviews.length;

    return parseFloat(averageRating.toFixed(1));
  };

  const averageRating: number = calculateAverageRating(product.reviews);

  return (
    <div className="container mx-auto px-4">
      {hasUpdatedParam && (
        <div className="bg-green-500 text-white p-4 mb-4 rounded-md">
          <span>Product updated successfully!</span>
        </div>
      )}
      <h1 className="text-3xl font-bold my-4">{product.name}</h1>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2">
          <Image src={product.cover} width={500} height={500} loading="lazy" alt={product.name} className="w-full" />
        </div>
        <div className="w-full md:w-1/2 md:ml-8">
          <p className="text-gray-600 mb-4 text-lg">Brand: {product.brand}</p>
          <p className="text-gray-600 mb-4 text-lg">Rating: {averageRating}</p>
          <p className="text-gray-600 mb-4 text-lg">Price: ${product.price}</p>
          <p className="text-gray-600 mb-4 text-lg">Stock: {product.stock}</p>
          <p className="text-gray-600 mb-4 text-lg">
            Description: {product.description}
          </p>
          <div>
            <BtnDelete items={product} session={session} />
            <Link href={`/dashboard/products/edit/${product.slug}`}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Modifier
            </Link>
          </div>
        </div>
      </div>
    </div>

  );
}
