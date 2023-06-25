import Stripe from 'stripe';
import { NextResponse, NextRequest } from 'next/server'
import { cookies } from 'next/headers';
import { CART_COOKIE_KEY } from '@/utils/const';
import { SHIPPING_ADDRESS_KEY } from '@/utils/const';
import { getSession } from '@/lib/next-auth';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
});

export async function POST(request: Request) {
  // @ts-ignore
  const { id: userId, email } = await getSession()

  const cookieStore = cookies();
  const shippingInfo = cookieStore.get(SHIPPING_ADDRESS_KEY);
  const shippingAddress = shippingInfo!.value

  const cartItems = cookieStore.get(CART_COOKIE_KEY);
  const items = cartItems ? JSON.parse(cartItems.value) : [];

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
    metadata: { shippingAddress },
    shipping_options: [
      {
        shipping_rate: "shr_1NDXF3AdBPRBiTy5X9h69DXJ",
      }
    ],
    success_url: `${process.env.BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.BASE_URL}/checkout/payment`,
  });


  return NextResponse.json(session.url, { status: 202 })
}
