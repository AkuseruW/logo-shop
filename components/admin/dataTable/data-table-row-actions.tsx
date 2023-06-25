import Link from "next/link";
import { useState } from "react";
import Modal from "@/components/modal";
import { getError } from "@/utils/error";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pen, Trash, Eye } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { deleteCategory, deleteCustomer, deleteProduct } from "@/controller/actions/admin/_delete";
import { useToast } from "@/components/ui/use-toast";


export function DataTableRowActionsProducts({ row }: any) {
    const router = useRouter();
    const { toast } = useToast()
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const { data: session } = useSession()

    const handleDelete = async () => {
        const productID = row.original.id
        const data = { productID, session }

        const productDelete = await deleteProduct(data)
        if (productDelete?.message) {
            setModalIsOpen(false)
            toast({
                title: "Your product has been deleted.",
                description: `${productDelete.message}`,
            })
            router.refresh()
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
                    <Link href={`/dashboard/products/${row.original.slug}`} prefetch={false}>
                        <DropdownMenuItem>
                            <Eye className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                            View
                        </DropdownMenuItem>
                    </Link>
                    <Link href={`/dashboard/products/edit/${row.original.slug}`} prefetch={false}>
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
    const { toast } = useToast();
    const { data: session } = useSession()
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleDelete = async () => {
        const categoryID = row.original.id
        const data = { categoryID, session }

        const categoryDelete = await deleteCategory(data)
        if (categoryDelete?.message) {
            setModalIsOpen(false)
            toast({
                title: "Your category has been deleted.",
                description: `${categoryDelete.message}`,
            })
            router.refresh()
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
                    <Link href={`/dashboard/categories/edit/${row.original.slug}`} prefetch={false}>
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
                <Link href={`/dashboard/orders/${row.original.id}`}>
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
    const { toast } = useToast()
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const { data: session } = useSession()

    async function handleDelete() {
        const customerID = row.original.id
        const data = { customerID, session }

        const customertDelete = await deleteCustomer(data)
        if (customertDelete?.message) {
            setModalIsOpen(false)
            toast({
                title: "Customer has been deleted.",
                description: `${customertDelete.message}`,
            })
            router.refresh()
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
                    <Link href={`/dashboard/customers/${row.original.id}`} prefetch={false}>
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