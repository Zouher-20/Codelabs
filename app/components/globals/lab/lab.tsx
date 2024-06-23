import defaultImage from '@/public/lab.svg';
import Image from 'next/image';

const Lab = ({ children, image }: { children?: React.ReactNode; image?: string }) => {
    return (
        <div className="max-h-sm relative flex w-64 flex-col items-center self-center rounded-xl bg-base-200">
            <Image
                className="z-0 h-full w-full bg-cover"
                src={image ? image : defaultImage}
                alt="Picture of the author"
            />
            {children}
        </div>
    );
};

export default Lab;
