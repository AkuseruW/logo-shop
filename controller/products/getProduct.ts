import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { getSession } from "@/lib/next-auth";

export async function getProductFavorite(slug: string) {
    const session = await getSession();
    // @ts-ignore
    const userId = session?.id;

    let product = await prisma.products.findUnique({
        where: { slug: slug as string },
        include: {
            category: true,
            reviews: true,
            FavoriteProduct: true
        }
    });

    if (!product) {
        notFound();
    }

    const isFavorite = !!userId && product.FavoriteProduct.some((fav: any) => fav.userId === userId);
    const { FavoriteProduct, ...productWithoutFavorite } = product;

    const updatedProduct = {
        ...productWithoutFavorite,
        isFavorite: isFavorite
    };

    await prisma.$disconnect();
    return { product: updatedProduct };
}


export async function getProductBySlug(slug: string) {
    const session = await getSession();
    // @ts-ignore
    const userId = session?.id;

    let product = await prisma.products.findUnique({
        where: { slug: slug as string },
        include: {
            category: true,
            reviews: true,
            FavoriteProduct: true
        }
    });

    if (!product) {
        notFound();
    }


    await prisma.$disconnect();
    return { product };
}