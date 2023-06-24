import { getSession } from "@/lib/next-auth";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export async function GetProduct(slug: string) {
    const session = await getSession();
    // @ts-ignore
    const userId = session?.id;
    console.log(userId);

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
    console.log(isFavorite);
    const { FavoriteProduct, ...productWithoutFavorite } = product;

    const updatedProduct = {
        ...productWithoutFavorite,
        isFavorite: isFavorite
    };

    await prisma.$disconnect();
    return { product: updatedProduct };
}