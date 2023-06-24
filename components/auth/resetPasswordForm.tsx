'use client'
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const ResetPasswordForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [isEmailSent, setIsEmailSent] = useState(false);


    const onSubmit = async (data: any) => {
        setIsLoading(true);

        const res = await fetch(`/api/password-reset`, {
            method: 'POST',
            body: JSON.stringify(data)
        })

        if (res.ok) {
            setIsEmailSent(true);
        }

        setIsLoading(false);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {isEmailSent && (
                <p className="text-green-600 font-semibold bg-green-200 rounded-md p-4 mb-4">An email has been sent to your address.</p>
            )}
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
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-stone-800 focus:outline-none focus:bg-black-500 focus:ring-offset-2"
                    disabled={isLoading}
                >
                    {isLoading ? 'Loading...' : 'Reset password'}
                </button>
            </div>
        </form>
    );
};

export default ResetPasswordForm;
