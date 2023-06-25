import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";


export const getOrdersPaginate = async (session: any, searchParams: { page: string, search: string }) => {

    if (!session || session.user.role !== 'ADMIN') {
        throw new Error('Unauthorized')
    }

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
    const totalCount = await prisma.order.count({ where });
    const totalPages = Math.ceil(totalCount / itemsPerPage);
    const skip = (pageNumber - 1) * itemsPerPage;

    const orders = await prisma.order.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        include: { user: true },
        take: itemsPerPage,
        skip,
    });

    prisma.$disconnect();
    return { orders, totalPages }
}

export const getOrdersById = async (session: any, id: string) => {
    
    if (!session || session.role !== 'ADMIN') {
        throw new Error('Unauthorized')
    }
    // Fetch the order data
    const order = await prisma.order.findUnique({
        where: { id: id as string },
        include: {
            user: true,
            orderItems: true,
            shippingAddress: true
        },
    });

    if (!order) {
        notFound()
    }

    prisma.$disconnect();
    return { order }
}
