'use client';

import CodeLabContainer from '@/app/(features)/(main)/classes/components/container';
import ClassDescriptionComponent from '@/app/(features)/(main)/classes/statistics/components/class-description';
import StatisticsContainer from '@/app/(features)/(main)/classes/statistics/components/statistics_components';
import { classType } from '@/app/@types/class';
import { getClassRomStatisticsForAdmin } from '@/app/api/(modules)/admin/class-rom/service/action';
import { getClassRomById } from '@/app/api/(modules)/class-room/services/action';
import { EmptyState } from '@/app/components/page-state/empty';
import { LoadingState } from '@/app/components/page-state/loading';
import { ManageState } from '@/app/components/page-state/state_manager';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { VerticalTabs } from './componenets/room-tabs';

export default function StatisticsPage() {
    useEffect(() => {
        const id = currentParams.get('id') ?? '-1';
        getServerData({ id: id });
    }, []);

    const getServerData = ({ id }: { id: string }) => {
        getClassInfo({ id });
        getClassStatistics({ id });
    };
    const [staticLoading, setStaticLoading] = useState(true);
    const [staticError, setStaticError] = useState(null);
    const [staticData, setStaticData] = useState<{
        numberOfStudents: number;
        numberOfRoms: number;
        remainingStudentSlots: number;
        remainingRomSlots: number;
        totalRoms: number;
        totalStudents: number;
    } | null>(null);

    const [classLoading, setClassLoading] = useState(true);
    const [classError, setClassError] = useState(null);
    const [classInfo, setClassInfo] = useState<classType | null>(null);
    const [isStudentModelOpen, setIsStudentModelOpen] = useState<boolean>(false);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

    const currentParams = useSearchParams();

    const getClassStatistics = async ({ id }: { id: string }) => {
        setStaticLoading(true);
        setStaticError(null);
        try {
            const res = await getClassRomStatisticsForAdmin({ classRomId: id });
            setStaticData(res);
        } catch (e: any) {
            setStaticError(e.message);
        } finally {
            setStaticLoading(false);
        }
    };

    const getClassInfo = async ({ id }: { id: string }) => {
        setClassLoading(true);
        try {
            const res = await getClassRomById({ classRomId: id });
            setClassInfo({
                id: res.myClassRom.id,
                title: res.myClassRom.name,
                type: res.myClassRom.type,
                description: res.myClassRom.description
            });
        } catch (e: any) {
            setClassError(e.message);
        } finally {
            setClassLoading(false);
        }
    };

    return (
        <div className="flex min-h-[550px] flex-col gap-2 p-3">
            <div className="flex flex-col gap-2 md:flex-row">
                <ManageState
                    loading={staticLoading}
                    error={staticError}
                    errorAndEmptyCallback={() => {
                        const id = currentParams.get('id') ?? '-1';
                        getClassStatistics({ id });
                    }}
                    customEmptyPage={
                        <CodeLabContainer>
                            <EmptyState />
                        </CodeLabContainer>
                    }
                    customLoadingPage={
                        <CodeLabContainer>
                            <LoadingState />
                        </CodeLabContainer>
                    }
                    loadedState={
                        <StatisticsContainer
                            color="#50FA7B"
                            primaryText="Student"
                            anotherText="Class Capicity"
                            series={[
                                staticData?.remainingStudentSlots ?? 0,
                                staticData?.numberOfStudents ?? 0
                            ]}
                            onClick={() => {
                                setIsStudentModelOpen(!isStudentModelOpen);
                                (
                                    document.getElementById('add-student-modal') as HTMLFormElement
                                )?.showModal();
                            }}
                        />
                    }
                    empty={false}
                />
                <ManageState
                    loading={staticLoading}
                    error={staticError}
                    errorAndEmptyCallback={() => {
                        const id = currentParams.get('id') ?? '-1';
                        getClassStatistics({ id });
                    }}
                    customEmptyPage={
                        <CodeLabContainer>
                            <EmptyState />
                        </CodeLabContainer>
                    }
                    customLoadingPage={
                        <CodeLabContainer>
                            <LoadingState />
                        </CodeLabContainer>
                    }
                    loadedState={
                        <StatisticsContainer
                            color="#E3E354"
                            primaryText="Rooms"
                            anotherText="Availabel Rooms"
                            series={[
                                staticData?.remainingRomSlots ?? 0,
                                staticData?.numberOfRoms ?? 0
                            ]}
                            onClick={() => {
                                (
                                    document.getElementById('add-room-in-class') as HTMLFormElement
                                )?.showModal();
                            }}
                        />
                    }
                    empty={false}
                />
            </div>
            <div className="flex w-full flex-col gap-4">
                <VerticalTabs />
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
