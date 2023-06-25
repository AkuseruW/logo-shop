import { prisma } from "@/lib/prisma";

interface SessionProps {
    name: string,
    email: string,
    sub: string,
    id: string,
    role: string,
    iat: number,
    exp: number,
    jti: string
}

export const getMyOrder = async (session: SessionProps, searchParams: { page: string }) => {
    const { id: userId } = session
    const page = searchParams.page

    const itemsPerPage = 10;
    const pageNumber = parseInt(page as string, 10) || 1;
    const skip = (pageNumber - 1) * itemsPerPage;

    const totalCount = await prisma.order.count({
        where: { userId },
    });

    const totalPages = Math.ceil(totalCount / itemsPerPage);

    const myOrders = await prisma.order.findMany({
        where: { userId },
        include: { orderItems: true },
        take: itemsPerPage,
        skip,
    });

    return { myOrders, totalPages }
}