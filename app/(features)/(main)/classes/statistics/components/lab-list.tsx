import { ClassRoomUserType } from '@/app/@types/user';
import ClassLab from '@/app/components/globals/lab/class-lab';
import UserAvatar from '@/app/components/globals/user-avatar';
import { Icon } from '@iconify/react/dist/iconify.js';
export default function ClassLabListComponent({
    labs,
    title,
    onLabClicked
}: {
    labs: Array<LabModel>;
    title: string;
    onLabClicked: (index: number) => void;
}) {
    return (
        <div>
            <p className="pb-1">{title}</p>
            <div className="carousel relative w-full rounded-box">
                <div className="carousel-item">
                    {labs.map((e, index) => (
                        <div
                            className="px-1"
                            key={e.title + `${index}`}
                            onClick={() => onLabClicked(index)}
                        >
                            <ClassLab
                                footer={
                                    <div className="flex items-center justify-between">
                                        <UserAvatar
                                            user={{
                                                email: e.user?.email ?? '',
                                                id: e.user?.id ?? '',
                                                username: e.user?.name ?? '',
                                                image: e.user?.image ?? '',
                                                userImage: e.user?.image,
                                                name: e.user?.name
                                            }}
                                        />
                                        {e.user?.isTeacher && (
                                            <div className="rounded-md bg-base-200 p-1">
                                                <Icon
                                                    icon="solar:case-round-bold-duotone"
                                                    className="size-6"
                                                />
                                            </div>
                                        )}
                                    </div>
                                }
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export interface LabModel {
    title?: string;
    id: string;
    user?: ClassRoomUserType;
}
