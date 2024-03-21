import Image from "next/image";

const UserAvatar = () => {
    return (
        <div className="flex gap-4 py-1">
            <div className="avatar w-9">
                <div className="rounded-full">
                    <Image
                        height={40}
                        width={38}
                        alt="user"
                        src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    />
                </div>
            </div>
            <span className="text-lg">username</span>
        </div>
    );
}

export default UserAvatar;