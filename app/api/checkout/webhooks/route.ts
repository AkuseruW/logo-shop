import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { sendConfirmationMail } from '@/utils/mail/confirmation_mail';
import { createOrder } from '@/utils/webhooks/createOrder';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2022-11-15',
});

export async function getCartItems(line_items: Stripe.LineItem[]) {
    const cartItems = [];
    for (const item of line_items) {
        // @ts-ignore
        const product = await stripe.products.retrieve(item.price.product);
        const productId = product.metadata.productId;

        cartItems.push({
            product: productId,
            name: product.name,
            price: Number(item.price!.unit_amount_decimal) / 100,
            quantity: item.quantity,
            cover: product.images
        });
    }

    return cartItems;
}

export async function POST(request: NextRequest) {
    const signature = request.headers.get('stripe-signature');
    const body = await request.text();

    try {
        const event = stripe.webhooks.constructEvent(body, signature ?? '', process.env.STRIPE_WEBHOOK_KEY ?? '');

        if (event.type === 'checkout.session.completed') {
            const session = event.data.object as Stripe.Checkout.Session;
            const lineItemsResponse = await stripe.checkout.sessions.listLineItems(session.id);
            const lineItems: Stripe.LineItem[] = lineItemsResponse.data;
            const orderItems = await getCartItems(lineItems);
            const userId = session.client_reference_id as string;
            const invoiceId = session.invoice
            const amountPaid = session.amount_total! / 100;
            const shippingAddress = JSON.parse(session.metadata!.shippingAddress);

            const paymentInfo = {
                id: session.payment_intent as string,
                status: session.payment_status,
                amountPaid,
                taxPaid: session.total_details!.amount_tax / 100,
                shippingRate: session.shipping_cost!.amount_subtotal / 100
            };


            await createOrder(paymentInfo, shippingAddress, orderItems, userId)

            for (const item of orderItems) {
                const product = await prisma.products.findUnique({
                    where: {
                        id: item.product,
                    },
                });

                const quantity = item.quantity || 0;
                const updatedQuantity = (product?.stock || 0) - quantity

                await prisma.products.update({
                    where: {
                        id: item.product,
                    },
                    data: {
                        stock: updatedQuantity,
                    },
                });
            }

            const userName = shippingAddress.firstName + ' ' + shippingAddress.lastName
            await sendConfirmationMail(userName, session.customer_email!)

            return NextResponse.json({ message: '' }, { status: 200 });
        }

    } catch (error) {
        console.error('Erreur lors du traitement du webhook:', error);
    }

}
