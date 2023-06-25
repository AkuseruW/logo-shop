'use server'
import Stripe from 'stripe';
import { Products, ShippingAddress } from '@prisma/client';

interface Product extends Products {
    quantity: number;
}

interface UserSession {
    name: string;
    email: string;
    userId: string;
}

interface PaymentInformation {
    items: Product[];
    userSession: UserSession;
    shippingAddress: ShippingAddress;
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2022-11-15',
});

export const payementAction = async (paymentInformation: PaymentInformation) => {

    const { items: cartItems, userSession, shippingAddress } = paymentInformation
    const { name, email, userId } = userSession
    const items = cartItems;
    const addressStringify = JSON.stringify(shippingAddress);

    let product_for_stripe = [];
    // Add line items for products
    for (const product of items) {
        product_for_stripe.push({
            price_data: {
                currency: 'eur',
                unit_amount: product.price * 100,
                product_data: {
                    name: product.name,
                    images: [product.cover],
                    metadata: { productId: product.id }
                },
            },
            tax_rates: ["txr_1NDoYJAdBPRBiTy5naS1LXb2"],
            quantity: product.quantity,
        });
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
        line_items: product_for_stripe,
        mode: 'payment',
        invoice_creation: {
            enabled: true,
        },
        customer_email: email,
        client_reference_id: userId,
        metadata: { addressStringify },
        shipping_options: [
            {
                shipping_rate: "shr_1NDXF3AdBPRBiTy5X9h69DXJ",
            }
        ],
        success_url: `${process.env.BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.BASE_URL}/checkout/payment`,
    });

    return { url: session.url }
};