import { LabTableType } from '@/app/(features)/admin/discover/components/lab-table';
import LabCard from '@/app/components/globals/lab/lab-card';
import { Icon } from '@iconify/react/dist/iconify.js';

export default function LabListComponent({
    labs,
    title,
    onLabClicked
}: {
    labs: Array<LabTableType>;
    title: string;
    onLabClicked: (lab: LabTableType) => void;
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
                        <div className="px-1" key={e.name + `${index}`}>
                            <LabCard lab={e} onLabClicked={onLabClicked} />
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
