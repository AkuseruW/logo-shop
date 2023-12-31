'use server'

import { prisma } from "@/lib/prisma";
import { deleteImageFromCloudinary, uploadImageToCloudinary } from "@/lib/cloudinary";


export const productCreate = async (data: any) => {
    const { name, brand, slug, price, stock, description, category, publish, image } = data

    const { image: uploadedImage } = Object.fromEntries(image);
    const { cover_id, cover_url } = await uploadImageToCloudinary(uploadedImage);

    try {
        const product = await prisma.products.create({
            data: {
                name,
                description,
                price: parseFloat(price as string),
                cover_id: cover_id,
                cover: cover_url,
                stock: parseInt(stock as string),
                brand,
                slug,
                publish,
                category: {
                    connect: {
                        id: category,
                    },
                },
            },
        });

        await prisma.$disconnect();
        return { message: `Product ${product.name} created successfully` }

    } catch (error: any) {
        await deleteImageFromCloudinary(cover_id);
        if (error.code === 'P2002' && error.meta?.target.includes('slug')) {
            return { error: 'This slug already exists. Please choose a different slug.' }
        } else {
            return { error: 'An error occurred while creating the product' }
        }
    }
}


export const categoryCreate = async (data: any) => {
    const { name, slug, description, image } = data

    const { image: uploadedImage } = Object.fromEntries(image);
    const { cover_id, cover_url } = await uploadImageToCloudinary(uploadedImage);

    // Create a new category
    const category = await prisma.categories.create({
        data: {
            name,
            description,
            image_id: cover_id,
            image: cover_url,
            slug,
        },
    });

    prisma.$disconnect();

    // Return a JSON response with a success message
    return { message: `Category ${category.name} created` }
}