'use client';

import Sidebar from '@/app/components/layout/sidebar';
import NewLabModel from '@/app/components/modals/new-lab';
import { AdminSiteSidebarItem } from '@/app/constants/sidebar-item';
import AdminNavBar from './components/navbar';

export default function AuthPage({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex items-start">
            <Sidebar
                children={
                    <div className="flex flex-col">
                        <AdminNavBar />
                        {children}
                    </div>
                }
                sidebarItems={AdminSiteSidebarItem}
            />
            <NewLabModel />
        </div>
    );
}
