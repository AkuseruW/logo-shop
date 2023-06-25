'use server'

import { prisma } from "@/lib/prisma";
import { deleteImageFromCloudinary } from "@/lib/cloudinary";

export const deleteProduct = async (data: any) => {
    const { productID, session } = data

    if (!session || session.user.role !== 'ADMIN') {
        throw new Error('Unauthorized')
    }

    // Check if the 'id' is missing
    if (!productID) {
        throw new Error('Missing id')
    }

    // Delete the product with the given 'id'
    const deleteImg = await prisma.products.findUnique({
        where: { id: productID },
    });

    deleteImageFromCloudinary(deleteImg?.cover_id as string)

    // Delete the product with the given 'id'
    const product = await prisma.products.delete({
        where: { id: productID },
    });

    prisma.$disconnect();
    return { message: 'Product deleted successfully', productID: product?.name };

}

export const deleteCategory = async (data: any) => {
    const { categoryID, session } = data

    if (!session || session.user.role !== 'ADMIN') {
        throw new Error('Unauthorized')
    }

    // Check if the 'id' is missing
    if (!categoryID) {
        throw new Error('Missing id')
    }

    // Delete the image with the given 'id'
    const deleteImg = await prisma.products.findUnique({
        where: { id: categoryID },
    });

    deleteImageFromCloudinary(deleteImg?.cover_id as string)

    // Delete all products associated with the given category
    await prisma.$transaction([
        prisma.products.deleteMany({
            where: { category: { some: { id: categoryID } } }
        }),
        prisma.categories.delete({
            where: { id: categoryID },
        })
    ])

    prisma.$disconnect();
    return { message: 'Category deleted successfully' };
}


export const deleteCustomer = async (data: any) => {
    const { customerID, session } = data

    if (!session || session.user.role !== 'ADMIN') {
        throw new Error('Unauthorized')
    }

    // Check if the 'id' is missing
    if (!customerID) {
        throw new Error('Missing id')
    }

    // Delete the product with the given 'id'
    await prisma.user.delete({
        where: { id: customerID },
    });

    prisma.$disconnect();
    return { message: 'customer deleted successfully' };
}