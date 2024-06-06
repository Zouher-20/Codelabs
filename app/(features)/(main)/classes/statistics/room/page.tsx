'use client';

import { RoomType } from '@/app/@types/room';
import { ClassRoomUserType } from '@/app/@types/user';
import { getRomById } from '@/app/api/(modules)/class-room/services/action';
import { EmptyState } from '@/app/components/page-state/empty';
import { LoadingState } from '@/app/components/page-state/loading';
import { ManageState } from '@/app/components/page-state/state_manager';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import CodeLabContainer from '../../components/container';
import ClassDescriptionComponent from '../components/class-description';
import ClassLabListComponent, { LabModel } from '../components/lab-list';
import StatisticsContainer from '../components/statistics_components';
import StudentList from '../components/student_list';

export default function ClassLabPage() {
    useEffect(() => {
        const id = currentParams.get('roomId') ?? '-1';
        getRoomInfo({ id: id });
    }, []);
    var students: Array<ClassRoomUserType> = [
        { id: '1', email: 'alshalabi211@gmail.com', name: 'majd1', isTeacher: false },
        { id: '2', email: 'alshalabi211@gmail.com', name: 'majd2', isTeacher: false },
        { id: '3', email: 'alshalabi211@gmail.com', name: 'majd3', isTeacher: false },
        { id: '4', email: 'alshalabi211@gmail.com', name: 'majd4', isTeacher: false },
        { id: '5', email: 'alshalabi211@gmail.com', name: 'majd5', isTeacher: false }
    ];
    var labs: Array<LabModel> = [
        { title: 'majd', id: 1 },
        { title: 'majd2', id: 2 },
        { title: 'majd3', id: 3 },
        { title: 'majd4', id: 4 },
        { title: 'majd5', id: 5 }
    ];
    const [roomLoading, setRoomLoading] = useState(true);
    const [roomError, setRoomError] = useState(null);
    const [roomInfo, setRoomInfo] = useState<RoomType | null>(null);
    const currentParams = useSearchParams();
    const getRoomInfo = async ({ id }: { id: string }) => {
        setRoomLoading(true);
        try {
            const res = await getRomById({ romId: id });
            setRoomInfo({
                id: id,
                title: res.name,
                description: res.description,
                endAt: res.endAt,
                type: res.type
            });
        } catch (e: any) {
            setRoomError(e.message);
        } finally {
            setRoomLoading(false);
        }
    };
    const route = useRouter();

    const handleLabClick = (index: number) => {
        const id = currentParams.get('id') ?? '-1';
        const roomId = currentParams.get('roomId') ?? '-1';
        if (id && labs[index]) {
            const params = {
                id,
                roomId,
                labId: labs[index].id.toString()
            };
            const queryString = new URLSearchParams(params).toString();
            route.push('/classes/statistics/room/lab' + '?' + queryString);
        } else {
            console.error('Invalid id or index.');
        }
        return;
    };
    const calculateDurationPercentage = ({ start, end }: { start: Date; end: Date }) => {
        const startTime = start.getTime();
        const endTime = end.getTime();
        const currentTime = new Date().getTime();

        const totalDurationMs = endTime - startTime;
        const remainingDurationMs = endTime - currentTime;
        const remainingPercentage = (remainingDurationMs / totalDurationMs) * 100;

        return Math.max(Math.min(Math.round(remainingPercentage), 100), 0); // Ensure the percentage is between 0 and 100
    };
    return (
        <div className="flex min-h-[550px] flex-col gap-2 p-3">
            <div className="flex flex-wrap">
                <div className="flex w-full flex-wrap gap-2 md:w-1/4">
                    <StatisticsContainer
                        color="#50FA7B"
                        primaryText="Submited Lab"
                        anotherText="Not Yet"
                        withAdd={false}
                    />
                </div>
                <div className="w-full max-md:pt-2 md:w-3/4 md:pl-2">
                    <CodeLabContainer height="20.5rem">
                        <div className="w-full p-3">
                            <ClassLabListComponent
                                title="Labs"
                                labs={labs}
                                onLabClicked={handleLabClick}
                            ></ClassLabListComponent>
                        </div>
                    </CodeLabContainer>
                </div>
            </div>
            <ManageState
                loading={roomLoading}
                error={roomError}
                errorAndEmptyCallback={() => {
                    const id = currentParams.get('roomId') ?? '-1';

                    getRoomInfo({ id });
                }}
                customLoadingPage={
                    <CodeLabContainer>
                        <LoadingState />
                    </CodeLabContainer>
                }
                loadedState={
                    <ClassDescriptionComponent
                        classDescription={roomInfo?.description ?? ''}
                        className={roomInfo?.title ?? ''}
                        classType={roomInfo?.type ?? ''}
                    />
                }
                empty={false}
            />

            <div className="flex w-full gap-2 max-lg:flex-wrap">
                <div className="w-1/3 max-md:w-full">
                    <StudentList
                        withCheck={true}
                        students={students}
                        title="Students"
                        height="25rem"
                    ></StudentList>
                </div>

                <div className="w-1/3 max-md:w-full">
                    <ManageState
                        loading={roomLoading}
                        error={roomError}
                        errorAndEmptyCallback={() => {
                            const id = currentParams.get('roomId') ?? '-1';
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
                                primaryText="Duration"
                                anotherText="Left"
                                series={[
                                    calculateDurationPercentage({
                                        end: roomInfo?.endAt ?? new Date(),
                                        start: new Date()
                                    })
                                ]}
                                withAdd={false}
                            />
                        }
                        empty={false}
                    />
                </div>
            </div>
        </div>
    );
}
