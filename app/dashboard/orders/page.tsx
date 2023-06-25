import { User } from "@prisma/client";
import { getServerSession } from 'next-auth';
import { DataTable } from '@/components/admin/dataTable';
import { Order as PrismaOrder } from '@prisma/client';
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { columnsOrder } from '@/components/admin/dataTable/columns';
import { getOrdersPaginate } from "@/controller/_dashboard/orders/_get";

interface Order extends PrismaOrder {
    user: User;
}

const getOrders = async ({ session, searchParams }: { session: any, searchParams: string }) => {
    const orders = await getOrdersPaginate(session, searchParams as any);
    return orders;
}

const Orders = async ({ searchParams }: { searchParams: string }) => {
    const session = await getServerSession(authOptions)
    const { orders, totalPages } = await getOrders({ session, searchParams })
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
