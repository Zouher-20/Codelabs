'use client';
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useCallback } from 'react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '', {});

export default function PaymentForm({ priceId }: { priceId: string }) {
    const fetchClientSecret = useCallback(() => {
        return fetch(`/api/plans/checkout-sessions?priceId=${priceId}`, {
            method: 'POST'
        })
            .then(res => res.json())
            .then(data => data.clientSecret);
    }, []);

    const options = { fetchClientSecret };

    return (
        <div id="checkout">
            <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
                <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
        </div>
    );
}
