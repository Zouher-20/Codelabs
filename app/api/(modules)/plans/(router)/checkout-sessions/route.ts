import { NextRequest, NextResponse } from 'next/server';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function POST(req: NextRequest) {
    try {
        const session = await stripe.checkout.sessions.create({
            ui_mode: 'embedded',
            line_items: [
                {
                    price: req.nextUrl.searchParams.get('priceId'),
                    quantity: 1
                }
            ],
            mode: 'subscription',
            return_url: `${req.headers.get('origin')}/post-payment?session_id={CHECKOUT_SESSION_ID}`
        });

        return NextResponse.json({
            clientSecret: session.client_secret
        });
    } catch (err) {
        return NextResponse.json(err);
    }
}

export async function GET(req: NextRequest) {
    try {
        const session = await stripe.checkout.sessions.retrieve(
            req.nextUrl.searchParams.get('session_id')
        );

        return NextResponse.json({
            status: session.status,
            customer_email: session.customer_details.email
        });
    } catch (err) {
        return NextResponse.json(err);
    }
}
