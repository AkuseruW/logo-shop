import { prisma } from '@/lib/prisma';

export const totalCustomers = async () => {
    const customers = await prisma.user.count();
    return { customers }
}

export const countOrderOfCurrentMount = async () => {
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    const currentMonth = currentDate.getMonth() + 1

    const orderCount = await prisma.order.count({
        where: {
            AND: [
                { createdAt: { gte: new Date(currentYear, currentMonth - 1, 1) } },
                { createdAt: { lt: new Date(currentYear, currentMonth, 1) } }
            ]
        }
    })

    return { orderCount }
}

export const totalOrder = async () => {
    const orders = await prisma.order.findMany()
    const totalRevenue = orders.reduce((acc, order) => acc + (order.totalPrice ?? 0), 0)

    return { totalRevenue }
}

export const monthlyData = async () => {
    const orders = await prisma.order.findMany();

    const monthlyTotals = Array(12).fill(0);

    orders.forEach((order) => {
        const orderMonth = new Date(order.createdAt).getMonth();
        monthlyTotals[orderMonth] += order.totalPrice;
    });

    return { orders, monthlyTotals }
}

export const lastOrder = async () => {
    const orders = await prisma.order.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: {
            user: true
        }
    })

    return { orders }
}

export const countOrderPaid = async () => {
    const isPaid = await prisma.order.count({
        where: {
            isPaid: true,
        }
    })

    const isDelivered = await prisma.order.count({
        where: {
            isDelivered: false,
        }
    })

    return { isPaid, isDelivered }
}