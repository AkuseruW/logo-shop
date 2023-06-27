import { prisma } from "@/lib/prisma"

export const myFavorite = async (session: any) => {
    const { id: userId } = session

    const favorites = await prisma.favoriteProduct.findMany({
        where: { userId },
        include: { product: true }
    })

    return { favorites }
}