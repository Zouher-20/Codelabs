import Image from 'next/image';
import defaultImage from '../../../../public/lab.png';

const Lab = ({ children, image }: { children?: React.ReactNode; image?: string }) => {
    return (
        <div className="p-1 flex h-full w-64 flex-col items-center justify-center rounded-xl bg-base-200">
            <div className='p-6 self-center'>
                <Image
                    src={image ? image : defaultImage}
                    alt="Picture of the author"
                />
            </div>
            {children}
        </div>
    );
};

export default Lab;
