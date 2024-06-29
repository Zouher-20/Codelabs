import { userType } from '@/app/@types/user';
import { getMyInfo, getSession, signOut } from '@/app/api/(modules)/auth/service/actions';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import IconRenderer from '../globals/icon';
import noImage from '@/public/images/no-image2.png'

export default function UserDropDown() {
    const router = useRouter();
    const [user, setUser] = useState<userType | null>(null);
    useEffect(() => {
        getUser();
    }, []);
    async function getUser() {
        const user = await getMyInfo();
        if (user) {
            setUser(user as unknown as userType);
        }
    }
    const HandleImageError = () => {
        if (user) {
            const newUser = { ...user }
            newUser.userImage = noImage.src
            setUser(newUser);
        }
    }
    return (
        <div className="dropdown">
            <div
                tabIndex={0}
                role="button"
                className="flex cursor-pointer items-center gap-2 rounded-btn hover:opacity-85"
            >
                {user?.userImage ? (
                    <div className="avatar">
                        <div className="w-10 rounded">
                            <img src={user?.userImage?.replace(/\\/g, '/')} onError={HandleImageError} />
                        </div>
                    </div>
                ) : (
                    <div className="avatar placeholder">
                        <div className="w-10 rounded-full bg-neutral text-neutral-content">
                            <span className="text-l">{user?.username[1]}</span>
                        </div>
                    </div>
                )}
                <div className="text-start">
                    <span className="font-bold">{user?.username}</span>
                    <div className="text-xs">{user?.email}</div>
                </div>
            </div>

            <ul
                tabIndex={0}
                className="menu dropdown-content z-[1] mt-4 w-52 rounded-box bg-base-100  p-2 shadow"
            >
                <li>
                    <Link
                        href={user?.role == 'ADMIN' ? '/admin/profile' : '/profile'}
                        className="flex items-center gap-2"
                    >
                        <IconRenderer fontSize={16} icon="solar:user-outline" />
                        <div>Profile</div>
                    </Link>
                </li>
                <span className="divider my-0" />
                <li
                    onClick={() => {
                        signOut()
                            .then(() => {
                                router.push('/login');
                            })
                            .catch(e => { });
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
