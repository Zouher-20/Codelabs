import ClassLab from '@/app/components/globals/lab/class-lab';
import { Icon } from '@iconify/react/dist/iconify.js';
export default function ClassLabListComponent({
    labs,
    title
}: {
    labs: Array<LabModel>;
    title: string;
}) {
    return (
        <div>
            <div className="flex items-center">
                <h1 className="text-2xl">{title}</h1>
                <div className="w-1"></div>
                <Icon
                    icon="solar:round-arrow-right-up-bold-duotone"
                    className="size-5 text-primary"
                />
            </div>
            <div className="h-3"></div>
            <div className="carousel relative w-full rounded-box">
                <div className="carousel-item">
                    {labs.map((e, index) => (
                        <div className="px-1" key={e.title + `${index}`}>
                            <ClassLab name={e.title ?? ''} type="Type" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export interface LabModel {
    title?: string;
}
