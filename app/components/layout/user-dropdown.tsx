import { userType } from '@/app/@types/user';
import { getSession, signOut } from '@/app/api/(modules)/auth/service/actions';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import IconRenderer from '../globals/icon';

export default function UserDropDown() {
    const router = useRouter();
    const [user, setUser] = useState<userType | null>(null);
    useEffect(() => {
        getUser();
    }, []);
    async function getUser() {
        const session = await getSession();
        if (session) {
            setUser({
                id: session?.id as string,
                email: session?.email as string,
                name: session?.username as string
            });
        }
    }

    return (
        <div className="dropdown">
            <div
                tabIndex={0}
                role="button"
                className="flex cursor-pointer items-center gap-2 rounded-btn hover:opacity-85"
            >
                {/* TODO : Get Those info from API and remove from next.config.js */}
                <div className="avatar w-9">
                    <div className="rounded-full">
                        <Image
                            height={38}
                            width={38}
                            alt="user"
                            src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                        />
                    </div>
                </div>
                <div className="text-start">
                    <span className="font-bold">{user?.name}</span>
                    <div className="text-xs">{user?.email}</div>
                </div>
            </div>

            <ul
                tabIndex={0}
                className="menu dropdown-content z-[1] mt-4 w-52 rounded-box bg-base-100  p-2 shadow"
            >
                <li>
                    <Link href={'/profile'} className="flex items-center gap-2">
                        <IconRenderer fontSize={16} icon="solar:user-outline" />
                        <div>Profile</div>
                    </Link>
                </li>
                <span className="divider my-0" />
                <li
                    onClick={() => {
                        signOut()
                            .then(() => {
                                router.push('/auth');
                            })
                            .catch(e => {
                                console.log(e);
                            });
                    }}
                >
                    <a className="flex items-center gap-2 text-error">
                        <IconRenderer fontSize={16} icon="solar:logout-2-outline" />
                        <div>Logout</div>
                    </a>
                </li>
            </ul>
        </div>
    );
}
