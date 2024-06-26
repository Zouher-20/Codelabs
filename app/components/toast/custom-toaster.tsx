'use client';
import { DefaultToastOptions, Toaster, ToasterProps } from 'react-hot-toast';

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
export function CustomToaster({ pos }: { pos?: boolean }) {
    return (
        <>
            <Toaster position={pos ? 'bottom-left' : 'bottom-right'} toastOptions={toastOptions} />
        </>
    );
}
