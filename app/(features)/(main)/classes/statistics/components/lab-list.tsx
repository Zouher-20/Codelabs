import ClassLab from '@/app/components/globals/lab/class-lab';
export default function ClassLabListComponent({
    labs,
    title
}: {
    labs: Array<LabModel>;
    title: string;
}) {
    return (
        <div className="carousel relative w-full rounded-box">
            <div className="carousel-item">
                {labs.map((e, index) => (
                    <div className="px-1" key={e.title + `${index}`}>
                        <ClassLab name={e.title ?? ''} type="Type" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export interface LabModel {
    title?: string;
}
