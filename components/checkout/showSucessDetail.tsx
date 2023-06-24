'use client'
import Image from 'next/image'
import React from 'react'
import { useEffect } from 'react';
import Cookies from 'js-cookie'
import { CART_COOKIE_KEY, SHIPPING_ADDRESS_KEY } from '@/utils/const';

const ShowSucessDetail = ({ order }: { order: any }) => {
    useEffect(() => {
        const cookiesToDelete = [CART_COOKIE_KEY, SHIPPING_ADDRESS_KEY];
        cookiesToDelete.forEach(cookieName => {
            Cookies.remove(cookieName, { path: '/' });
        });
    }, []);

    return (
        <div>
            <div className='max-w-3xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8'>
                <div className='max-w-xl'>
                    <h1 className='text-sm font-medium text-indigo-600'>
                        Payment successful
                    </h1>
                    <p className='mt-2 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl'>
                        Thanks for ordering
                    </p>
                    <p className='mt-2 text-base text-gray-500'>
                        We appreciate your order, we’re currently processing it. So hang
                        tight and we’ll send you confirmation very soon!
                    </p>

                    <dl className='mt-12 text-sm font-medium'>
                        <dt className='text-gray-900'>Order number</dt>
                        <dd className='text-indigo-600 mt-2'>
                            {order?.paymentIntent}
                        </dd>
                    </dl>
                </div>

                <div className='mt-10 border-t border-gray-200'>
                    <h2 className='sr-only'>Your order</h2>

                    <h3 className='sr-only'>Items</h3>
                    {order.orderItems.map((product: any) => (
                        <div
                            key={product.product}
                            className='py-10 border-b border-gray-200 flex space-x-6'
                        >
                            <Image
                                src={product.cover[0]}
                                alt={product.name}
                                height={500}
                                width={500}
                                className='flex-none w-20 h-20 object-center object-cover bg-gray-100 rounded-lg sm:w-40 sm:h-40'
                            />
                            <div className='flex-auto flex flex-col'>
                                <div>
                                    <h4 className='font-medium text-gray-900'>
                                        {product.name}
                                    </h4>
                                    <p className='mt-2 text-sm text-gray-600'>
                                        {/* {product.description} */}
                                    </p>
                                </div>
                                <div className='mt-6 flex-1 flex items-end'>
                                    <dl className='flex text-sm divide-x divide-gray-200 space-x-4 sm:space-x-6'>
                                        <div className='flex'>
                                            <dt className='font-medium text-gray-900'>Quantity</dt>
                                            <dd className='ml-2 text-gray-700'>{product.quantity}</dd>
                                        </div>
                                        <div className='pl-4 flex sm:pl-6'>
                                            <dt className='font-medium text-gray-900'>Price</dt>
                                            <dd className='ml-2 text-gray-700'>
                                                {(product.price).toLocaleString('en-CA', {
                                                    style: 'currency',
                                                    currency: 'EUR'
                                                })}
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className='sm:ml-40 sm:pl-6'>
                        <h3 className='sr-only'>Your information</h3>

                        <h4 className='sr-only'>Payment</h4>
                        <dl className='grid grid-cols-2 gap-x-6 border-t border-gray-200 text-sm py-10'>
                            {/* {payment?.card && (
                                <div>
                                    <dt className='font-medium text-gray-900'>
                                        Payment Information
                                    </dt>
                                    <dd className='mt-2 text-gray-700'>
                                        <p>{payment.card.wallet}</p>
                                        <p className='font-medium'>
                                            {payment.card.brand.toUpperCase()}
                                        </p>
                                        <div className='flex-auto'>
                                            <p className='text-gray-900'>
                                                Ending with {payment.card.last4}
                                            </p>
                                            <p>
                                                Expires on {payment.card.exp_month} /{' '}
                                                {payment.card.exp_year}
                                            </p>
                                        </div>
                                    </dd>
                                </div>
                            )} */}
                            <div>
                                <dt className='font-medium text-gray-900'>Billing address</dt>
                                <dd className='mt-2 text-gray-700'>
                                    <address className='not-italic'>
                                        <span className='block'>Name: {order.shippingAddress.firstName} {order.shippingAddress.lastName}</span>
                                        <span className='block'>Email: {order?.email}</span>
                                        <span className='block'>
                                            Country: {order.shippingAddress.country}
                                        </span>
                                        <span className='block'>
                                            Postal Code: {order.shippingAddress.zipCode}
                                        </span>
                                    </address>
                                </dd>
                            </div>
                        </dl>

                        <h3 className='sr-only'>Summary</h3>

                        <dl className='space-y-6 border-t border-gray-200 text-sm pt-10'>
                            <div className='flex justify-between'>
                                <dt className='font-medium text-gray-900'>Subtotal</dt>
                                <dd className='text-gray-700'>
                                    {(order.subtotal! / 100).toLocaleString('en-CA', {
                                        style: 'currency',
                                        currency: 'EUR'
                                    })}
                                </dd>
                            </div>
                            {/* <div className='flex justify-between'>
                                <dt className='flex font-medium text-gray-900'>Discount</dt>
                                <dd className='text-gray-700'>
                                    -
                                    {(discount / 100).toLocaleString('en-CA', {
                                        style: 'currency',
                                        currency: 'CAD'
                                    })}
                                </dd>
                            </div> */}
                            {/* <div className='flex justify-between'>
                                <dt className='font-medium text-gray-900'>Tax</dt>
                                <dd className='text-gray-700'>
                                    {(tax / 100).toLocaleString('en-CA', {
                                        style: 'currency',
                                        currency: 'CAD'
                                    })}
                                </dd>
                            </div> */}
                            <div className='flex justify-between'>
                                <dt className='font-medium text-gray-900'>Total</dt>
                                <dd className='text-gray-900'>
                                    {(order.total! / 100).toLocaleString('en-CA', {
                                        style: 'currency',
                                        currency: 'EUR'
                                    })}
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShowSucessDetail
