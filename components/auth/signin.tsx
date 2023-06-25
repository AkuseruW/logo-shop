'use client'
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

interface SignUpData {
    email: string;
    password: string;
}

type Inputs = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
};

const AuthForm = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [errorReq, setErrorReq] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit = async ({ email, password }: SignUpData) => {
        setLoading(true);
        const callback = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (callback?.error) {
            setLoading(false);
            setErrorReq(callback.error);
        } else {
            setLoading(false);
            router.refresh();
            router.push("/");
        }

    };

    return (
        <>
            {errorReq && (
                <div className="text-center bg-red-100 text-red-500 py-2 px-4 rounded-lg mb-2">
                    <span className="font-semibold">{errorReq}</span>
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                        Email address
                    </label>
                    <div className="mt-2">
                        <input
                            id="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            {...register("email", {
                                required: "Email Address is required",
                                pattern: {
                                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                                    message: "Invalid email format",
                                },
                            })}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                            Password
                        </label>
                        <div className="text-sm">
                            <Link href="/reset-password" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                Forgot password?
                            </Link>
                        </div>
                    </div>
                    <div className="mt-2">
                        <input
                            id="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            {...register("password", { required: true, minLength: 8 })}
                        />
                    </div>
                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1">
                            Password is required and must be at least 8 characters long
                        </p>
                    )}
                </div>

                <div>
                    <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-stone-800 focus:outline-none focus:bg-black-500 focus:ring-offset-2"
                        disabled={loading}
                    >
                        {loading ? "Sign in ..." : "Sign in"}
                    </button>
                </div>
            </form>
        </>
    );
};

export default AuthForm;
