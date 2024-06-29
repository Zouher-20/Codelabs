'use client';

import { RoomType } from '@/app/@types/room';
import { ClassRoomUserType, UserState } from '@/app/@types/user';
import {
    getLabsSubmittedInRom,
    getRomById,
    getStudentsStatisticsSubmitted
} from '@/app/api/(modules)/class-room/services/action';
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
        getRoomInfo({ id });
        getStudentFromServer({ id });
        getLabFromServer({ id });
    }, []);

    const currentParams = useSearchParams();

    const [roomLoading, setRoomLoading] = useState(true);
    const [roomError, setRoomError] = useState(null);
    const [roomInfo, setRoomInfo] = useState<RoomType | null>(null);
    const [studentLoading, setStudentLoading] = useState(true);
    const [studentError, setStudentError] = useState(null);
    const [students, setStudents] = useState<Array<ClassRoomUserType> | null>(null);
    const [userStatistics, setUserStatistics] = useState<{
        totalUserInClass: number;
        userSubmit: number;
    } | null>(null);
    const [labLoading, setLabLoading] = useState(true);
    const [labError, setLabError] = useState(null);
    const [labs, setLabs] = useState<Array<LabModel> | null>(null);

    const getLabFromServer = async ({ id }: { id: string }) => {
        setLabLoading(true);
        try {
            const res = await getLabsSubmittedInRom({ page: 1, pageSize: 100, romId: id });

            const currentLab = res.labs.map<LabModel>(e => {
                return {
                    id: e.id ?? '',
                    user: {
                        name: e.ClassProject?.memberClass?.user.username ?? '',
                        image: e.ClassProject?.memberClass?.user.userImage ?? '',
                        username: e.ClassProject?.memberClass?.user.username ?? '',
                        userImage: e.ClassProject?.memberClass?.user.userImage ?? '',
                        id: e.ClassProject?.memberClass?.user.id ?? '',
                        email: e.ClassProject?.memberClass?.user.email ?? ''
                    }
                };
            });
            setLabs(currentLab);
        } catch (e: any) {
            setLabError(e.message);
        } finally {
            setLabLoading(false);
        }
    };
    const getStudentFromServer = async ({ id }: { id: string }) => {
        setStudentLoading(true);
        try {
            const res = await getStudentsStatisticsSubmitted({ page: 1, pageSize: 100, romId: id });
            const currentStudent = res.usersWithLabs.map<ClassRoomUserType>(e => {
                return {
                    email: e.email,
                    id: e.id,
                    isTeacher: e.MemberClass.at(0)?.isTeacher ?? false,
                    name: e.username,
                    image: e.userImage,
                    selected: UserState.notSelected,
                    withCheck: true
                };
            });
            setUserStatistics({
                totalUserInClass: res.totalStudentsInClass,
                userSubmit: res.usersWithLabs.length
            });
            setStudents(currentStudent);
        } catch (e: any) {
            setStudentError(e.message);
        } finally {
            setStudentLoading(false);
        }
    };
    const getRoomInfo = async ({ id }: { id: string }) => {
        setRoomLoading(true);
        try {
            const res = await getRomById({ romId: id });
            setRoomInfo({
                id: id,
                title: res.name,
                description: res.description,
                endAt: res.endAt,
                type: res.type,
                createdAt: res.createdAt
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
        if (id && labs![index]) {
            const params = {
                id,
                roomId,
                labId: labs![index].id.toString()
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
                    <ManageState
                        loading={studentLoading}
                        error={studentError}
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
                                color="#50FA7B"
                                primaryText="Submited Lab"
                                anotherText="Not Yet"
                                series={[
                                    userStatistics?.totalUserInClass ?? 0,
                                    userStatistics?.userSubmit ?? 0
                                ]}
                                withAdd={false}
                            />
                        }
                        empty={false}
                    />
                </div>
                <div className="w-full max-md:pt-2 md:w-3/4 md:pl-2">
                    <ManageState
                        loading={labLoading}
                        error={labError}
                        errorAndEmptyCallback={() => {
                            const id = currentParams.get('roomId') ?? '-1';
                            getLabFromServer({ id });
                        }}
                        customEmptyPage={
                            <CodeLabContainer height="20.5rem">
                                <EmptyState />
                            </CodeLabContainer>
                        }
                        customLoadingPage={
                            <CodeLabContainer height="20.5rem">
                                <LoadingState />
                            </CodeLabContainer>
                        }
                        loadedState={
                            <CodeLabContainer height="20.5rem">
                                <div className="w-full p-3">
                                    <ClassLabListComponent
                                        title="Labs"
                                        labs={labs ?? []}
                                        onLabClicked={handleLabClick}
                                    ></ClassLabListComponent>
                                </div>
                            </CodeLabContainer>
                        }
                        empty={labs?.length == 0}
                    />
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
                        endAt={roomInfo?.endAt.toLocaleString('en-US')}
                        createdAt={roomInfo?.createdAt.toLocaleString('en-US')}
                    />
                }
                empty={false}
            />

            <div className="flex w-full gap-2 max-lg:flex-wrap">
                <div className="w-1/3 max-md:w-full">
                    <ManageState
                        loading={studentLoading}
                        error={studentError}
                        errorAndEmptyCallback={() => {
                            const id = currentParams.get('roomId') ?? '-1';
                            getStudentFromServer({ id });
                        }}
                        customEmptyPage={
                            <CodeLabContainer height="20.5rem" minWidth="64">
                                <EmptyState />
                            </CodeLabContainer>
                        }
                        customLoadingPage={
                            <CodeLabContainer height="20.5rem" minWidth="64">
                                <LoadingState />
                            </CodeLabContainer>
                        }
                        loadedState={
                            <StudentList
                                students={students ?? []}
                                title="Students"
                                height="25rem"
                            ></StudentList>
                        }
                        empty={students?.length == 0}
                    />
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
                                        start: roomInfo?.createdAt ?? new Date()
                                    }),
                                    100 -
                                        calculateDurationPercentage({
                                            end: roomInfo?.endAt ?? new Date(),
                                            start: roomInfo?.createdAt ?? new Date()
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
