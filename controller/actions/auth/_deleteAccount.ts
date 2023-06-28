'use server'

import { prisma } from "@/lib/prisma"

export const deleteAccount = async (session: any) => {
    const userID = session.id

    const user = await prisma.user.findUnique({
        where: {
            id: userID,
        },
    });

    // Check if the user exists
    if (!user) {
        return { error: 'User not found' };
    }

    // Check if the user is an admin
    if (user.role === 'ADMIN') {
        return { error: 'Cannot delete admin user' };
    }

    await prisma.user.delete({
        where: {
            id: userID
        }
    })

    return { success: true }
}