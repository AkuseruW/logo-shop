'use client'

import { Fragment, useState, useEffect, useRef } from 'react';
import { UserIcon } from '@heroicons/react/24/outline'
import { signOut } from "next-auth/react"
import Link from 'next/link';
import { Url } from 'url';

type Item = {
    label: string;
    href?: Url | string | any;
};

type Props = {
    icone: 'user' | 'game';
    label: string;
    items: Item[];
};

const Dropdown = ({ icone, label, items }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleItemClick = (item: Item) => {
        setSelectedItem(item);
        setIsOpen(false);
    };

    const handleSignOut = async () => {
        await signOut();
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                type="button"
                className="w-full h-full flex items-center justify-between text-sm font-medium"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center">
                    {icone === 'user' && (
                        <UserIcon className="w-5 h-5 mr-1.5 text-gray-700 hover:text-gray-900" />
                    )}
                    <span className="flex items-center text-gray-700 hover:text-gray-900">
                        {label}
                    </span>
                    <svg
                        className={`${isOpen ? 'transform rotate-180' : ''} w-4 h-4 ml-2`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.293 7.707a1 1 0 011.414 0L10 10.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
            </button>
            {isOpen && (
                <div className="absolute z-10 w-40 mt-2 bg-white rounded-md shadow-lg">
                    <ul className="py-2">
                        {items.map((item) => (
                            <li
                                key={item.label}
                                className="hover:text-gray-900"
                                onClick={() => handleItemClick(item)}
                            >
                                {item.label === 'Sign Out' ? (
                                    <button
                                        type="submit"
                                        onClick={handleSignOut}
                                        className="block text-sm font-medium text-gray-700 hover:text-gray-900 px-4 py-2 w-[100%] hover:bg-gray-100 transition-colors"
                                    >
                                        {item.label}
                                    </button>
                                ) : (
                                    <Link
                                        href={item.href}
                                        className="block text-sm font-medium text-gray-700 hover:text-gray-900 px-4 py-2 w-[100%] text-center hover:bg-gray-100 transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Dropdown;