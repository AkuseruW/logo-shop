import Link from 'next/link';
import { FolderOpenIcon, PencilSquareIcon, TableCellsIcon, ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/outline';


export const metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
};

async function getCategories() {
    const res = await fetch(`${process.env.BASE_URL}/api/categories`, { next: { revalidate: 10 } });

    return res.json();
}

export default async function ProductLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="w-full overflow-x-hidden min-h-screen overflow-auto">
            <div className="w-full">
                <div className="container mx-auto px-4 py-6">
                    <nav className="flex flex-wrap justify-center lg:justify-start">
                        <ul className="space-x-8 p-4 flex flex-wrap">
                            <li className="flex items-center">
                                <Link href="/dashboard/customers" className="text-gray-700 hover:text-blue-500 font-medium text-lg sm:text-sm">
                                    <TableCellsIcon className="h-6 w-6 mr-3" />
                                    <span>All Customers</span>
                                </Link>
                            </li>
                            <li className="flex items-center">
                                <span className="border-l border-gray-300 h-6 mx-3"></span>
                            </li>
                        </ul>
                    </nav>
                    <div>
                        {children}
                    </div>
                </div>
            </div>
        </main>
    );
}