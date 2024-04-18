import { SideBarItemType } from '@/app/constants/sidebar-item';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Url } from 'next/dist/shared/lib/router/router';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
export default function Sidebar({
    children,
    sidebarItems
}: Readonly<{
    children: React.ReactNode;
    sidebarItems: Array<SideBarItemType>;
}>) {
    const router = usePathname();

    const MenuItem = ({
        icon,
        name,
        route
    }: {
        icon: React.ReactNode | undefined;
        name: String | undefined;
        route: Url | undefined;
    }) => {
        if (name == null || route == null || icon == null) {
            return <div className="h-10"></div>;
        }
        // Highlight menu item based on currently displayed route
        const colorClass = router.includes(route.toString())
            ? 'text-primary'
            : 'text-white/50 hover:text-white';
        const background = router.includes(route.toString()) ? 'bg-base-100' : '';

        return (
            <li>
                <Link
                    href={route}
                    className={`text-md flex gap-1 border-b-white/10 py-3 pl-6 [&>*]:my-auto ${colorClass} ${background} `}
                >
                    <div className="flex w-[30px] text-xl [&>*]:mx-auto">{icon}</div>
                    <div>{name}</div>
                </Link>
            </li>
        );
    };

    return (
        <>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">{children}</div>
                <div className="drawer-side">
                    <label
                        htmlFor="my-drawer-2"
                        aria-label="close sidebar"
                        className="drawer-overlay"
                    ></label>
                    <nav className="menu min-h-full w-64 bg-neutral p-4 text-base-content">
                        <div className="w-full pb-6 pt-1">
                            <Image src="/logo-title.svg" width={150} height={35} alt="logo" />
                        </div>
                        <ul>
                            {sidebarItems.map(e => (
                                <MenuItem
                                    key={e.name + 'name'}
                                    icon={<Icon icon={e.icon ?? ''} />}
                                    name={e.name}
                                    route={e.route}
                                ></MenuItem>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    );
}
