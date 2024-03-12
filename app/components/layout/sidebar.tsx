import Image from 'next/image';
export default function Sidebar() {
    return (
        <>
            <div className=" drawer drawer-open w-64">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-side">
                    <label
                        htmlFor="my-drawer-2"
                        aria-label="close sidebar"
                        className="drawer-overlay"
                    ></label>
                    <nav className="bg-base-400 menu min-h-full w-64 p-4 text-base-content">
                        <div className="w-full pb-6 pt-1">
                            <Image src="/logo-title.svg" width={150} height={35} alt="logo" />
                        </div>
                        <ul>
                            <li>
                                <a>Sidebar Item 1</a>
                            </li>
                            <li>
                                <a>Sidebar Item 2</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    );
}
