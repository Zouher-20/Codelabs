'use client';

import IconRenderer from '@/app/components/globals/icon';
import { useRouter } from 'next/navigation';

export default function BackBtn() {
    const router = useRouter();
    const onBackClick = () => {
        router.back();
    };
    return (
        <>
            <IconRenderer
                onClick={onBackClick}
                className="cursor-pointer text-3xl hover:text-primary"
                icon="solar:arrow-left-linear"
            />
        </>
    );
}
