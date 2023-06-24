'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation';

export default function SearchInput() {
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    const onSearch = (e: React.FormEvent) => {
        e.preventDefault();

        const encodedQuery = encodeURI(searchQuery);
        router.push(`/search?query=${encodedQuery}`);
    }

    return (
        <form className='flex justify-center w-2/3' onSubmit={onSearch}>
            <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                type="text"
                placeholder="Search"
                className="w-64 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 shadow-sm"
            />
        </form>
    )
}
