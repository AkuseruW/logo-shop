import { DataTable } from '@/components/admin/dataTable';
import { columnsOrder } from '@/components/admin/dataTable/columns';
import { getOrdersPaginate } from "@/controller/_dashboard/orders/_get";

const getOrders = async ({ searchParams }: { searchParams: string }) => {
    const orders = await getOrdersPaginate(searchParams as any);
    return orders;
}

const Orders = async ({ searchParams }: { searchParams: string }) => {
    const { orders, totalPages } = await getOrders({ searchParams })
    const url = '/dashboard/orders';

    return (
        <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">List of Orders</h2>
                </div>
            </div>
            <DataTable
                //@ts-ignore
                columns={columnsOrder}
                data={orders}
                url={url}
                pageSize={totalPages}
                initialPage={searchParams as any}
                type={'typeOrder'}
            />
        </div>
    )
}

export default Orders
