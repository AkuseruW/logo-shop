import Image from "next/image";
import { Metadata } from 'next';
import BtnPayment from "./btnPayment";
import { cookies } from "next/headers";
import { Products } from "@prisma/client";
import Stepper from "../../checkout/Stepper";
import { CART_COOKIE_KEY, SHIPPING_ADDRESS_KEY } from "@/utils/const";

interface ProductCart extends Products {
    quantity: number;
}

export const metadata: Metadata = {
    title: 'Payment',
    description: 'Complete your payment process',
};

const Payment = async () => {
    const cookieStore = cookies();
    const cartItems = cookieStore.get(CART_COOKIE_KEY);
    const items = cartItems ? JSON.parse(cartItems.value) : [];
    const addressCookies = cookieStore.get(SHIPPING_ADDRESS_KEY);
    const shippingAddress = addressCookies ? JSON.parse(addressCookies.value) : [];
    const total = items.reduce(
        (acc: number, product: ProductCart) => acc + product.price * product.quantity,
        0
    );

    return (
        <div className="w-full md:py-20">
            <Stepper activeStep={2} />
            <div className="container pt-16 flex flex-col">
                <h2 className="text-4xl font-bold my-8 text-center">Récapitulatif</h2>
                <hr className="border-t-2 border-gray-300 my-4" />
                <div className="flex flex-wrap">
                    <div className="w-full md:w-1/2 md:pr-8">
                        <h3 className="text-2xl font-bold mb-4">Shipping Address</h3>
                        <address aria-label="Shipping Address" className="text-gray-700">
                            <p className="mb-2">
                                <strong>{shippingAddress.firstName} {shippingAddress.lastName}</strong>
                            </p>
                            <p className="mb-2">
                                {shippingAddress.address}, {shippingAddress.city}
                            </p>
                            <p>
                                {shippingAddress.zipCode} BE
                            </p>
                        </address>
                        <hr className="border-t-2 border-gray-300 my-8" />
                    </div>
                    <div className="w-full md:w-1/2 mt-8 md:mt-0">
                        <div className="text-center">
                            <h3 className="text-2xl font-bold mb-8">Your Order</h3>
                        </div>
                        <div className="order-summary">
                            {items.map((product: ProductCart, index: number) => (
                                <div className="flex items-center mb-4" key={index}>
                                    <div className="w-1/4">
                                        <Image
                                            src={product.cover}
                                            alt={product.name}
                                            width={120}
                                            height={50}
                                            className="rounded-md"
                                        />
                                    </div>
                                    <div className="w-3/4 pl-4">
                                        <p className="text-gray-800 font-semibold mb-1 text-lg">{product.name}</p>
                                        <p className="text-gray-600 text-sm">Quantity: {product.quantity}</p>
                                        <p className="text-gray-800 font-semibold text-lg">
                                            Total: {(product.price * product.quantity).toLocaleString("fr-FR", {
                                                style: "currency",
                                                currency: "EUR",
                                            })}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <hr className="border-t-2 border-gray-300 my-8" />
                        <div className="mt-4 flex justify-center">
                            <BtnPayment total={total} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
