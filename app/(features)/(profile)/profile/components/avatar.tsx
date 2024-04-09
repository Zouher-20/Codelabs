"use client"

import { userType } from "@/app/@types/user";
import IconRenderer from "@/app/components/globals/icon";
import Image from "next/image";
import { useRef, useState } from "react";

const Avatar = ({ user }: { user: userType }) => {

    const { name, image } = user
    const [imageFile, setImageFile] = useState(image)
    const hiddenFileInput = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        if (hiddenFileInput.current) hiddenFileInput.current.click();
    };
    const handleChange = (event: any) => {
        const fileUploaded = event.target.files[0];

        if (!fileUploaded) return;

        const reader = new FileReader();
        reader.readAsDataURL(fileUploaded);
        reader.onload = (e) => {
            if (e.target?.result) {
                setImageFile(e.target.result as string);
            }
        };
    };

    return (
        <div className="flex gap-4 py-1">
            <div className="avatar w-[140px] h-[140px]">
                <Image
                    className="rounded-xl"
                    height={140}
                    width={140}
                    alt="user"
                    src={imageFile ? imageFile :
                        "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"}
                />
            </div>
            <section className="self-center flex flex-col">
                <span className="text-lg ">{name}</span>
                <span onClick={handleClick} className="relative flex gap-1  text-gray-500 cursor-pointer">
                    <IconRenderer className="self-end cursor-pointer" height={18} width={18} icon='basil:edit-outline' />
                    <button style={{ cursor: 'pointer', font: 'inherit', }} >
                        change image
                    </button>
                    <input
                        type="file"
                        onChange={handleChange}
                        ref={hiddenFileInput}
                        style={{ display: 'none' }}
                    />
                </span>
            </section>
        </div>
    );
}

export default Avatar;