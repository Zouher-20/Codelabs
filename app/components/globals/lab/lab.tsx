import Image from 'next/image';
import defaultImage from '../../../../public/lab.png';

const Lab = ({ children, image }: { children?: React.ReactNode; image?: string }) => {
    return (
        <div className="flex h-48 w-64 flex-col items-center justify-center rounded-xl bg-base-200">
            <Image
                src={image ? image : defaultImage}
                className="mb-6 h-16 w-16 "
                alt="Picture of the author"
            />
            {children}
        </div>
    );
};

export default Lab;
