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

    return
}