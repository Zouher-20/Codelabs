"use client"
import { addAndDeleteStarBlog } from "@/app/api/(modules)/blog/services/action";
import IconRenderer from "@/app/components/globals/icon";
import { useEffect, useState } from "react";

const Favorite = ({ blogId, hasStarred, starCount }: { blogId: string, hasStarred: boolean, starCount: number }) => {
    const [isFavorite, setFavorite] = useState<boolean>(hasStarred ? true : false);
    const [stCount, setStCount] = useState<number>(hasStarred ? starCount - 1 : starCount + 1);

    useEffect(() => {
        setStCount(isFavorite ? stCount + 1 : stCount - 1)
    }, [isFavorite])

    const favoriteHandler = async () => {
        await addAndDeleteStarBlog({ blogId: blogId, action: !isFavorite })
        setFavorite(!isFavorite)
    }

    return <div className="flex gap-2">
        <IconRenderer
            onClick={() => { favoriteHandler() }}
            icon='solar:star-bold-duotone'
            width={24} height={24}
            className={(isFavorite ? 'text-error' : 'text-gray-200') + ' cursor-pointer ml-auto transition-all duration-300'}
        />
        <p>{stCount}</p>
    </div>
}

export default Favorite;