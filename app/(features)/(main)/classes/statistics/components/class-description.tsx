import { userType } from '@/app/@types/user';
import UserAvatar from '@/app/components/globals/user-avatar';
import { Icon } from '@iconify/react/dist/iconify.js';
import CodeLabContainer from '../../components/container';

export default function ClassDescriptionComponent({
    className,
    classDescription,
    classType,
    endAt,
    createdAt,
    teacher,
    dropdown
}: {
    classType: string;
    className: string;
    endAt?: string;
    createdAt?: string;
    classDescription: string;
    teacher?: userType;
    dropdown?: JSX.Element;
}) {
    return (
        <div className="w-full">
            <CodeLabContainer>
                <div className="flex w-full flex-col justify-center p-5">
                    <div className="flex justify-between">
                        <p className="text-lg font-bold">{className}</p>
                        {dropdown}
                    </div>
                    <div className="flex items-center py-2">
                        <Icon icon="solar:bookmark-circle-broken" />
                        <div className="w-1"></div>
                        <p className="text-xs">{classType}</p>
                    </div>
                    <p>{classDescription}</p>

                    {createdAt != null ? <p>created at: {createdAt}</p> : null}
                    {endAt != null ? <p>end at: {endAt}</p> : null}
                    {teacher != null ? <UserAvatar user={teacher} /> : <div></div>}
                </div>
            </CodeLabContainer>
        </div>
    );
}
