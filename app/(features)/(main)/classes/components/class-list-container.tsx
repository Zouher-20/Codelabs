import { classType } from '@/app/@types/class';
import { Icon } from '@iconify/react/dist/iconify.js';
import Link from 'next/link';
import { MouseEventHandler } from 'react';
import CodeLabContainer from './container';

export default function ClassesList({
    classes,
    title
}: {
    classes: Array<classType>;
    title: string;
}) {
    function ListItem({
        classModel,
        onClick
    }: {
        classModel: classType;
        onClick?: MouseEventHandler<HTMLDivElement>;
    }) {
        return (
            <Link
                href={{
                    pathname: 'classes/statistics',
                    query: {
                        id: classModel.id
                    }
                }}
            >
                <div
                    className="flex w-full items-center gap-3 rounded-lg bg-base-200 p-3"
                    onClick={onClick}
                >
                    <Icon
                        icon="solar:square-academic-cap-bold-duotone"
                        className={`size-10 text-primary`}
                    />
                    <p>{classModel.title}</p>
                </div>
            </Link>
        );
    }
    if (classes.length == 0) {
        return <></>;
    }
    return (
        <CodeLabContainer height={'19rem'}>
            <div className="flex w-full flex-col p-2">
                <p>{title}</p>
                <div className="carousel relative  rounded-box  p-2">
                    <div className="carousel-item flex w-full flex-col gap-2">
                        {classes.map((e, index) => (
                            <div className="px-1" key={e + `${index}`}>
                                <ListItem classModel={e} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </CodeLabContainer>
    );
}
