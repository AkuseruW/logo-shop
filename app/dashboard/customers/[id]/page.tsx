import OrdersComponent from "@/components/admin/customers/orders";
import { getCustomerById } from "@/controller/_dashboard/customers/_get";
import { notFound } from "next/navigation";

const getCustomer = async ({ id }: { id: string }) => {
    const customer = await getCustomerById(id);
    return customer
}


const page = async ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const { customer } = await getCustomer({ id });

    return (
        <div className="flex">
            <div className="w-1/2 p-4">
                <h2 className="text-2xl font-bold mb-4">Orders</h2>
                <OrdersComponent orders={customer.Order} />
            </div>
            <div className="w-1/2 p-4">
                <h2 className="text-2xl font-bold mb-4">User Information</h2>
                <table className="w-full">
                    <tbody>
                        <tr>
                            <td className="font-bold">Id</td>
                            <td>{customer?.id}</td>
                        </tr>
                        <tr>
                            <td className="font-bold">Name</td>
                            <td>{customer?.name}</td>
                        </tr>
                        <tr>
                            <td className="font-bold">Email</td>
                            <td>{customer?.email}</td>
                        </tr>
                        {/* Add more rows for other user information */}
                    </tbody>
                </table>
            </div>
        </div>

    )
}

export default page
