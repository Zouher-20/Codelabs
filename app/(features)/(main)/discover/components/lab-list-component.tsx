import { LabTableType } from '@/app/(features)/admin/(admin-feature)/discover/components/lab-table';
import LabCard from '@/app/components/globals/lab/lab-card';
import { Icon } from '@iconify/react/dist/iconify.js';

export default function LabListComponent({
    labs,
    title,
    onLabClicked,
    onLabInteractionClicked,
    onMoreClicked
}: {
    labs: Array<LabTableType>;
    title: string;
    onMoreClicked: () => void;
    onLabClicked: (lab: LabTableType) => void;
    onLabInteractionClicked: ({ lab, index }: { lab: LabTableType; index: number }) => void;
}) {
    return (
        <div>
            <div className="flex items-center">
                <h1 className="text-2xl">{title}</h1>
                <div className="w-1"></div>
                <Icon
                    onClick={onMoreClicked}
                    icon="solar:round-arrow-right-up-bold-duotone"
                    className="size-5 text-primary hover:cursor-pointer"
                />
            </div>
            <div className="h-3"></div>
            <div className="carousel relative w-full rounded-box">
                <div className="carousel-item gap-1">
                    {labs.map((e, index) => (
                        <div className="px-1" key={e.name + `${index}`}>
                            <LabCard
                                onInteractionClicked={interactionIndex => {
                                    onLabInteractionClicked({
                                        index: interactionIndex,
                                        lab: labs[index]
                                    });
                                }}
                                lab={e}
                                onLabClicked={onLabClicked}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
