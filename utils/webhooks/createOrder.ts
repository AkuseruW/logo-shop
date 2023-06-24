import { prisma } from '@/lib/prisma';

interface PaymentInfo {
    id: string;
    status: string;
    amountPaid: number;
    taxPaid: number;
    shippingRate: number;
}

interface ShippingAddress {
    address: string;
    city: string;
    postalCode: string;
    country: string;
    shippingPrice: number;
    zipCode: string;
}

interface OrderItem {
    product: string;
    name: string;
    quantity: number | null;
    price: number;
    cover: string[];
}

export async function createOrder
    (paymentInfo: PaymentInfo,
        shippingAddress: ShippingAddress,
        orderItems: OrderItem[],
        userId: string
    ) {

    await prisma.order.create({
        data: {
            paymentMethod: paymentInfo.id,
            userId,
            taxPrice: paymentInfo.taxPaid,
            totalPrice: paymentInfo.amountPaid,
            shippingPrice: paymentInfo.shippingRate,
            isPaid: true,
            paidAt: new Date(),
            shippingAddress: {
                create: {
                    address: shippingAddress.address,
                    city: shippingAddress.city,
                    postalCode: shippingAddress.zipCode,
                    country: shippingAddress.country,
                    shippingPrice: paymentInfo.shippingRate,
                },
            },
            orderItems: {
                create: orderItems.map((item) => ({
                    product: { connect: { id: item.product } },
                    name: item.name,
                    qty: item.quantity,
                    price: item.price,
                    image: item.cover[0],
                })),
            },
        },
        include: {
            shippingAddress: true,
            orderItems: true,
        },
    });

}