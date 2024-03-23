import defaultImage from '../../../../public/lab.png'
import Image from 'next/image';

const Lab = ({ children, image }: { children?: React.ReactNode, image?: string }) => {
    return (
        <div className="min-w-64  h-min pt-12 bg-base-200 flex flex-col items-center rounded-xl">
            <Image src={image ? image : defaultImage} className='h-28 mb-8 w-32 ' alt="Picture of the author" />
            {children}
        </div>
    );
}

export default Lab;