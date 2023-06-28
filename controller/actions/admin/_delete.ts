'use server'

import { prisma } from "@/lib/prisma";
import { deleteImageFromCloudinary } from "@/lib/cloudinary";
import { error } from "console";

export const deleteProduct = async (data: any) => {
    const { productID } = data

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
    const { categoryID } = data

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
    const { customerID } = data
    console.log(customerID)
    // Check if the 'id' is missing
    if (!customerID) {
        return { error: 'Missing id' }
    }

    // Retrieve the user information
    const customer = await prisma.user.findUnique({
        where: { id: customerID },
    });

    // Check if the user exists
    if (!customer) {
        return { error: 'Customer not found' };
    }

    // Check if the user is an admin
    if (customer.role === 'ADMIN') {
        return { error: 'Cannot delete admin user' };
    }

    // Delete the product with the given 'id'
    await prisma.user.delete({
        where: { id: customerID },
    });

    prisma.$disconnect();
    return { message: 'customer deleted successfully' };
}