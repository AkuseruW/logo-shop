'use client'
import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

interface PaginationProps {
    pageSize: number;
    url: string;
    initialPage?: any;
}


const Pagination: React.FC<PaginationProps> = ({ pageSize, url, initialPage }) => {
    const [currentPage, setCurrentPage] = useState(Number(initialPage?.page) || 1);
    const router = useRouter();

    if (pageSize === 1) {
        return null;
    }

    const onPageChange = (page: number) => {
        setCurrentPage(page);
        const currentUrlParams = new URLSearchParams(window.location.search);
        currentUrlParams.set('page', String(page));
        router.push(`${url}?${currentUrlParams.toString()}`);
    };

    const truncatePagination = (arr: Array<number | '...'>, currentPage: number, total: number) => {
        const truncatedArr = [];

        truncatedArr.push(1);

        if (currentPage - 2 > 3) {
            truncatedArr.push('...');
        }

        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
            if (i >= 2 && i <= total - 1) {
                truncatedArr.push(i);
            }
        }

        if (currentPage + 2 < total - 1) {
            truncatedArr.push('...');
        }

        if (total !== 1 && !truncatedArr.includes(total)) {
            truncatedArr.push(total);
        }

        return truncatedArr;
    };

    const pages = Array.from({ length: pageSize }, (_, i) => i + 1);
    const truncatedPages = truncatePagination(pages, currentPage, pageSize);

    return (
        <div className="flex items-center justify-between bg-white px-4 py-3 sm:px-6">
            <div className=" sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <nav className="inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        <button
                            disabled={currentPage === 1}
                            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10 focus:outline-offset-0"
                            onClick={() => onPageChange(currentPage - 1)}
                        >
                            <span className="sr-only">Previous</span>
                            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                        {truncatedPages.map((page, index) => (
                            <React.Fragment key={index}>
                                {page === '...' ? (
                                    <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300">
                                        {page}
                                    </span>
                                ) : (
                                    <button
                                        className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${currentPage === page
                                            ? 'bg-black text-white focus:outline-none'
                                            : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0'
                                            }`}
                                        onClick={() => onPageChange(page as number)}
                                    >
                                        {page}
                                    </button>
                                )}
                            </React.Fragment>
                        ))}
                        <button
                            disabled={currentPage === pageSize}
                            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10 focus:outline-offset-0"
                            onClick={() => onPageChange(currentPage + 1)}
                        >
                            <span className="sr-only">Next</span>
                            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Pagination;