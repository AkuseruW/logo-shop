import Link from 'next/link';
import Image from 'next/image'
import { Metadata } from 'next';
import { Product } from '@/type';
import { Review } from '@prisma/client';
import { getSession } from '@/lib/next-auth';
import Breadcrumbs from '@/components/breadcrumbs';
import Options from "@/components/layouts/product/options";
import AddCommentSection from '@/components/commentSection';
import { GetProduct } from '@/controller/products/getProduct';
import AddToFavorite from '@/components/layouts/product/addToFavorite';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = params;
  const { product } = await GetProduct(slug)
  return { title: product.name };
}

const getProduct = async ({ slug }: { slug: string }) => {
  const product = await GetProduct(slug)
  return product
};


export default async function Product({ params }: any) {
  const { slug } = params;
  const { product } = await getProduct({ slug });
  const userSession = await getSession()

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
    <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <Breadcrumbs />
      <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
        <div className="aspect-w-3 aspect-h-4 overflow-hidden rounded-lg lg:block">
          <Image
            src={product.cover}
            alt={product.name}
            width={300}
            height={300}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="lg:border-r lg:border-gray-200 lg:pr-8">
          <div className="flex items-center ml-2">
            <h2 className="text-xl font-bold pb-8">{product.name}</h2>
            {/* <AddToFavorite product={product} session={userSession} isFavorite={product?.isFavorite} /> */}
          </div>
          <p className="text-lg">
            {product.description}
          </p>
        </div>
        {/* Options */}
        <Options item={product} averageRating={averageRating} />
      </div>

      <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6  lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
        {userSession ? (
          <AddCommentSection session={userSession} product={product} />
        ) : (
          <div className="py-8 text-center">
            <p className="font-bold">
              Please sign in to leave a comment.{" "}
              <Link
                href="/signin"
                className="underline text-blue-500 hover:text-blue-700"
              >
                Login here
              </Link>
            </p>
          </div>
        )}

        <div className="py-8">
          <h3 className="text-2xl font-bold">Comments</h3>
          <ul className="mt-4">
            {product.reviews && product.reviews.map((review: Review) => (
              <li key={review.id} className="py-4 border-b border-gray-200">
                <p className="text-lg text-gray-600 mb-2">{review.text}</p>
                <p className="text-xs text-gray-500">
                  Rating: {review.rating?.toFixed(1)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
