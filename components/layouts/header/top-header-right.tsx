import Link from 'next/link';
import Dropdown from './dropdown';
import { MapPinIcon, InformationCircleIcon, UserIcon } from '@heroicons/react/24/outline';

const TopHeaderRight = ({ session }: { session: any | null }) => {
    const currencyOptions = [
        { label: 'USD', href: '#' },
        { label: 'EUR', href: '#' },
    ];

    const userOptions = session
        ? [
            { label: 'Profile', href: '/profile' },
            ...(session.role === 'ADMIN'
                ? [{ label: 'Admin', href: '/dashboard' }]
                : []),
            { label: 'Sign Out' },
        ]
        : [];

    return (
        <div className="header-right flex items-center justify-end space-x-4">
            <div className="dropdown relative">
                <button className="uppercase tracking-wide font-medium focus:outline-none">
                    Currency
                </button>
                {/* {isDropdownOpen && ( */}
                <ul className="dropdown-box absolute right-0 z-10 hidden bg-white py-1.5 rounded-md shadow-lg">
                    {currencyOptions.map((option, index) => (
                        <li key={index} className="px-4 py-2">
                            <Link href={option.href}>{option.label}</Link>
                        </li>
                    ))}
                </ul>
                {/* )} */}
            </div>
            <span className="inline-block bg-gray-300 h-6 w-px"></span>
            <div className="list_user flex">
                <ul className="flex items-center justify-end ml-auto space-x-4">
                    <li className="flex items-center">
                        <Link href="/contact">
                            <span className="flex items-center text-gray-700 hover:text-gray-900">
                                <MapPinIcon className="w-5 h-5 mr-1.5" /> Contact
                            </span>
                        </Link>
                    </li>
                    <li className="flex items-center">
                        <Link href="/help">
                            <span className="flex items-center text-gray-700 hover:text-gray-900">
                                <InformationCircleIcon className="w-5 h-5 mr-1.5" /> Help
                            </span>
                        </Link>
                    </li>
                    <li className="flex items-center">
                        {session
                            ? <Dropdown
                                icone="user"
                                label={session?.name ?? ''}
                                items={userOptions}
                            />
                            : <Link href="/signin">
                                <span className="flex items-center text-gray-700 hover:text-gray-900">
                                    <UserIcon className="w-5 h-5 mr-1.5" />
                                    Sign In / Register
                                </span>
                            </Link>
                        }
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default TopHeaderRight
