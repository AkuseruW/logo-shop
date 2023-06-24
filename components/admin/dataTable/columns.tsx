"use client"

import Image from "next/image"
import { Switch } from "@/components/ui/switch"
import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableRowActionsCategories, DataTableRowActionsCustomers, DataTableRowActionsOrders, DataTableRowActionsProducts } from "./data-table-row-actions"
import { DataTableColumnHeader } from "./data-table-column-header"


interface Category {
    id: string;
    name: string;
}

interface Product {
    id: string;
    name: string;
    price: number;
    publish: boolean;
    stock: number;
    cover: string;
    cover_id: string;
    brand: string;
    rating: string;
    description: string;
    slug: string;
    category: Category[];
}

export const columnsProduct: ColumnDef<Product>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value: boolean) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
                className="translate-y-[2px]"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="translate-y-[2px]"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },

    {
        accessorKey: "name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Name" />
        ),
        cell: ({ row }) => {
            const { name, brand, cover } = row.original;

            return (
                <div className="flex space-x-2 items-center">
                    {cover && (
                        <Image
                            src={cover}
                            alt={name}
                            width={500}
                            height={500}
                            className="w-8 h-8 rounded-full"
                        />
                    )}
                    <div>
                        <span className="max-w-[500px] truncate font-medium">
                            {name}
                        </span>
                        <br />
                        <span className="text-xs text-gray-500">{brand}</span>
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "category",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Category" />
        ),
        cell: ({ row }) => {
            const categories: Category[] = row.getValue("category") || [];

            return (
                <div className="flex space-x-2">
                    {categories.map((category) => (
                        <span
                            key={category.id}
                            className="max-w-[500px] truncate font-medium"
                        >
                            {category.name}
                        </span>
                    ))}
                </div>
            );
        },
    },
    {
        accessorKey: "publish",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Publish" />
        ),
        cell: ({ row }) => {
            const publish = row.getValue("publish");

            return (
                <div className="flex space-x-2">
                    <Switch
                        checked={publish as boolean}
                        aria-label="Publish"
                    />
                </div>
            );
        },
    },
    {
        accessorKey: "stock",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Stock" />
        ),
        cell: ({ row }) => (
            <div className="flex space-x-2">
                <span className="max-w-[500px] truncate font-medium">
                    {row.getValue("stock")}
                </span>
            </div>
        ),
    },
    {
        id: "actions",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Actions" />
        ),
        cell: ({ row }) => <DataTableRowActionsProducts row={row} />,
    },
];


export const columnsOrder: ColumnDef<Product>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value: boolean) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
                className="translate-y-[2px]"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="translate-y-[2px]"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },

    {
        accessorKey: "id",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Id" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[500px] truncate font-medium">
                        {row.getValue("id")}
                    </span>
                </div>
            );
        },
    },

    {
        accessorKey: "user",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="User" />
        ),
        cell: ({ row }) => {
            const user = row.getValue("user");
            //@ts-ignore
            const userName = user?.name ?? ""
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[500px] truncate font-medium">
                        {userName}
                    </span>
                </div>
            );
        },
    },

    {
        accessorKey: "totalPrice",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Total price" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[500px] truncate font-medium">
                        {row.getValue("totalPrice")}
                    </span>
                </div>
            );
        },
    },

    {
        accessorKey: "isPaid",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="isPaid" />
        ),
        cell: ({ row }) => {
            const isPaid = row.getValue("isPaid");

            return (
                <div className="flex space-x-2">
                    <Switch
                        checked={isPaid as boolean}
                        aria-label="isPaid"
                    />
                </div>
            );
        },
    },

    {
        accessorKey: "isDelivered",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="isDelivered" />
        ),
        cell: ({ row }) => {
            const isDelivered = row.getValue("isDelivered");

            return (
                <div className="flex space-x-2">
                    <Switch
                        checked={isDelivered as boolean}
                        aria-label="isDelivered"
                    />
                </div>
            );
        },
    },

    {
        id: "actions",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Actions" />
        ),
        cell: ({ row }) => <DataTableRowActionsOrders row={row} />,
    },
];

export const columnsCustomers: ColumnDef<Product>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value: boolean) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
                className="translate-y-[2px]"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="translate-y-[2px]"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },

    {
        accessorKey: "name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Name" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[500px] truncate font-medium">
                        {row.getValue("name")}
                    </span>
                </div>
            );
        },
    },

    {
        accessorKey: "email",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Email" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[500px] truncate font-medium">
                        {row.getValue("email")}
                    </span>
                </div>
            );
        },
    },

    {
        accessorKey: "role",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Role" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[500px] truncate font-medium">
                        {row.getValue("role")}
                    </span>
                </div>
            );
        },
    },

    {
        id: "actions",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Actions" />
        ),
        cell: ({ row }) => <DataTableRowActionsCustomers row={row} />,
    },
];


export const columnsCategories: ColumnDef<Product>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value: boolean) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
                className="translate-y-[2px]"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="translate-y-[2px]"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },

    {
        accessorKey: "name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Name" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[500px] truncate font-medium">
                        {row.getValue("name")}
                    </span>
                </div>
            );
        },
    },

    {
        accessorKey: "description",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Description" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[500px] truncate font-medium">
                        {row.getValue("description")}
                    </span>
                </div>
            );
        },
    },

    {
        id: "actions",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Actions" />
        ),
        cell: ({ row }) => <DataTableRowActionsCategories row={row} />,
    },
];