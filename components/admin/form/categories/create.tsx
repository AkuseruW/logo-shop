'use client'
import React, { useState, useEffect } from 'react';
import slugify from 'slugify';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { getError } from '@/utils/error';
import { useRouter } from 'next/navigation';

type FormData = {
    name: string;
    price: number;
    stock: number;
    brand: string;
    description?: string;
    slug: string;
    cover: FileList;
    publish?: boolean;
    category: string;
};

type ProductFormProps = {
    session: any;
};

export function CategoryFormCreate({ session }: ProductFormProps) {
    const router = useRouter()
    const { accessToken } = session?.user
    const [name, setName] = useState('');
    const [selectedFile, setSelectedFile] = useState([]);
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>();

    useEffect(() => {
        const slugValue = slugify(name, { lower: true });
        setValue("slug", slugValue)
    }, [name, setValue]);

    const handleFileChange = (event: any) => {
        if (event.target.files) {
            const files = event.target.files;
            const imagesArray = [];

            for (let i = 0; i < files.length; i++) {
                imagesArray.push(URL.createObjectURL(files[i]));
            }

            setSelectedFile(files);
        }
    };

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        const formData = new FormData();
        formData.append("image", selectedFile[0]);
        formData.append("data", JSON.stringify(data));
        try {
            setLoading(true)
            const response = await fetch(`/api/categories`, {
                method: 'POST',
                body: formData,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const result = await response.json();

            if (response.ok) {
                router.refresh
                router.push(`/dashboard/categories?created=${data.name}`)
            } else {
                toast(getError(result.message));
            }
        } catch (error) {
            toast.error('An error occurred while creating the category');
        } finally {
            setLoading(false)
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto mt-16">
            <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-medium mb-1">Name</label>
                <input
                    {...register('name', { required: true })}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    id="name"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                />
                {errors.name && <span className="text-red-500">Name is required</span>}
            </div>

            <div className="mb-4">
                <label htmlFor="slug" className="block text-gray-700 font-medium mb-1">Slug</label>
                <input
                    {...register('slug', { required: true })}
                    type="text"
                    id="slug"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                />
                {errors.slug && <span className="text-red-500">Slug is required</span>}
            </div>

            <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 font-medium mb-1">Description</label>
                <textarea
                    {...register('description')}
                    id="description"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                />
            </div>

            <div className="mb-4">
                <label htmlFor={name}>
                    <input type="file" id={name} hidden onChange={(e) => {
                        handleFileChange(e);
                    }} multiple />
                    <div className="w-40 rounded flex items-center justify-center border-2 ">
                        <span className="text-gray-400">
                            <p>Upload image</p>
                        </span>
                    </div>
                </label>
            </div>

            <button
                type="submit"
                className="bg-black text-white px-4 py-2 rounded-md w-full"
                disabled={loading}
            >
                {loading ? 'Creating...' : 'Create Category'}
            </button>
        </form>
    );
}
