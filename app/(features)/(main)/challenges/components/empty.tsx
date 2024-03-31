import Image from "next/image";
import imageDefault from '@/public/images/challenges/notFound.svg'

const Empty = ({ emptyImage }: { emptyImage?: string }) => {
    return (
        <div className="flex flex-col w-full text-center py-24 px-4 gap-4" >
            <Image src={emptyImage ? emptyImage : imageDefault} alt="" className='self-center m-auto xl:w-1/3' />
            <p >Currently there is now challenges come later to see what's new</p>
        </div >
    );
}

export default Empty;