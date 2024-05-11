'use client';

import Button from '@/app/components/globals/form/button';
import { useRouter } from 'next/navigation';

export default function Home() {
    const route = useRouter();
    return (
        <div className="flex h-screen w-full flex-col items-center justify-center gap-2">
            This page will be implemented later
            <Button
                onClick={() => {
                    route.push('/discover');
                }}
                style="w-fit"
                color="any"
                label="Go To Discover Page"
                type="submit"
            />
        </div>
    );
}
