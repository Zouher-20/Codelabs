import Button from '@/app/components/globals/form/button';
import Image from 'next/image';

export default function Navbar() {

    return (
        <div className="navbar">
            <div className=" flex flex-1 justify-between">
                <div className="flex justify-start w-1/3 px-4 mr-auto">
                    <Image src="/logo-title.svg" width={150} height={35} alt="logo" />
                </div>
                <button className="btn btn-sm btn-primary px-8 rounded-xl  mr-8">Register Now</button>
            </div>
        </div>
    );
}
