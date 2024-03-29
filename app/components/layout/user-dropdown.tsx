import Image from 'next/image';
import IconRenderer from '../globals/icon';

export default function UserDropDown() {
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
                    <span className="font-bold">username</span>
                    <div className="text-xs">email@email.com</div>
                </div>
            </div>

            <ul
                tabIndex={0}
                className="menu dropdown-content z-[1] mt-4 w-52 rounded-box bg-base-100  p-2 shadow"
            >
                <li>
                    <a className="flex items-center gap-2">
                        <IconRenderer fontSize={16} icon="solar:user-outline" />
                        <div>Profile</div>
                    </a>
                </li>
                <span className="divider my-0" />
                <li>
                    <a className="flex items-center gap-2 text-error">
                        <IconRenderer fontSize={16} icon="solar:logout-2-outline" />
                        <div>Logout</div>
                    </a>
                </li>
            </ul>
        </div>
    );
}
