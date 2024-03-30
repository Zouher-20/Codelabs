import Image from "next/image";
import defaultImage from '@/public/lab.png'

const Challenge = ({ image, name, description, children }: {
    image?: string,
    name: string,
    description: string,
    children?: React.ReactNode
}) => {
    return (
        <div className="bg-base-300 flex flex-col xl:flex-row xl:gap-8 p-4 rounded-2xl  max-xl:text-center w-full">
            <div className="bg-base-200 flex max-xl:self-center justify-center max-h-40 min-w-40 max-w-fit  rounded-xl">
                <Image className="self-center h-full w-full" src={image ? image : defaultImage} alt="image" />
            </div>
            <div className="flex flex-col gap-2 slef-center w-full py-4">
                <h1 className="text-xl font-bold">{name}</h1>
                <p className="text-sm tracking-wide h-full max-w-xl">{description}</p>
                {children}
            </div>
        </div>
    );
}

export default Challenge;