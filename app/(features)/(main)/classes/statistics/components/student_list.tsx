import { userType } from '@/app/@types/user';
import { Icon } from '@iconify/react/dist/iconify.js';
import { MouseEventHandler } from 'react';
import CodeLabContainer from '../../components/container';

export default function StudentList({
    students,
    title,
    height = '19rem',
    withCheck = false
}: {
    students: Array<userType>;
    title: string;
    height?: string;
    withCheck?: boolean;
}) {
    function ListItem({
        studentModel,
        onClick,
        checked
    }: {
        studentModel: userType;
        checked: boolean;
        onClick?: MouseEventHandler<HTMLDivElement>;
    }) {
        return (
            <div className="carousel-item w-full">
                <div className="flex w-full rounded-lg bg-base-200 p-3" onClick={onClick}>
                    <div className="flex w-full items-center gap-3">
                        <Icon
                            icon="solar:square-academic-cap-bold-duotone"
                            className={`size-10 text-primary`}
                        />
                        <p>{studentModel.name}</p>
                    </div>
                    {checked ? (
                        <Icon
                            icon="solar:verified-check-broken"
                            className={`size-10 text-primary`}
                        />
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        );
    }
    if (students.length == 0) {
        return <></>;
    }
    return (
        <CodeLabContainer height={height} minWidth="64">
            <div className="flex w-full flex-col p-2">
                <p className="ml-3">{title}</p>
                <div className="carousel carousel-vertical w-full gap-1 rounded-box p-2">
                    {students.map((e, index) => (
                        <div className="px-1" key={e + `${index}`}>
                            <ListItem studentModel={e} checked={withCheck && index % 2 == 0} />
                        </div>
                    ))}
                </div>
            </div>
        </CodeLabContainer>
    );
}
