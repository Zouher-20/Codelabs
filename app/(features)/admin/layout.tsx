'use client';

import Sidebar from '@/app/components/layout/sidebar';
import { AdminSiteSidebarItem } from '@/app/constants/sidebar-item';

export default function AuthPage({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="">
            <Sidebar
                children={<div className="flex flex-col py-4">{children}</div>}
                sidebarItems={AdminSiteSidebarItem}
            />
        </div>
    );
}
