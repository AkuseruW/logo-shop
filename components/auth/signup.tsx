'use client'
import { useForm } from "react-hook-form";
import React, { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";


type Inputs = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
};

interface SignUpData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface LoginRequest {
    name: string;
    email: string;
    password: string;
}

interface LoginResponse {
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
    };
}

export default function SignUpForm() {
    const [loading, setLoading] = useState(false);
    const [isRGPDChecked, setIsRGPDChecked] = useState(false);
    const [showRGPDError, setShowRGPDError] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>();

    const handleRGPDCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsRGPDChecked(e.target.checked);
        setShowRGPDError(false);
    };


    const onSubmit = async (data: SignUpData) => {
        if (isRGPDChecked && data.password === data.confirmPassword) {
            try {
                setLoading(true)
                const res = await fetch(`/api/register`, {
                    cache: 'no-store',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data),
                    credentials: 'include'
                })

                const result = await res.json();

                if (res.ok) {
                    toast.success('Your account created successfully')
                }

            } catch (error) {

            } finally {
                setLoading(false)
                try {
                    await signIn('credentials', {
                        redirect: true,
                        email: data.email,
                        password: data.password,
                        callbackUrl: '/'
                    });
                } catch (error) {

                }
            }
        } else {
            setShowRGPDError(true);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                    Full Name
                </label>
                <input
                    id="name"
                    type="text"
                    {...register("name", { required: "Full name is required" })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.name && (
                    <span role="alert" className="text-red-500">
                        {errors.name.message}
                    </span>
                )}
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email Address
                </label>
                <input
                    id="email"
                    type="email"
                    {...register("email", {
                        required: "Email Address is required",
                        pattern: {
                            value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                            message: "Invalid email format",
                        },
                    })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.email && (
                    <span className="text-red-500">{errors.email.message}</span>
                )}
            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    {...register("password", { required: true, minLength: 8 })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.password && (
                    <span className="text-red-500">Password is required and must be at least 8 characters long</span>
                )}
            </div>

            <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
                    Confirm Password
                </label>
                <input
                    id="confirmPassword"
                    type="password"
                    {...register("confirmPassword", {
                        required: true,
                        validate: (value) =>
                            value === watch("password") || "Passwords do not match",
                    })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.confirmPassword && (
                    <span className="text-red-500">
                        {errors.confirmPassword.message}
                    </span>
                )}
            </div>
            <div>
                <label htmlFor="rgpd" className="flex items-center">
                    <input
                        id="rgpd"
                        type="checkbox"
                        checked={isRGPDChecked}
                        onChange={handleRGPDCheckboxChange}
                        className="mr-1.5"
                    />
                    I accept terms and conditions
                </label>
                {showRGPDError && (
                    <span className="text-red-500">Please accept terms and conditions</span>
                )}
            </div>

            <div>
                <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-stone-800 focus:outline-none focus:bg-black-500 focus:ring-offset-2"
                    disabled={loading}
                >
                    {loading ? 'Sign Up...' : 'Sign Up'}
                </button>
            </div>
        </form>
    );
}