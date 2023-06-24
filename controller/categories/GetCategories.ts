import { prisma } from "@/lib/prisma";


export async function GetCategories() {
    const categories = await prisma.categories.findMany({
        orderBy: { createdAt: 'desc' },
    });

    prisma.$disconnect()
    return { categories }
}

export async function GetSelectedCategories() {
    const categories = await prisma.categories.findMany({
        where: {
            name: {
                in: ['Games', 'Home', 'Devices'],
            },
        },
    });

    prisma.$disconnect()
    return { categories }
}