import { ClassRoomUserType, userType } from '@/app/@types/user';
import { Icon } from '@iconify/react/dist/iconify.js';
import { MouseEventHandler } from 'react';
import CodeLabContainer from '../../components/container';

export default function StudentList({
    students,
    title,
    height = '19rem',
    myInfo,
    onDeleteUserClicked
}: {
    students: Array<ClassRoomUserType>;
    title: string;
    height?: string;
    onDeleteUserClicked?: (user: ClassRoomUserType) => void;
    myInfo?: userType | null;
}) {
    const amITheTeacher = myInfo ? students.find(e => e.id === myInfo.id)?.isTeacher : false;

    function ListItem({
        studentModel,
        onClick,
        checked
    }: {
        studentModel: ClassRoomUserType;
        checked: boolean;
        onClick?: MouseEventHandler<HTMLDivElement>;
    }) {
        return (
            <div className="carousel-item w-full">
                <div
                    className="flex w-full items-center rounded-lg bg-base-200 p-3"
                    onClick={onClick}
                >
                    <div className="flex w-full items-center gap-3">
                        <Icon
                            icon="solar:square-academic-cap-bold-duotone"
                            className={`size-10 text-primary`}
                        />
                        <p>{studentModel.name}</p>
                    </div>
                    {studentModel.isTeacher ? (
                        <div className="rounded-md bg-base-100 p-1">
                            <Icon icon="solar:case-round-bold-duotone" className="size-6" />
                        </div>
                    ) : (
                        amITheTeacher && (
                            <div
                                className="rounded-md bg-base-100 p-1"
                                onClick={() => {
                                    onDeleteUserClicked && onDeleteUserClicked!(studentModel);
                                }}
                            >
                                <Icon
                                    icon="solar:trash-bin-trash-bold-duotone"
                                    className="size-6 text-red-500 hover:cursor-pointer"
                                />
                            </div>
                        )
                    )}
                    {checked && (
                        <Icon
                            icon="solar:verified-check-broken"
                            className={`size-10 text-primary`}
                        />
                    )}
                </div>
            </div>
        );
    }

    return (
        <CodeLabContainer height={height} minWidth="64">
            <div className="flex w-full flex-col p-2">
                <p className="ml-3">{title}</p>
                <div className="carousel carousel-vertical w-full gap-1 rounded-box p-2">
                    {students.map((e, index) => (
                        <div className="px-1" key={e + `${index}`}>
                            <ListItem
                                studentModel={e}
                                checked={e.withCheck ?? false}
                                onClick={() => {}}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </CodeLabContainer>
    );
}
