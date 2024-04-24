'use client';

import Navbar from '@/app/components/layout/navbar';
import Sidebar from '@/app/components/layout/sidebar';
import NewLabModel from '@/app/components/modals/new-lab';
import { AdminSiteSidebarItem } from '@/app/constants/sidebar-item';

export default function AuthPage({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex min-h-screen items-start">
            <Sidebar
                children={
                    <div className="flex flex-col">
                        <Navbar />
                        {children}
                    </div>
                }
                sidebarItems={AdminSiteSidebarItem}
            />
            <NewLabModel />
        </div>
    );
}
