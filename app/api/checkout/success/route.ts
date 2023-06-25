import Stripe from 'stripe'
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from 'next/server'
import { getCartItems } from '@/app/api/checkout/webhooks/route'
import { CART_COOKIE_KEY } from '@/utils/const'



const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
})

export async function GET(request: NextRequest): Promise<NextResponse> {
  const sessionId = new URLSearchParams(request.nextUrl.search).get('session_id')

  if (sessionId === null) {
    return NextResponse.json("Invalid session ID", { status: 400 });
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId);
  const lineItemsResponse = await stripe.checkout.sessions.listLineItems(session.id);
  const lineItems: Stripe.LineItem[] = lineItemsResponse.data;
  const orderItems = await getCartItems(lineItems);
  const shippingAddress = JSON.parse(session.metadata!.shippingAddress);

  const order = {
    id: session.id,
    email: session.customer_email,
    shippingAddress,
    orderItems,
    paymentIntent: session.payment_intent as String | null,
    total: session.amount_total,
    subtotal: session.amount_subtotal,
  }
  
 
  return NextResponse.json({ order }, { status: 200 });
}

export async function POST(request: Request): Promise<NextResponse> {

  // const cookieStore = cookies();
  // const cartItems = cookieStore.get(CART_COOKIE_KEY);
  // const items = cartItems ? JSON.parse(cartItems.value) : [];


  // Return a JSON response with a success message
  return NextResponse.redirect(new URL('/profile', request.url));
}
