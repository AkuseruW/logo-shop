import Link from "next/link";
import { useState } from "react";
import Modal from "@/components/modal";
import { getError } from "@/utils/error";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pen, Trash, Eye } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";


export function DataTableRowActionsProducts({ row }: any) {
    const router = useRouter();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const { data: session } = useSession()
    // @ts-ignore
    const token = session?.user.accessToken

    async function handleDelete() {
        try {
            await fetch(`/api/products?id=${row.original.id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            router.refresh();
            setModalIsOpen(false);
        } catch (error) {
            getError(error);
        }
    }

    return (
        <>
            <Modal
                item={row.original.name}
                isOpen={modalIsOpen}
                onClose={() => setModalIsOpen(false)}
                onDelete={handleDelete}
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[160px]">
                    <Link href={`/dashboard/products/view/${row.original.slug}`}>
                        <DropdownMenuItem>
                            <Eye className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                            View
                        </DropdownMenuItem>
                    </Link>
                    <Link href={`/dashboard/products/edit/${row.original.slug}`}>
                        <DropdownMenuItem>
                            <Pen className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                            Edit
                        </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => { setModalIsOpen(true) }}>
                        <Trash className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu >
        </>
    );
}


export const DataTableRowActionsCategories = ({ row }: any) => {
    const router = useRouter();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const { data: session } = useSession()
    // @ts-ignore
    const token = session?.user.accessToken

    async function handleDelete() {
        try {
            await fetch(`/api/categories?id=${row.original.id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            router.refresh();
            setModalIsOpen(false);
        } catch (error) {
            getError(error);
        }
    }

    return (
        <>
            <Modal
                item={row.original.name}
                isOpen={modalIsOpen}
                onClose={() => setModalIsOpen(false)}
                onDelete={handleDelete}
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[160px]">
                    <Link href={`/dashboard/categories/view/${row.original.slug}`}>
                        <DropdownMenuItem>
                            <Eye className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                            View
                        </DropdownMenuItem>
                    </Link>

                    <Link href={`/dashboard/categories/edit/${row.original.slug}`}>
                        <DropdownMenuItem>
                            <Pen className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                            Edit
                        </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => { setModalIsOpen(true); }}>
                        <Trash className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu >
        </>
    );
}


export const DataTableRowActionsOrders = ({ row }: any) => {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
                <Link href={`/dashboard/orders/view/${row.original.id}`}>
                    <DropdownMenuItem>
                        <Eye className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                        View
                    </DropdownMenuItem>
                </Link>
            </DropdownMenuContent>
        </DropdownMenu >
    );
}


export const DataTableRowActionsCustomers = ({ row }: any) => {
    const router = useRouter();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const { data: session } = useSession()
    // @ts-ignore
    const token = session?.user.accessToken

    async function handleDelete() {
        try {
            await fetch(`/api/customers?id=${row.original.id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            router.refresh();
            setModalIsOpen(false);
        } catch (error) {
            getError(error);
        }
    }

    return (
        <>
            <Modal
                item={row.original.name}
                isOpen={modalIsOpen}
                onClose={() => setModalIsOpen(false)}
                onDelete={handleDelete}
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[160px]">
                    <Link href={`/dashboard/customers/view/${row.original.id}`}>
                        <DropdownMenuItem>
                            <Eye className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                            View
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                    </Link>
                    <DropdownMenuItem onClick={() => { setModalIsOpen(true) }}>
                        <Trash className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu >
        </>
    );
}