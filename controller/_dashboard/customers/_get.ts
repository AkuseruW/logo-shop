import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export const getCustomersPaginate = async (searchParams: { page: string, search: string }) => {
    const page = searchParams.page
    const search = searchParams.search

    // filter by search
    let where = {};

    if (search) {
        where = {
            name: { contains: search, mode: 'insensitive' },
        };
    }

    //Paginate 
    const pageNumber = parseInt(page as string, 10) || 1;
    const itemsPerPage = 12;
    const totalCount = await prisma.user.count({ where });
    const totalPages = Math.ceil(totalCount / itemsPerPage);
    const skip = (pageNumber - 1) * itemsPerPage;

    const customers = await prisma.user.findMany({
        where,
        orderBy: { name: 'desc' },
        take: itemsPerPage,
        skip,
    });

    prisma.$disconnect();
    return { customers, totalPages }
}

export const getCustomerById = async (id: string) => {
    // Fetch the products data for the current page
    const customer = await prisma.user.findUnique({
        where: { id: id as string },
        include: {
            Order: true,
        }
    });

    if (!customer) {
        notFound()
    }

    prisma.$disconnect();
    return { customer }
}
