import { RoomType } from '@/app/@types/room';
import IconRenderer from '@/app/components/globals/icon';
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
                            <ClassLab
                                footer={
                                    <div>
                                        <p className="self-start">{e.title}</p>

                                        <section className="flex min-w-[50px] gap-1  rounded-2xl bg-base-100">
                                            <IconRenderer
                                                fontSize={24}
                                                icon={'solar:bookmark-circle-broken'}
                                            />
                                            <p className="self-start">{e.type}</p>
                                        </section>
                                    </div>
                                }
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
