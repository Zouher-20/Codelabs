import emptyImg from '@/public/images/empty-ill.svg';
import Image from 'next/image';

export function EmptyState() {
    return (
        <div className="flex w-full flex-col items-center justify-center">
            <Image src={emptyImg} width={200} height={200} alt="" />
            <span className="mt-4 text-lg text-gray-400 ">There is nothing here ... 🌵</span>
        </div>
    );
}
