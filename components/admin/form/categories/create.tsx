'use client'
import slugify from 'slugify';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { SubmitHandler, useForm } from 'react-hook-form';
import { categoryCreate } from '@/controller/actions/admin/_create';
import Image from 'next/image';

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
    const { toast } = useToast()
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<FileList | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
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
            setSelectedImage(imagesArray[0]);
        }
    };


    const onSubmit: SubmitHandler<FormData> = async (data) => {
        const formData = new FormData();
        if (selectedFile) {
            formData.append('image', selectedFile[0]);
            const dataWithImage = { ...data, image: formData, session };
            setLoading(true);
            const newCategory = await categoryCreate(dataWithImage);

            if (newCategory.message) {
                setLoading(false);
                toast({
                    title: "Category created successfully",
                    description: `${newCategory.message}`,
                });
                router.refresh();
                router.push(`/dashboard/categories?created=${data.name}`);
            }

            setLoading(false);

        } else {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "No file selected. Please choose a file.",
            });
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mt-16">
            <div className="flex">
                <div className="w-1/2 pr-2">
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

                </div>

                <div className="w-1/2 pl-24">
                    <div className="mb-4">
                        <div className="relative">
                            <label htmlFor='image' className="block text-gray-700 font-medium mb-1">Image</label>
                            <input
                                type="file"
                                id='image'
                                className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                                onChange={(e) => handleFileChange(e)}
                                multiple
                            />
                            <div className="w-64 h-64 rounded-md border-2 border-gray-300 flex items-center justify-center cursor-pointer">
                                {selectedImage ? (
                                    <Image src={selectedImage} alt="Selected Image" width={500} height={500} className="w-full h-full object-cover" />
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        className="w-6 h-6 text-gray-400"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                        />
                                    </svg>
                                )}
                            </div>
                            {selectedFile && (
                                // @ts-ignore
                                <span className="text-gray-500 text-sm mt-1">{selectedFile[0].name}</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <button
                type="submit"
                className="bg-black text-white px-4 py-2 rounded-md w-2/4"
                disabled={loading}
            >
                {loading ? 'Creating...' : 'Create Category'}
            </button>
        </form>
    );
}
