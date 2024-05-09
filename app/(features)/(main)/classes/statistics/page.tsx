'use client';

import { RoomType } from '@/app/@types/room';
import { userType } from '@/app/@types/user';
import { useRouter, useSearchParams } from 'next/navigation';
import CodeLabContainer from '../components/container';
import NewClassLabModal from './components/add_lab_modal';
import AddStudentModal from './components/add_student_modal';
import ClassDescriptionComponent from './components/class-description';
import RoomListComponent from './components/room_list';
import StatisticsContainer from './components/statistics_components';
import StudentList from './components/student_list';

export default function StatisticsPage() {
    var students: Array<userType> = [
        { email: 'alshalabi211@gmail.com', id: '1', name: 'majd1' },
        { email: 'alshalabi211@gmail.com', id: '2', name: 'majd2' },
        { email: 'alshalabi211@gmail.com', id: '3', name: 'majd3' },
        { email: 'alshalabi211@gmail.com', id: '4', name: 'majd4' },
        { email: 'alshalabi211@gmail.com', id: '5', name: 'majd5' }
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
            route.push('/classes/statistics/room' + '?' + queryString);
        } else {
            console.error('Invalid id or index.');
        }
        return;
    };

    return (
        <div className="flex min-h-[550px] flex-col gap-2 p-3">
            <div className="flex flex-wrap gap-2 md:w-1/2">
                <StatisticsContainer
                    color="#50FA7B"
                    primaryText="Student"
                    anotherText="Class Capicity"
                    onClick={() => {
                        (
                            document.getElementById('add-student-modal') as HTMLFormElement
                        )?.showModal();
                    }}
                />
                <StatisticsContainer
                    color="#E3E354"
                    primaryText="Labs"
                    anotherText="Labs Capicity"
                    onClick={() => {
                        (
                            document.getElementById('new-class-lab-modal') as HTMLFormElement
                        )?.showModal();
                    }}
                />
            </div>
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
            <AddStudentModal initialUser={students} />
            <NewClassLabModal />
        </div>
    );
}
