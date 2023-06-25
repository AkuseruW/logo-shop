'use client'
import { contactFormAction } from '@/controller/actions/_contactForm';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

const ContactForm = (): JSX.Element => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState('');

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        setIsSubmitting(true);
        const contact = await contactFormAction(data)
        if (contact.message) {
            setIsSubmitting(false);
            setIsSuccess(contact.message)
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto">
            {isSuccess && (
                <p className="text-green-600 font-semibold bg-green-200 rounded-md p-4 mb-4">
                    {isSuccess}
                </p>
            )}
            <div className="grid grid-cols-2 gap-6">
                <div>
                    <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="name">Name</label>
                    <input
                        {...register('name', { required: 'This field is required' })}
                        type="text"
                        id="name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                    {errors.name && (
                        <span className="text-red-500 text-sm">{errors.name.message}</span>
                    )}
                </div>
                <div>
                    <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="email">Email</label>
                    <input
                        {...register('email', {
                            required: 'This field is required',
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: 'Invalid email address',
                            },
                        })}
                        type="email"
                        id="email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                    {errors.email && (
                        <span className="text-red-500 text-sm">{errors.email.message}</span>
                    )}
                </div>
            </div>
            <div>
                <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="subject">Subject</label>
                <input
                    {...register('subject', { required: 'This field is required' })}
                    type="text"
                    id="subject"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
                {errors.subject && (
                    <span className="text-red-500 text-sm">{errors.subject.message}</span>
                )}
            </div>
            <div className="mb-6">
                <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="message">Message</label>
                <textarea
                    {...register('message', { required: 'This field is required' })}
                    id="message"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
                {errors.message && (
                    <span className="text-red-500 text-sm">{errors.message.message}</span>
                )}
            </div>
            <button
                type="submit"
                className="bg-black text-white text-sm font-semibold px-6 py-3 rounded-md hover:bg-gray-900"
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Sending...' : 'Send'}
            </button>
        </form>
    );
};

export default ContactForm;
