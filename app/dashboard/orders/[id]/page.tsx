import Image from "next/image";
import { getSession } from "@/lib/next-auth";
import Link from "next/link";
import { getOrdersById } from "@/controller/_dashboard/orders/_get";


const getOrders = async ({ id }: { id: string }) => {
  const session = await getSession();
  const order = await getOrdersById(session, id);
  return order;
};

const PageOrderDetail = async ({ params: { id }, }: { params: { id: string }; searchParams: string; }) => {
  const { order } = await getOrders({ id });

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">{order.id}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 border-t border-gray-300 pt-8">
        <div>
          <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
          <p className="text-gray-700">
            Address: {order.shippingAddress?.address}
          </p>
          <p className="text-gray-700">City: {order.shippingAddress?.city}</p>
          <p className="text-gray-700">
            Postal Code: {order.shippingAddress?.postalCode}
          </p>
          <p className="text-gray-700">
            Country: {order.shippingAddress?.country}
          </p>
          <p className="text-gray-700">
            Shipping Price: {order.shippingAddress?.shippingPrice}
          </p>
        </div>

        {order.user ? (
          <div className="space-y-2">
            <p className="text-gray-700">
              User ID:{" "}
              <Link href={`/dashboard/customers/view/${order.user.id}`}>
                {order.user.id}
              </Link>
            </p>
            <p className="text-gray-700">Name: {order.user.name}</p>
            <p className="text-gray-700">Email: {order.user.email}</p>
          </div>
        ) : (
          <p className="text-gray-700">User: Not available</p>
        )}
      </div>

      <h2 className="text-xl font-bold mt-8">Order Summary</h2>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="col-span-2 space-y-2">
          <p className="text-gray-700">Payment Method: {order.paymentMethod}</p>
          <p className="text-gray-700">Tax Price: {order.taxPrice}</p>
          <p className="text-gray-700">Shipping Price: {order.shippingPrice}</p>
          <p className="text-gray-700">Total Price: {order.totalPrice}</p>
          <p className="text-gray-700">
            Is Paid: {order.isPaid ? "Yes" : "No"}
          </p>
          <p className="text-gray-700">
            Paid At:{" "}
            {order.paidAt
              ? new Date(order.paidAt).toLocaleString()
              : "Not paid"}
          </p>
          <p className="text-gray-700">
            Is Delivered: {order.isDelivered ? "Yes" : "No"}
          </p>
          <p className="text-gray-700">
            Delivered At:{" "}
            {order.deliveredAt
              ? new Date(order.deliveredAt).toLocaleString()
              : "Not delivered"}
          </p>
          <p className="text-gray-700">
            Created At: {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>
      </div>

      <h2 className="text-xl font-bold mt-8">Order Items</h2>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {order.orderItems.map((item) => (
          <div
            key={item.id}
            className="border border-gray-200 rounded-lg shadow-md p-4"
          >
            <div className="flex items-center justify-center mb-4">
              <Image
                // @ts-ignore
                src={item.image}
                // @ts-ignore
                alt={item.name}
                width={200}
                height={200}
                className="rounded-md"
              />
            </div>
            <h3 className="text-lg font-bold mb-2">{item.name}</h3>
            <p className="text-gray-700">Quantity: {item.qty}</p>
            <p className="text-gray-700">Price: {item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PageOrderDetail;
