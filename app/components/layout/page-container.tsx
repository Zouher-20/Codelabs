import { UserSiteSidebarItem } from '@/app/constants/sidebar-item';
import Navbar from './navbar';
import Sidebar from './sidebar';
export default function PageContainer({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex items-start">
            <Sidebar
                children={
                    <div className="flex flex-col">
                        <Navbar />
                        {children}
                    </div>
                }
                sidebarItems={UserSiteSidebarItem}
            />
        </div>
    );
}
