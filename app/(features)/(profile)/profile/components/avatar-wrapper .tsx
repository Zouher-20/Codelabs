'use client';

import { completeMyInfo } from '@/app/api/(modules)/auth/service/actions';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Avatar from './avatar';

const AvatarWrapper = ({
    initialImagePath,
    username
}: {
    initialImagePath?: string;
    username: string;
}) => {
    const [imagePath, setImagePath] = useState(initialImagePath ?? '');

    const handleImage = async (photo: File) => {
        try {
            if (photo) {
                const formData = new FormData();
                formData.append('file', photo);
                const response = await fetch('/api/admin/template/image-upload', {
                    method: 'POST',
                    body: formData
                });
                const result = await response.json();
                setImagePath(result.data);
                await completeMyInfo({ imagePath: result.data });
            }
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    return <Avatar photo={handleImage} imagePath={imagePath} username={username} />;
};

export default AvatarWrapper;
