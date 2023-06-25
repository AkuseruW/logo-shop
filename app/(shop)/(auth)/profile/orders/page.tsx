import React from 'react'
import Image from 'next/image';
import { Metadata } from 'next';
import { getSession } from '@/lib/next-auth';
import Pagination from "@/components/pagination";
import Breadcrumbs from '@/components/breadcrumbs';
import { SessionProps } from '@/type';
import { getMyOrder } from '@/controller/profile/getMyOrder';

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
    title: 'My Orders',
};

const getOrder = async (searchParams: any) => {
    const session = await getSession()
    const myOrders = await getMyOrder(session as SessionProps, searchParams as any)

    return myOrders
};

const Orders = async ({ searchParams }: { searchParams: string }) => {
    const { myOrders, totalPages } = await getOrder(searchParams)
    const url = '/profile/orders';

    if (myOrders && myOrders.length > 0) {
        return (

            <div className='max-w-3xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8'>
                <Breadcrumbs />
                <div className='mt-10'>
                    {myOrders.map((order) => (
                        <div key={order.id} className='py-10 '>
                            <h3 className='text-xl font-semibold border-b border-gray-200 py-4'>Order #{order.id}</h3>
                            {/* @ts-ignore */}
                            {order.orderItems.map((orderItem: Product, itemIndex: number) => (
                                <>
                                    {/* @ts-ignore */}
                                    <div key={orderItem.id} className={`flex items-center space-x-6 py-6 ${itemIndex !== order.orderItems.length - 1 ? 'border-b border-gray-200' : ''}`}>
                                        <Image
                                            src={orderItem.image}
                                            alt={orderItem.name}
                                            height={120}
                                            width={120}
                                            className='flex-none w-20 h-20 object-center object-cover bg-gray-100 rounded-lg sm:w-40 sm:h-40'
                                        />
                                        <div className='flex-auto'>
                                            <h4 className='text-lg font-medium text-gray-900'>{orderItem.name}</h4>
                                            <div className='mt-1 flex items-center text-sm text-gray-700'>
                                                <span className='mr-1'>Quantity:</span>
                                                <span>{orderItem.qty}</span>
                                            </div>
                                            <div className='mt-1 flex items-center text-sm text-gray-700'>
                                                <span className='mr-1'>Price:</span>
                                                <span>{orderItem.price}</span>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ))}
                        </div>
                    ))}
                </div>

                <div className='flex justify-center mt-10'>
                    <Pagination
                        pageSize={totalPages}
                        initialPage={searchParams as unknown as string}
                        url={url}
                    />
                </div>
            </div >
        )
    } else {
        return (
            <div className='max-w-3xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8'>
                <Breadcrumbs />
                <div className='mt-10'>
                    <h3 className='text-xl font-semibold border-b border-gray-200 py-4'>No Orders</h3>
                </div>
            </div>
        )
    }

}

export default Orders
