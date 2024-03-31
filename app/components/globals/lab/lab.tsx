import Image from 'next/image';
import defaultImage from '@/public/images/challenges/attachment.png';

const Lab = ({ children, image }: { children?: React.ReactNode; image?: string }) => {
    return (
        <div className="relative max-h-sm flex w-64 flex-col items-center rounded-xl bg-base-200 self-center">
            <Image
                className='z-0 w-full bg-cover h-full'
                src={image ? image : defaultImage}
                alt="Picture of the author"
            />
            {children}
        </div>
    );
};

export default Lab;
