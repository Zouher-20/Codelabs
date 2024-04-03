'use client';

import { userType } from '@/app/@types/user';
import { useSearchParams } from 'next/navigation';
import CodeLabContainer from '../components/container';
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
                />
                <StatisticsContainer
                    color="#E3E354"
                    primaryText="Labs"
                    anotherText="Labs Capicity"
                />
            </div>
            <div className="flex w-full flex-wrap gap-2">
                <div className="w-full md:w-1/4">
                    <StudentList students={students} title="Students"></StudentList>
                </div>
                <div className="w-full md:w-2/4">
                    <CodeLabContainer height="10rem">
                        <div className="w-full p-5">
                            <ClassLabListComponent
                                labs={labs}
                                title="Student"
                            ></ClassLabListComponent>
                        </div>
                    </CodeLabContainer>
                </div>
            </div>
            <div className="w-full">
                <CodeLabContainer></CodeLabContainer>
            </div>
        </div>
    );
}
