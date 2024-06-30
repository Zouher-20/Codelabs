import Button from '@/app/components/globals/form/button';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {

    return (
        <div className="navbar">
            <div className=" flex flex-1 justify-between">
                <div className="flex justify-start w-1/3 px-4 ">
                    <Image src="/logo-title.svg" width={150} height={35} alt="logo" />
                </div>
                <ul
                    className="menu menu-horizontal px-1 gap-2 text-lg self-center">
                    <li><a href='/landing-page#Services'>Services</a></li>
                    <li><a href='/landing-page#Contact us'>Contact us</a></li>
                    <li><a href='/landing-page#Frameworks'>Frameworks</a></li>
                </ul>
                <div className='flex gap-4'>
                    <Link href={'/login'} className="btn btn-sm btn-primary px-8 rounded-xl  mr-2">Login</Link>
                    <Link href={'/register'} className="btn btn-sm btn-primary px-8 rounded-xl  mr-8">Register Now</Link>
                </div>
            </div>
        </div>
    );
}
