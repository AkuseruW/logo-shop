'use client'
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { SHIPPING_ADDRESS_KEY } from "@/utils/const";

type Inputs = {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
};

const CheckoutForm = () => {
    const router = useRouter();

    const { register, handleSubmit, formState: { errors }, setValue } = useForm<Inputs>();

    const onSubmit = (data: Inputs) => {
        Cookies.set(SHIPPING_ADDRESS_KEY, JSON.stringify(data));
        router.push("/checkout/payment");
    };

    useEffect(() => {
        const cookieData = Cookies.get(SHIPPING_ADDRESS_KEY);
        if (cookieData) {
            const parsedData = JSON.parse(cookieData);
            Object.keys(parsedData).forEach((key) => {
                setValue(key as keyof Inputs, parsedData[key]);
            });
        }
    }, [setValue]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto">
            <div className="grid grid-cols-2 gap-6">
                <div>
                    <label htmlFor="firstName" className="block text-gray-700 font-medium mb-2">
                        First Name
                    </label>
                    <input
                        type="text"
                        id="firstName"
                        {...register("firstName", { required: "First Name is required" })}
                        className="w-full border-gray-300 border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                    />
                </div>
                <div>
                    <label htmlFor="lastName" className="block text-gray-700 font-medium mb-2">
                        Last Name
                    </label>
                    <input
                        type="text"
                        id="lastName"
                        {...register("lastName", { required: "Last Name is required" })}
                        className="w-full border-gray-300 border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                    />
                </div>
            </div>
            <div className="mt-6">
                <label htmlFor="address" className="block text-gray-700 font-medium mb-2">
                    Address
                </label>
                <input
                    type="text"
                    id="address"
                    {...register("address", { required: "Address is required" })}
                    className="w-full border-gray-300 border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                />
            </div>
            <div className="grid grid-cols-3 gap-6 mt-6">
                <div>
                    <label htmlFor="city" className="block text-gray-700 font-medium mb-2">
                        City
                    </label>
                    <input
                        type="text"
                        id="city"
                        {...register("city", { required: "City is required" })}
                        className="w-full border-gray-300 border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                    />
                </div>
                <div>
                    <label htmlFor="state" className="block text-gray-700 font-medium mb-2">
                        State
                    </label>
                    <input
                        type="text"
                        id="state"
                        {...register("state", { required: "State is required" })}
                        className="w-full border-gray-300 border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                    />
                </div>
                <div>
                    <label htmlFor="zipCode" className="block text-gray-700 font-medium mb-2">
                        ZIP Code
                    </label>
                    <input
                        type="text"
                        id="zipCode"
                        {...register("zipCode", { required: "ZIP Code is required" })}
                        className="w-full border-gray-300 border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                    />
                </div>
            </div>
            <div className="mt-6">
                <label htmlFor="country" className="block text-gray-700 font-medium mb-2">
                    Country
                </label>
                <input
                    type="text"
                    id="country"
                    {...register("country", { required: "Country is required" })}
                    className="w-full border-gray-300 border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                />
            </div>
            <div className="mt-8">
                <button
                    type="submit"
                    className="w-full py-4 rounded-lg bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 flex items-center gap-2 justify-center"
                >
                    Submit
                </button>
            </div>
        </form>
    );
};

export default CheckoutForm;
