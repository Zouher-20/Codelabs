'use client';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import IconRenderer from '../globals/icon';

export default function PostPayment() {
    const [status, setStatus] = useState(null);
    const [customerEmail, setCustomerEmail] = useState('');

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const sessionId = urlParams.get('session_id');

        fetch(`/api/plans/checkout-sessions?session_id=${sessionId}`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                setStatus(data.status);
                setCustomerEmail(data.customer_email);
            });
    }, []);

    if (status === 'open') {
        return redirect('/');
    }

    if (status === 'complete') {
        return (
            <section className="min-w-screen flex min-h-screen flex-col items-center justify-center">
                <Image height={350} width={350} src="/payment.svg" alt="" />
                <span className="mt-10 text-2xl font-bold">We appreciate your business! 💚</span>
                <span className="mt-5">
                    A confirmation email will be sent to{' '}
                    <span className="text-primary">{customerEmail}</span>.
                </span>
                <span>
                    If you have any questions, please email{' '}
                    <a
                        className="link no-underline hover:text-primary hover:underline"
                        href="mailto:support@codelabs.com"
                    >
                        support@codelabs.com
                    </a>
                </span>
                <Link href="/discover">
                    <button className="btn btn-primary btn-lg mt-8">
                        <IconRenderer icon="solar:double-alt-arrow-right-bold" />
                        Return to home
                    </button>
                </Link>
            </section>
        );
    }

    return null;
}
