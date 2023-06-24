'use client'
import { useState } from 'react';

interface Order {
    id: string;
    isDelivered: boolean;
    createdAt: string;
}

interface OrdersComponentProps {
    orders: Order[];
}

const OrdersComponent: React.FC<OrdersComponentProps> = ({ orders }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 5;

    // Get current orders
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    // Change page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    // Format the date in a readable format
    const formatCreatedAt = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', options);
    };


    return (
        <div className="p-4">
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b border-gray-300 text-left">Order ID</th>
                        <th className="py-2 px-4 border-b border-gray-300 text-left">Is Delivered</th>
                        <th className="py-2 px-4 border-b border-gray-300 text-left">Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {currentOrders.map((order) => (
                        <tr key={order.id}>
                            <td className="py-2 px-4 border-b border-gray-300">{order.id}</td>
                            <td className="py-2 px-4 border-b border-gray-300">
                                {order.isDelivered ? 'Yes' : 'No'}
                            </td>
                            <td className="py-2 px-4 border-b border-gray-300">
                                {formatCreatedAt(order.createdAt)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination
                ordersPerPage={ordersPerPage}
                totalOrders={orders.length}
                paginate={paginate}
                currentPage={currentPage}
            />
        </div>
    );
};

interface PaginationProps {
    ordersPerPage: number;
    totalOrders: number;
    paginate: (pageNumber: number) => void;
    currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ ordersPerPage, totalOrders, paginate, currentPage }) => {
    const pageNumbers = Math.ceil(totalOrders / ordersPerPage);

    return (
        <div className="flex justify-center mt-4">
            {Array.from({ length: pageNumbers }, (_, index) => index + 1).map((number) => (
                <button
                    key={number}
                    className={`${currentPage === number
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-300 text-gray-700'
                        } px-3 py-1 mx-1 rounded`}
                    onClick={() => paginate(number)}
                >
                    {number}
                </button>
            ))}
        </div>
    );
};

export default OrdersComponent;
