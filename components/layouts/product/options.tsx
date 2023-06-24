'use client'
import Rating from './Rating'
import { useState } from 'react'
import { AddToCart } from './add-to-cart'
import { Product } from '@/type'



export default function Options({ item, averageRating }: { item: Product, averageRating: any }) {
    const [qty, setQty] = useState(1)

    return (
        <>
            <div className="mt-4 lg:row-span-3 lg:mt-0">
                <p className="text-3xl tracking-tight text-gray-900">{item.price} &euro;</p>

                {/* Reviews */}
                <div className="mt-6">
                    <h3 className="sr-only">Reviews</h3>
                    <div className=" items-center">
                        <Rating
                            value={averageRating}
                        />

                        <p>Status: {item.stock > 0 ? <span>In Stock</span> : <span>Out of stock</span>}</p>
                        {item.stock > 0 && (
                            <div className='mt-6'>
                                <label htmlFor="qty" className="block mb-2 text-sm font-medium text-gray-900">Quantite</label>

                                <select
                                    value={qty}
                                    onChange={(e) => setQty(parseInt(e.target.value))}
                                    id="qty"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                >
                                    {Array.from({ length: item.stock }, (_, index) => (
                                        <option key={index + 1} value={index + 1}>
                                            {index + 1}
                                        </option>
                                    ))}
                                </select>


                            </div>
                        )}
                    </div>
                </div>

                <AddToCart item={item} qty={qty} />

            </div>

        </>
    )
}
