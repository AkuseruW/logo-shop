import { prisma } from "@/lib/prisma";


export async function getAllCategories() {
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

export const getCategoryPaginate = async (searchParams: { page: string, search: string }) => {
    const page = searchParams.page
    const search = searchParams.search

    // Parse the 'page' parameter as an integer, defaulting to 1 if not provided
    const pageNumber = parseInt(page as string, 10) || 1;
    const itemsPerPage = 12;

    let where = {};

    if (search) {
        where = {
            name: { contains: search, mode: 'insensitive' },
        };
    }


    // Get the total count of products
    const totalCount = await prisma.categories.count({ where });
    // Calculate the total number of pages based on the items per page
    const totalPages = Math.ceil(totalCount / itemsPerPage);

    const skip = (pageNumber - 1) * itemsPerPage;

    const categories = await prisma.categories.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: itemsPerPage,
        skip,
    });

    prisma.$disconnect()
    return { categories, totalPages }
}