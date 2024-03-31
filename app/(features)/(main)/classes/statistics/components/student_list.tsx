import { userType } from '@/app/@types/user';
import { Icon } from '@iconify/react/dist/iconify.js';
import { MouseEventHandler } from 'react';
import CodeLabContainer from '../../components/container';

export default function StudentList({
    students,
    title
}: {
    students: Array<userType>;
    title: string;
}) {
    function ListItem({
        studentModel,
        onClick
    }: {
        studentModel: userType;
        onClick?: MouseEventHandler<HTMLDivElement>;
    }) {
        return (
            <div
                className="flex w-full items-center gap-3 rounded-lg bg-base-200 p-3"
                onClick={onClick}
            >
                <Icon
                    icon="solar:square-academic-cap-bold-duotone"
                    className={`size-10 text-primary`}
                />
                <p>{studentModel.name}</p>
            </div>
        );
    }
    if (students.length == 0) {
        return <></>;
    }
    return (
        <CodeLabContainer height={'19rem'}>
            <div className="flex w-full flex-col p-2">
                <p>{title}</p>
                <div className="carousel relative  rounded-box  p-2">
                    <div className="carousel-item flex w-full flex-col gap-2">
                        {students.map((e, index) => (
                            <div className="px-1" key={e + `${index}`}>
                                <ListItem studentModel={e} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </CodeLabContainer>
    );
}
