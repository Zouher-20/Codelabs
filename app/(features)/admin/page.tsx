'use client';

import Button from '@/app/components/globals/form/button';
import { useRouter } from 'next/navigation';

export default function MainAdminPage() {
    const route = useRouter();
    return (
        <div className="flex h-screen w-full flex-col items-center justify-center gap-2">
            This page will be implemented later
            <Button
                onClick={() => {
                    route.push('/admin/discover');
                }}
                style="w-fit"
                color="any"
                label="Go To Discover Page"
                type="submit"
            />
        </div>
    );
}
