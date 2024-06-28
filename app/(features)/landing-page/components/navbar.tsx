import Button from '@/app/components/globals/form/button';
import Image from 'next/image';

export default function Navbar() {

    return (
        <div className="navbar">
            <div className=" flex flex-1 justify-between">
                <div className="flex justify-end w-1/3">
                    <Image src="/logo-title.svg" width={150} height={35} alt="logo" />
                </div>
                <div className="navbar-start hidden lg:flex " >
                    <ul className="menu menu-horizontal px-1 gap-8">
                        <li><a>Discover</a></li>
                        <li><a>Challenges</a></li>
                        <li><a>Classes</a></li>
                        <li><a>Blogs</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
