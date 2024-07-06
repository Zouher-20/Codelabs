import imageDefault from '@/public/images/challenges/notFound.svg';
import Image from 'next/image';

const Empty = ({ emptyImage }: { emptyImage?: string }) => {
    return (
        <div className="flex w-full flex-col gap-4 px-4 py-24 text-center">
            <Image
                src={emptyImage ? emptyImage : imageDefault}
                alt=""
                className="m-auto self-center xl:w-1/3"
            />
            <p>Currently there is now challenges come later to see what's new</p>
        </div>
    );
};

export default Empty;
