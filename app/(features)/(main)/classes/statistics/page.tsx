'use client';

import { userType } from '@/app/@types/user';
import { useSearchParams } from 'next/navigation';
import CodeLabContainer from '../components/container';
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
    const params = useSearchParams();
    return (
        <div className="flex min-h-[550px] flex-col gap-2">
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
            <div className="flex w-full gap-2">
                <div className="w-1/4">
                    <StudentList students={students} title="Students"></StudentList>
                </div>
                <CodeLabContainer></CodeLabContainer>
            </div>
            <div className="w-full">
                <CodeLabContainer></CodeLabContainer>
            </div>
        </div>
    );
}
