'use client'
import slugify from 'slugify';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { productCreate } from '@/controller/actions/admin/_create';


type Data = {
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
    categories: any;
};


export function ProductForm({ session, categories }: ProductFormProps) {
    const router = useRouter()
    const { toast } = useToast()
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<FileList | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<Data>();

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

    const onSubmit = async (data: Data) => {
        const formData = new FormData();
        if (selectedFile) {
            formData.append('image', selectedFile[0]);
            const dataWithImage = { ...data, image: formData, session };
            setLoading(true);
            const newProduct = await productCreate(dataWithImage);

            if (newProduct.message) {
                setLoading(false);
                router.refresh();
                router.push(`/dashboard/products?created=${data.name}`);
            }

            if (newProduct.error) {
                setLoading(false);
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: `${newProduct.error}`,
                });
            }
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
                        <label htmlFor="brand" className="block text-gray-700 font-medium mb-1">Brand</label>
                        <input
                            {...register('brand', { required: true })}
                            type="text"
                            id="brand"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                        />
                        {errors.brand && <span className="text-red-500">Brand is required</span>}
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

                    <div className="grid grid-cols-2 gap-4">
                        <div className="mb-4">
                            <label htmlFor="price" className="block text-gray-700 font-medium mb-1">Price</label>
                            <input
                                {...register('price', { required: true, pattern: /^[0-9]+(\.[0-9]{1,2})?$/ })}
                                type="number"
                                step="0.01"
                                id="price"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                            />
                            {errors.price && (
                                <span className="text-red-500">
                                    Price is required and must be a decimal number with two digits after the decimal point
                                </span>
                            )}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="stock" className="block text-gray-700 font-medium mb-1">Stock</label>
                            <input
                                {...register('stock', { required: true, pattern: /^[0-9]+$/ })}
                                type="number"
                                id="stock"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                            />
                            {errors.stock && (
                                <span className="text-red-500">Stock is required and must be an integer number</span>
                            )}
                        </div>
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
                        <label htmlFor="category" className="block text-gray-700 font-medium mb-1">Category</label>
                        <select
                            {...register('category', { required: true })}
                            id="category"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                        >
                            <option value="">Select a category</option>
                            {/** @ts-ignore */}
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                        {errors.category && <span className="text-red-500">Category is required</span>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="publish" className="flex items-center">
                            <span className="mr-2 block text-gray-700 font-medium">Publish</span>
                            <input
                                {...register('publish')}
                                type="checkbox"
                                id="publish"
                                className="form-checkbox h-4 w-4 text-blue-500"
                            />
                        </label>
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
                className="bg-black text-white px-4 py-2 rounded-md w-full"
                disabled={loading}
            >
                {loading ? 'Creating...' : 'Create Product'}
            </button>
        </form>
    );
}
