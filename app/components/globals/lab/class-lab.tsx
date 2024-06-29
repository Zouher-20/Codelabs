import { LabModel } from '@/app/(features)/(main)/discover/components/lab-list-component';
import UserAvatar from '../user-avatar';
import Lab from './lab';

const ClassLab = ({ lab }: { lab: LabModel }) => {
    return (
        <div className="flex h-fit cursor-pointer flex-col gap-2 rounded-xl bg-base-100 pb-2">
            {/* <InteractionsLab react={[754, 213, 30, 84]} /> */}
            <Lab />
            <div className="px-4 pb-1">
                <section className="flex min-w-[50px] gap-1  rounded-2xl bg-base-100">
                    <UserAvatar />
                </section>
            </div>
        </div>
    );
};

export default ClassLab;
