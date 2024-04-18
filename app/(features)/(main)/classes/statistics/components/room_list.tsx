import { RoomType } from '@/app/@types/room';
import ClassLab from '@/app/components/globals/lab/class-lab';
export default function RoomListComponent({
    rooms,
    title,
    onLabClicked
}: {
    rooms: Array<RoomType>;
    title: string;
    onLabClicked: (index: number) => void;
}) {
    return (
        <div>
            <p className="pb-1">{title}</p>
            <div className="carousel relative w-full rounded-box">
                <div className="carousel-item">
                    {rooms.map((e, index) => (
                        <div
                            className="px-1"
                            key={e.title + `${index}`}
                            onClick={() => onLabClicked(index)}
                        >
                            <ClassLab name={e.title ?? ''} type="Type" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
