'use client';
import { useState } from 'react';
import Button from '../globals/form/button';
import PaymentForm from './payment-form';

export default function PaymentButton({ priceId }: { priceId: string }) {
    const [modalShown, setModalShown] = useState(false);
    const onClick = () => {
        (document.getElementById('payment-modal') as Record<string, any>)?.showModal();
        setModalShown(true);
    };
    return (
        <>
            <Button label="Start now" color="outline" onClick={onClick} />
            <dialog id="payment-modal" className="modal">
                <div className="modal-box min-h-[654px] w-10/12 max-w-screen-xl">
                    <div className="flex w-full justify-end">
                        <form
                            onSubmit={() => {
                                setModalShown(false);
                            }}
                            method="dialog"
                        >
                            <button className="btn btn-sm">X</button>
                        </form>
                    </div>
                    {modalShown && <PaymentForm priceId={priceId} />}
                </div>
            </dialog>
        </>
    );
}
