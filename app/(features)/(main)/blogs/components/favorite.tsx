"use client"
import IconRenderer from "@/app/components/globals/icon";
import { useState } from "react";

const Favorite = ({ count }: { count: number }) => {
    const [isFavorite, setFavorite] = useState<boolean>(false);

    const favoriteHandler = () => {
        setFavorite(!isFavorite)
    }
    return <div className="flex gap-2">
        <IconRenderer
            onClick={() => { favoriteHandler() }}
            icon='solar:star-bold-duotone'
            width={24} height={24}
            className={(isFavorite ? 'text-error' : 'text-gray-800') + ' cursor-pointer ml-auto transition-all duration-300'}
        />
        <p>{count + (isFavorite ? 1 : 0)}</p>
    </div>
}

export default Favorite;