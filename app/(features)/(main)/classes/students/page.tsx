'use client';

import { RoomType } from '@/app/@types/room';
import { userType } from '@/app/@types/user';
import { useRouter, useSearchParams } from 'next/navigation';
import CodeLabContainer from '../components/container';
import ClassDescriptionComponent from '../statistics/components/class-description';
import RoomListComponent from '../statistics/components/room_list';
import StudentList from '../statistics/components/student_list';
export default function ClassLabPage() {
    var students: Array<userType> = [
        { id: 1, name: 'majd1' },
        { id: 2, name: 'majd2' },
        { id: 3, name: 'majd3' },
        { id: 4, name: 'majd4' },
        { id: 5, name: 'majd5' }
    ];
    var rooms: Array<RoomType> = [
        { title: 'majd', id: 1 },
        { title: 'majd2', id: 2 },
        { title: 'majd3', id: 3 },
        { title: 'majd4', id: 4 },
        { title: 'majd5', id: 5 }
    ];
    const currentParams = useSearchParams();
    const route = useRouter();

    const handleLabClick = (index: number) => {
        const id = currentParams.get('id') ?? '-1';
        if (id && rooms[index]) {
            const params = {
                id: id,
                roomId: rooms[index].id.toString() // Convert labId to a string
            };
            const queryString = new URLSearchParams(params).toString();
            route.push('/classes/students/room' + '?' + queryString);
        } else {
            console.error('Invalid id or index.');
        }
        return;
    };
    return (
        <div className="flex flex-col gap-2">
            <div className="flex w-full gap-2 max-lg:flex-wrap">
                <div className="w-full xl:w-1/4">
                    <StudentList
                        students={students}
                        title="Students"
                        height="20.5rem"
                    ></StudentList>
                </div>
                <div className="w-full xl:w-3/4">
                    <CodeLabContainer height="20.5rem">
                        <div className="w-full p-3">
                            <RoomListComponent
                                title="Rooms"
                                rooms={rooms}
                                onLabClicked={handleLabClick}
                            ></RoomListComponent>
                        </div>
                    </CodeLabContainer>
                </div>
            </div>
            <ClassDescriptionComponent
                classDescription="Lorem ipsum dolor sit amet consectetur. Ornare proin arcu amet fermentum
                        tristique ultrices. Lacus sed et senectus dictum duis morbi at. Pellentesque
                        duis aliquet lectus pellentesque tristique scelerisque. Lorem vitae senectus
                        vehicula id at interdum."
                className="class name"
                classType="type"
            />
        </div>
    );
}
