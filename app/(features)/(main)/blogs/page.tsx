import { CustomToaster } from '@/app/components/toast/custom-toaster';
import Body from './components/body';
import Image from './components/top-image';

export default async function BlogsPage() {
    return (
        <div className="flex flex-col gap-8 p-8">
            <Intoduction />
            <Body />
            <CustomToaster />
        </div>
    );
}

const Intoduction = () => {
    return (
        <div className="grid gap-1 px-8 lg:h-48 lg:grid-cols-2 xl:grid-cols-3">
            <p className="col-span-1 self-center text-center text-3xl font-bold xl:col-span-2">
                All you wanted to know about working with designer and creating delightful product
                experiences
            </p>
            <span className="min-h-24 w-full max-lg:hidden">
                <Image />
            </span>
        </div>
    );
};
