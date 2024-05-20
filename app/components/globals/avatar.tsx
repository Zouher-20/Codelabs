"use client"

import Image from "next/image";
import { useRef, useState } from "react";

const Avatar = ({ photo }: { photo: (photo: string) => void }) => {

    const [imageFile, setImageFile] = useState('')
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
                photo(e.target.result as string)
            }
        };
        console.log('fileUploaded', fileUploaded)
    };

    return (
        <div className="flex gap-4 py-1">
            <div
                className="avatar w-[240px] h-[200px]"
                onClick={handleClick}
            >
                {imageFile
                    ? <Image
                        className="rounded-xl"
                        height={140}
                        width={140}
                        alt="user"
                        src={imageFile}
                    />
                    : <span className="rounded-xl text-4xl bg-base-200 cursor-pointer w-full flex justify-center items-center">+</span>
                }
            </div>
            <section className="self-center flex flex-col">
                <span className="relative flex gap-1  text-gray-500 cursor-pointer">
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