import Image from "next/image";

const Avatar = ({ user }: { user: { username: string, userimage: string } }) => {
    return (
        <div className="flex gap-4 py-1">
            <div className="avatar w-[140px] h-[140px]">
                <Image
                    className="rounded-xl"
                    height={140}
                    width={140}
                    alt="user"
                    src={user.userimage ? user.userimage :
                        "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"}
                />
            </div>
            <section className="self-center flex flex-col">
                <span className="text-lg ">{user.username}</span>
            </section>
        </div>
    );
}

export default Avatar;