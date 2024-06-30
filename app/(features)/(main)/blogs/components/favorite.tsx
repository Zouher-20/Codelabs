'use client';
import { addAndDeleteStarBlog } from '@/app/api/(modules)/blog/services/action';
import IconRenderer from '@/app/components/globals/icon';
import { useState } from 'react';

const Favorite = ({
    blogId,
    hasStarred,
    starCount
}: {
    blogId: string;
    hasStarred: boolean;
    starCount: number;
}) => {
    const [isFavorite, setFavorite] = useState<boolean>(hasStarred);
    const [stCount, setStCount] = useState<number>(starCount);

    const favoriteHandler = async () => {
        await addAndDeleteStarBlog({ blogId: blogId, action: !isFavorite });
        setFavorite(!isFavorite);
        setStCount(oldVal => (!isFavorite ? oldVal + 1 : oldVal - 1));
    };

    return (
        <div className="flex gap-2">
            <IconRenderer
                onClick={() => {
                    favoriteHandler();
                }}
                icon="solar:star-bold-duotone"
                width={24}
                height={24}
                className={
                    (isFavorite ? 'text-error' : 'text-gray-200') +
                    ' ml-auto cursor-pointer transition-all duration-300'
                }
            />
            <p>{stCount}</p>
        </div>
    );
};

export default Favorite;
