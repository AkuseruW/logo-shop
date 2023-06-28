'use server'

import { prisma } from "@/lib/prisma"

export const deleteAccount = async (session: any) => {
    const userID = session.id

    await prisma.user.delete({
        where: {
            id: userID
        }
    })

    return { success: true }
}