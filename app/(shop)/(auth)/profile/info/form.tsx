'use client'
import { getError } from '@/utils/error';
import React from 'react';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

interface PasswordData {
    password: string;
    confirmPassword: string;
}


export const FormUpdateInfoPassword = ({ session }: { session: any }) => {
    const token = session!.user.accessToken;

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<PasswordData>();

    const onSubmit = async (data: PasswordData) => {
        if (data.password === data.confirmPassword) {
            try {
                const res = await fetch(`/api/profile/update-password`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(data),
                });
                if (res.ok) {
                    const response = await res.json();
                    toast.success(response.message);
                } else {
                    toast.error('An error occurred while updating the password');
                }
            } catch (error) {
                toast.error(getError(error));
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                </label>
                <div className='mt-2'>
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
            </div>

            <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
                    Confirm Password
                </label>
                <div className='mt-2'>
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
            </div>

            <div>
                <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-stone-800 focus:outline-none focus:bg-black-500 focus:ring-offset-2"
                >
                    Update Password
                </button>
            </div>
        </form>
    );
};
