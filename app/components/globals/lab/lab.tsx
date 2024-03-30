import Image from 'next/image';
import defaultImage from '@/public/lab.png';

const Lab = ({ children, image }: { children?: React.ReactNode; image?: string }) => {
    return (
        <div className="max-h-sm p-1 flex w-64 flex-col items-center rounded-xl bg-base-200 self-center">
            <div className='p-6 self-center '>
                <Image
                    src={image ? image : defaultImage}
                    alt="max-h-sm Picture of the author self-center"
                />
            </div>
            {children}
        </div>
    );
};

export default Lab;
