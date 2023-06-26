'use server'
import { prisma } from "@/lib/prisma";
import { Categories, Products } from "@prisma/client";
import { deleteImageFromCloudinary, uploadImageToCloudinary } from "@/lib/cloudinary";

interface ProductToUpdate extends Products {
    category: string,
    image: any
}

interface CategoryToUpdate extends Categories {
    image: any
}

export const updateProduct = async (data: ProductToUpdate) => {
    const { id, name, brand, slug, price, stock, description, category, publish, image } = data

    // Get the existing product data
    const existingProduct = await prisma.products.findUnique({
        where: { id },
        include: { category: true },
    });

    // Check if a new image is uploaded
    let cover_id = existingProduct?.cover_id;
    let cover_url = existingProduct?.cover;

    if (image) {
        if (existingProduct?.cover_id) {
            await deleteImageFromCloudinary(existingProduct.cover_id);
        }
        const { image: uploadedImage } = Object.fromEntries(image);
        const { cover_id: newCoverId, cover_url: newCoverUrl } = await uploadImageToCloudinary(uploadedImage);
        cover_id = newCoverId;
        cover_url = newCoverUrl;
    }

    // Update only the defined properties with new values, keeping the existing values if the new ones are null or undefined
    const updatedProduct = await prisma.products.update({
        where: { id },
        data: {
            name: name || existingProduct?.name,
            description: description || existingProduct?.description,
            price: parseFloat(price as any) || existingProduct?.price,
            cover: cover_url || existingProduct?.cover,
            cover_id: cover_id || existingProduct?.cover_id,
            stock: parseInt(stock as any) || existingProduct?.stock,
            brand: brand || existingProduct?.brand,
            slug: slug || existingProduct?.slug,
            publish: publish ?? existingProduct?.publish,
            category: {
                connect: {
                    id: category || existingProduct?.category?.[0]?.id,
                },
            },
        },
        include: { category: true },
    });

    await prisma.$disconnect();

    return { message: `Product ${updatedProduct.name} updated successfully` }
}



export const updateCategory = async (data: CategoryToUpdate) => {
    const { id, name, slug, description, image } = data

    // Get the existing product data
    const existingCategory = await prisma.categories.findUnique({
        where: { id },
    });

    // Check if a new image is uploaded
    let cover_id = existingCategory?.image_id;
    let cover_url = existingCategory?.image;


    if (image) {
        if (existingCategory?.image_id) {
            await deleteImageFromCloudinary(existingCategory.image_id);
        }
        const { image: uploadedImage } = Object.fromEntries(image);
        const { cover_id: newCoverId, cover_url: newCoverUrl } = await uploadImageToCloudinary(uploadedImage);
        cover_id = newCoverId;
        cover_url = newCoverUrl;
    }

    // Update only the defined properties with new values, keeping the existing values if the new ones are null or undefined
    const updatedCategory = await prisma.categories.update({
        where: { id },
        data: {
            name: name || existingCategory?.name,
            description: description || existingCategory?.description,
            image: cover_url || existingCategory?.image,
            image_id: cover_id || existingCategory?.image_id,
            slug: slug || existingCategory?.slug,
        },
    });

    console.log(updatedCategory)

    await prisma.$disconnect();

    return { message: `Category ${updatedCategory.name} updated successfully` }
}