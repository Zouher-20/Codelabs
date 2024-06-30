import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
    return (
        <div className="navbar">
            <div className=" flex flex-1 justify-between">
                <div className="flex w-1/3 justify-start px-4 ">
                    <Image src="/logo-title.svg" width={150} height={35} alt="logo" />
                </div>
                <ul className="menu menu-horizontal gap-2 self-center px-1 text-lg">
                    <li>
                        <a href="/landing-page#Services">Services</a>
                    </li>
                    <li>
                        <a href="/landing-page#Contact us">Contact us</a>
                    </li>
                    <li>
                        <a href="/landing-page#Frameworks">Frameworks</a>
                    </li>
                </ul>
                <div className="flex gap-4">
                    <Link href={'/login'} className="btn btn-primary btn-sm mr-2 rounded-xl  px-8">
                        Login
                    </Link>
                    <Link
                        href={'/register'}
                        className="btn btn-primary btn-sm mr-8 rounded-xl  px-8"
                    >
                        Register Now
                    </Link>
                </div>
            </div>
        </div>
    );
}
