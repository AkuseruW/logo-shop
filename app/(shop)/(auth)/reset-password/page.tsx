import React from 'react';
import { Metadata } from 'next';
import ResetPasswordForm from '@/components/auth/resetPasswordForm';

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
    title: 'Password forgot ?',
    description: 'Reset your password',
};

const PasswordForget = () => {

    return (
        <div className="flex justify-center h-[65vh] flex-col sm:mx-auto sm:w-full sm:max-w-sm">
            <h1 className="text-2xl font-bold mb-4 text-center">Password forgot ?</h1>
            <ResetPasswordForm />
        </div>
    )
};

export default PasswordForget