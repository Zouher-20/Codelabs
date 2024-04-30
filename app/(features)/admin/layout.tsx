'use client';

import Navbar from '@/app/components/layout/navbar';
import Sidebar from '@/app/components/layout/sidebar';
import { AdminSiteSidebarItem } from '@/app/constants/sidebar-item';

export default function AuthPage({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex min-h-screen items-start">
            <Sidebar sidebarItems={AdminSiteSidebarItem}>
                <div className="flex flex-col">
                    <Navbar />
                    {children}
                </div>
            </Sidebar>
        </div>
    );
}
