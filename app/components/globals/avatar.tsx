'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';

const Avatar = ({ photo, imageSize }: { photo: (photo: File) => void; imageSize?: number }) => {
    const [imageFile, setImageFile] = useState('');
    const hiddenFileInput = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        if (hiddenFileInput.current) hiddenFileInput.current.click();
    };
    const handleChange = (event: any) => {
        const fileUploaded = event.target.files[0];

        if (!fileUploaded) return;

        const reader = new FileReader();
        reader.readAsDataURL(fileUploaded);
        reader.onload = e => {
            if (e.target?.result) {
                setImageFile(e.target.result as string);
                photo(fileUploaded);
            }
        };
        console.log('fileUploaded', fileUploaded);
    };

    return (
        <div className="flex gap-4 py-1">
            <div
                className="avatar"
                onClick={handleClick}
                style={{ width: `${imageSize ?? 240}px`, height: `${imageSize ?? 200}px` }}
            >
                {imageFile ? (
                    <Image
                        className="rounded-xl"
                        height={140}
                        width={140}
                        alt="user"
                        src={imageFile}
                    />
                ) : (
                    <span className="flex w-full cursor-pointer items-center justify-center rounded-xl bg-base-200 text-4xl">
                        +
                    </span>
                )}
            </div>
            <section className="flex flex-col self-center">
                <span className="relative flex cursor-pointer  gap-1 text-gray-500">
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
};

export default Avatar;
