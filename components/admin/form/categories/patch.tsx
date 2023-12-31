'use client'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Categories } from '@prisma/client';
import { useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { SubmitHandler, useForm } from 'react-hook-form';
import { updateCategory } from '@/controller/actions/admin/_update';

interface CategoryToUpdate extends Categories {
    image: any
}


export function CategoryFormUpdate({ category }: {category: Categories;}) {
    const router = useRouter()
    const { toast } = useToast()
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<FileList | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const { register, handleSubmit, setValue, formState: { errors }, watch } = useForm<CategoryToUpdate>();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

    const onSubmit: SubmitHandler<CategoryToUpdate> = async (data) => {
        const formData = new FormData();
        let dataForController = { ...data, id: category.id }

        if (selectedFile) {
            formData.append('image', selectedFile[0]);
            dataForController = { ...dataForController, image: formData };
        }

        setIsLoading(true);
        const updatedCategory = await updateCategory(dataForController);

        if (updatedCategory.message) {
            setIsLoading(false);
            toast({
                title: "Updated successfully",
                description: `${updatedCategory.message}`,
            });
            router.push(`/dashboard/categories`)
            router.refresh();
        }
    };

    useEffect(() => {
        if (category) {
            setValue('name', category.name)
            setValue('description', category.description)
            setValue('slug', category.slug)
        }
    }, [category, setValue]);

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
                                <span className="text-gray-500 text-sm mt-1">{selectedFile[0].name}</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <button type="submit" className="bg-black text-white px-4 py-2 rounded-md w-3/6" disabled={isLoading}>
                    {isLoading ? 'Updating...' : 'Update Category'}
                </button>
            </div>
        </form>
    );
}
