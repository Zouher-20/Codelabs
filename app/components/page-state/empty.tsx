import emptyBeaker from '@/public/images/beaker.png';
import Image from 'next/image';

export function EmptyState() {
    return (
        <div className="flex w-full flex-col items-center justify-center">
            <Image src={emptyBeaker} width={80} height={80} alt="" />
            <span>empty Content</span>
        </div>
    );
}
