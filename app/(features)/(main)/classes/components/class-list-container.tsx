import { classType } from '@/app/@types/class';
import { Icon } from '@iconify/react/dist/iconify.js';
import CodeLabContainer from './container';

export default function ClassesList({
    classes,
    title,
    onClick
}: {
    classes: Array<classType>;
    title: string;
    onClick: (currentClass: classType) => void;
}) {
    function ListItem({ classModel, onClick }: { classModel: classType; onClick: () => void }) {
        return (
            <div
                className="flex w-full cursor-pointer items-center gap-3 rounded-lg bg-base-200 p-3"
                onClick={() => {
                    onClick();
                }}
            >
                <Icon
                    icon="solar:square-academic-cap-bold-duotone"
                    className={`size-10 text-primary`}
                />
                <p>{classModel.title}</p>
            </div>
        );
    }
    if (classes.length == 0) {
        return <></>;
    }
    return (
        <CodeLabContainer height={'19rem'} minWidth="64">
            <div className="flex w-full flex-col p-2">
                <p className="ml-3">{title}</p>
                <div className="carousel relative  rounded-box  p-2">
                    <div className="carousel-item flex w-full flex-col gap-2">
                        {classes.map((e, index) => (
                            <div className="px-1" key={e + `${index}`}>
                                <ListItem classModel={e} onClick={() => onClick(e)} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </CodeLabContainer>
    );
}
