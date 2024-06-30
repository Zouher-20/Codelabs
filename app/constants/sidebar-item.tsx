const UserSiteSidebarItem: Array<SideBarItemType> = [
    {
        icon: 'solar:earth-bold-duotone',
        name: 'Discover',
        route: '/discover'
    },
    {
        icon: 'solar:user-circle-bold-duotone',
        name: 'My labs',
        route: '/labs'
    },
    {
        icon: 'solar:screen-share-bold-duotone',
        name: 'Shared with me',
        route: '/shared'
    },
    {
        icon: 'solar:star-circle-bold-duotone',
        name: 'Stared',
        route: '/stared'
    },
    {},
    {
        icon: 'solar:medal-star-circle-bold-duotone',
        name: 'Challenges',
        route: '/challenges'
    },

    {
        icon: 'solar:square-academic-cap-bold-duotone',
        name: 'Classes',
        route: '/classes'
    },
    {
        icon: 'solar:slider-minimalistic-horizontal-bold-duotone',
        name: 'Blogs',
        route: '/blogs'
    }
];
const AdminSiteSidebarItem: Array<SideBarItemType> = [
    {
        icon: 'solar:earth-bold-duotone',
        name: 'Discover',
        route: '/admin/discover'
    },
    {
        icon: 'solar:user-circle-bold-duotone',
        name: 'Users',
        route: '/admin/users'
    },
    {
        icon: 'solar:screen-share-bold-duotone',
        name: 'Plans',
        route: '/admin/plans'
    },
    {},
    {
        icon: 'solar:medal-star-circle-bold-duotone',
        name: 'Challenges',
        route: '/admin/challenges'
    },

    {
        icon: 'solar:square-academic-cap-bold-duotone',
        name: 'Classes',
        route: '/admin/classes'
    },
    {
        icon: 'solar:slider-minimalistic-horizontal-bold-duotone',
        name: 'Blogs',
        route: '/admin/blogs'
    },
    {
        icon: 'solar:diploma-verified-bold-duotone',
        name: 'Templetes',
        route: '/admin/templetes'
    },
    {
        icon: 'solar:tag-bold-duotone',
        name: 'Tags',
        route: '/admin/tags'
    }
];

interface SideBarItemType {
    icon?: string;
    name?: string;
    route?: string;
}

export { AdminSiteSidebarItem, UserSiteSidebarItem };
export type { SideBarItemType };
