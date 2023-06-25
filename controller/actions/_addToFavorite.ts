'use server'
import { prisma } from "@/lib/prisma";
import { Products } from "@prisma/client";


interface AddToFavoriteData {
    item: Products
    session: any;
}

export const addToFavoriteAction = async (data: AddToFavoriteData) => {
    const { item, session } = data;
    const { id: sessionId } = session;
    const { id: productId } = item;


    const existingFavorite = await prisma.favoriteProduct.findFirst({
        where: {
            userId: sessionId,
            productId,
        },
    });

    if (existingFavorite) {
        await prisma.favoriteProduct.delete({
            where: {
                id: existingFavorite.id,
            },
        });
        
        return { message: 'This item is already in your favorites. Remove it from your favorites.' };
    }

    await prisma.favoriteProduct.create({
        data: {
            userId: sessionId,
            productId,
        },
    });

    return { message: 'Item successfully added to your favorites.' };
};