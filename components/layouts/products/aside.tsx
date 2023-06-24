'use client'
import { useState } from 'react';
import { Disclosure } from '@headlessui/react';
import { Categories } from '@prisma/client';
import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid';
import { usePathname, useRouter } from 'next/navigation';


type FilterOption = {
    value: string;
    label: string;
    checked: boolean;
};

type FilterSection = {
    id: string;
    name: string;
    options: FilterOption[];
};

type Category = {
    id: string;
    slug: string;
    name: string;
    description: string;
    image: string;
    image_id: string;
};

type Props = {
    categories: Category[];
};

const Aside: React.FC<Props> = ({ categories }) => {
    const router = useRouter()
    const pathName = usePathname()
    const [selectedCategory, setSelectedCategory] = useState('')

    const onFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        const textValue = e.target.value;
        const currentUrlParams = new URLSearchParams(window.location.search)
        if (e.target.checked) {
            currentUrlParams.set('category', textValue)
        } else {
            currentUrlParams.delete('category')
        }
        router.push(pathName + '?' + currentUrlParams)
    };

    const filters: FilterSection[] = [
        {
            id: 'category',
            name: 'Category',
            options: categories.map((category) => ({
                value: category.slug,
                label: category.name,
                checked: false,
            })),
        },
        {
            id: 'filters',
            name: 'Filters',
            options: categories.map((category) => ({
                value: category.slug,
                label: category.name,
                checked: false,
            })),
        },
    ];

    return (
        <form className="hidden lg:block">
            {filters.map((section) => (
                <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                    {({ open }) => (
                        <>
                            <h3 className="-my-3 flow-root">
                                <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                    <span className="font-medium text-gray-900">{section.name}</span>
                                    <span className="ml-6 flex items-center">
                                        {open ? (
                                            <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                        ) : (
                                            <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                        )}
                                    </span>
                                </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                                <div className="space-y-4">
                                    {section.options.map((option, optionIdx) => (
                                        <div key={option.value} className="flex items-center">
                                            <input
                                                id={`filter-${section.id}-${optionIdx}`}
                                                name={`${section.id}[]`}
                                                value={option.value}
                                                type="checkbox"
                                                checked={selectedCategory === option.value}
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                onChange={(e) => {
                                                    const newValue = e.target.checked ? e.target.value : '';
                                                    setSelectedCategory(newValue);
                                                    onFilter(e);
                                                }}
                                            />
                                            <label
                                                htmlFor={`filter-${section.id}-${optionIdx}`}
                                                className="ml-3 text-sm text-gray-600"
                                            >
                                                {option.label}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
            ))}
        </form>
    );
};

export default Aside;