import ClassLab from '@/app/components/globals/lab/class-lab';
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
                            <ClassLab lab={e} />
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
}
