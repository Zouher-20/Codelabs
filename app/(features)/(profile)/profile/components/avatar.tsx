"use client"

import IconRenderer from "@/app/components/globals/icon";
import Image from "next/image";
import { useRef, useState } from "react";
import noImage from '@/public/images/no-image2.png'

const Avatar = ({ photo, imageSize, imagePath, username }
    : {
        photo: (photo: File) => void;
        imageSize?: number,
        imagePath?: string,
        username: string
    }) => {

    const [imageFile, setImageFile] = useState(imagePath ?? '')
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
                photo(fileUploaded);
            }
        };
    };
    const handleError = () => {
        setImageFile('/images/no-image2.png');
    };
    return (
        <div className="flex gap-4 py-1">
            <div className="avatar"
                style={{ width: `${imageSize ?? 140}px`, height: `${imageSize ?? 140}px` }}
            >
                <Image
                    className="rounded-xl"
                    height={140}
                    width={140}
                    alt="user"
                    src={imageFile ? imageFile.replace(/\\/g, '/') : noImage}
                    onError={handleError}
                />
            </div>
            <section className="self-center flex flex-col">
                <span className="text-lg ">{username}</span>
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