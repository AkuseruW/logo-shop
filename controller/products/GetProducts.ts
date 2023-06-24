import { prisma } from "@/lib/prisma";

export async function GetLastedProducts() {
    const products = await prisma.products.findMany({
        where: { publish: true },
        orderBy: { createdAt: 'desc' },
        take: 4,
    })

    prisma.$disconnect()
    return { products }
}

export async function GetProducts(searchParams: { page: string, category: string, search: string }) {
    const page = searchParams.page
    const category = searchParams.category
    const search = searchParams.search

    let where = {};
    // filter by category
    if (category) {
        where = {
            category: {
                some: {
                    slug: category
                }
            }
        };
    }

    // filter by search
    if (search) {
        where = {
            name: { contains: search, mode: 'insensitive' },
        };
    }

    //Paginate 
    const pageNumber = parseInt(page as string, 10) || 1;
    const itemsPerPage = 12;
    const totalCount = await prisma.products.count({ where });
    const totalPages = Math.ceil(totalCount / itemsPerPage);
    const skip = (pageNumber - 1) * itemsPerPage;


    const products = await prisma.products.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: itemsPerPage,
        skip,
        include: {
            category: true
        }
    });

    prisma.$disconnect()
    return { products, totalPages }
}