import defaultImage from '@/public/images/challenges/attachment.svg';
import Image from 'next/image';

const Challenge = ({
    image,
    name,
    description,
    children
}: {
    image?: string;
    name: string;
    description: string;
    children?: React.ReactNode;
}) => {
    return (
        <div className="flex w-full flex-col rounded-2xl bg-base-300 p-4 max-xl:text-center  xl:flex-row xl:gap-8">
            <div className="flex h-fit min-w-40 max-w-fit justify-center rounded-xl bg-base-200   max-xl:self-center">
                <Image
                    className="h-full w-full self-center"
                    src={image ? image : defaultImage}
                    alt="image"
                />
            </div>
            <div className="slef-center flex w-full flex-col gap-2 py-4">
                <h1 className="text-xl font-bold">{name}</h1>
                <p className="h-full max-w-xl text-sm tracking-wide">{description}</p>
                {children}
            </div>
        </div>
    );
};

export default Challenge;
