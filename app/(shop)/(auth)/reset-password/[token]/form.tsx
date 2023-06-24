'use client'
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { resetTokenChangePasswordActions } from '@/controller/actions/auth/_resetToken';

type Inputs = {
  password: string;
  confirmPassword: string;
};

const PasswordReset = ({ token }: { token: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();

  const onSubmit = async (data: Inputs) => {
    if (data.password === data.confirmPassword) {
      setIsLoading(true);
      const changePassword = await resetTokenChangePasswordActions(data, token)

      if (changePassword?.error) {
        setMessage(changePassword?.error);
        setIsLoading(false)
      }
      
      if (changePassword?.message) {
        setMessage(changePassword?.message);
        setIsLoading(false)
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {message && (
        <p className={`text-${message.endsWith('successfully') ? 'green' : 'red'}-500 font-semibold ${message.endsWith('successfully') ? 'bg-green-200' : 'bg-red-200'} rounded-md p-4 mb-4`}>
          {message}
        </p>
      )}
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
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-stone-800 focus:outline-none focus:bg-black-500 focus:ring-offset-2"
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Reset password'}
        </button>
      </div>
    </form>
  )
}

export default PasswordReset