"use client"
import { blogType } from "@/app/@types/blog";
import IconRenderer from "@/app/components/globals/icon";
import { useEffect, useState } from "react";


const Favorite = ({ blog, userID }: { blog: blogType, userID: string }) => {
    const [isFavorite, setFavorite] = useState<boolean>(false);
    useEffect(() => {
        if (blog?.userId)
            blog.userId == userID ? setFavorite(true) : setFavorite(false);
    }, [])

    const favoriteHandler = () => {
        setFavorite(!isFavorite)
    }
    return <div className="flex gap-2">
        <IconRenderer
            onClick={() => { favoriteHandler() }}
            icon='solar:star-bold-duotone'
            width={24} height={24}
            className={(isFavorite ? 'text-error' : 'text-gray-200') + ' cursor-pointer ml-auto transition-all duration-300'}
        />
        <p>{blog?.starCount && blog.starCount + (isFavorite ? 0 : -1)}</p>
    </div>
}

export default Favorite;