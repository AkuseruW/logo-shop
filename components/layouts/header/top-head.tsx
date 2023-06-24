import React from 'react';
import Link from 'next/link';
import { getSession } from '@/lib/next-auth';
import TopHeaderRight from './top-header-right';

const TopHeader = async (): Promise<JSX.Element> => {
    const session: any = await getSession();

    return (
        <div className="flex flex-col lg:flex-row items-center py-3">
            <div className="header-left flex-1">
                <Link href="/">
                    <span className="text-2xl font-bold text-gray-800">LOGO</span>
                </Link>
            </div>

            <div className="hidden lg:flex">
                <TopHeaderRight session={session} />
            </div>
        </div>
    );
};

export default TopHeader;
