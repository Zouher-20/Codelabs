'use client';
import { DefaultToastOptions, Toaster } from 'react-hot-toast';

const toastOptions: DefaultToastOptions = {
    className: 'cb-toast',
    duration: 5000,
    style: {
        borderRadius: '8px',
        background: '#171818',
        color: '#fff',
        opacity: 1,
        padding: '15px 20px'
    },

    success: {
        duration: 3000
    }
};
export function CustomToaster() {
    return (
        <>
            <Toaster position="bottom-right" toastOptions={toastOptions} />
        </>
    );
}
