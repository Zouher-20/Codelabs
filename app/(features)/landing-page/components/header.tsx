import { getSession } from '@/app/api/(modules)/auth/service/actions';
import { ROLE } from '@prisma/client';
import Link from 'next/link';

const Header = async () => {
    const session = await getSession();
    return (
        <div className="flex flex-col items-center justify-center px-8 pt-24 text-center">
            <h1 className="text-5xl font-bold">
                Create Your Lab! <br /> With Your Favorate FrameWork
            </h1>
            <p className="py-6">
                CodeLabs is your best choise as an online code editor fast easy and flexible.
            </p>
            <Link
                href={
                    session && session.role === ROLE.ADMIN
                        ? '/admin/discover'
                        : session && session.role === ROLE.USER
                          ? '/discover'
                          : '/register'
                }
                className="btn btn-primary max-w-fit text-lg "
            >
                Get Started
            </Link>
        </div>
    );
};

export default Header;
