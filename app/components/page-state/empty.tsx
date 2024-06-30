import Image from "next/image";
import emptyBeaker from '@/public/images/beaker.png'

export function EmptyState() {
    return <div className="flex flex-col w-full items-center justify-center">
        <Image src={emptyBeaker} width={80} height={80} alt="" />
        <span>empty Content</span>
    </div>;


}
