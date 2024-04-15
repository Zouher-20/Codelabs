'use client';

import { userType } from '@/app/@types/user';
import { useSearchParams } from 'next/navigation';
import CodeLabContainer from '../components/container';
import NewClassLabModal from './components/add_lab_modal';
import AddStudentModal from './components/add_student_modal';
import ClassDescriptionComponent from './components/class-description';
import ClassLabListComponent, { LabModel } from './components/lab-list';
import StatisticsContainer from './components/statistics_components';
import StudentList from './components/student_list';

export default function StatisticsPage() {
    var students: Array<userType> = [
        { id: 1, name: 'majd1' },
        { id: 2, name: 'majd2' },
        { id: 3, name: 'majd3' },
        { id: 4, name: 'majd4' },
        { id: 5, name: 'majd5' }
    ];
    var labs: Array<LabModel> = [
        { title: 'majd' },
        { title: 'majd2' },
        { title: 'majd3' },
        { title: 'majd4' },
        { title: 'majd5' }
    ];
    const params = useSearchParams();
    2;
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
                    <StudentList students={students} title="Students"></StudentList>
                </div>
                <div className="w-full xl:w-3/4">
                    <CodeLabContainer height="19rem">
                        <div className="w-full p-3">
                            <ClassLabListComponent
                                labs={labs}
                                title="Student"
                            ></ClassLabListComponent>
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
