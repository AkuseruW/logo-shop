'use client'
import Link from 'next/link';
import { Product } from '@/type';
import Image from 'next/image';


export default function ProductGridItems({ items }: { items: Product[] }) {
  return (
    <>
      {items.map((item: Product, index: number) => (
        <div key={index} className="group relative pb-10">
          <Link href={`/products/${item.slug}`}>
            <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
              <Image
                src={item.cover}
                alt={item.name}
                width={300}
                height={300}
                quality={75}
                priority={false}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="mt-6 flex justify-between">
              <div>
                <h3 className="text-sm text-gray-500">
                  {item.name}
                </h3>
              </div>
              <p className="text-sm text-gray-500">{item.price} &euro;</p>
            </div>
            <p className="text-base font-semibold text-gray-900">{item.brand}</p>
          </Link>
        </div>
      ))}
    </>
  )
}
