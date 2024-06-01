'use client';

import { classType } from '@/app/@types/class';
import { RoomType } from '@/app/@types/room';
import { ClassRoomUserType } from '@/app/@types/user';
import {
    getClassRomById,
    getRomInClass,
    getUserInClass
} from '@/app/api/(modules)/class-room/services/action';
import { EmptyState } from '@/app/components/page-state/empty';
import { LoadingState } from '@/app/components/page-state/loading';
import { ManageState } from '@/app/components/page-state/state_manager';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import CodeLabContainer from '../components/container';
import NewClassLabModal from './components/add_lab_modal';
import AddStudentModal from './components/add_student_modal';
import ClassDescriptionComponent from './components/class-description';
import RoomListComponent from './components/room_list';
import StatisticsContainer from './components/statistics_components';
import StudentList from './components/student_list';

export default function StatisticsPage() {
    useEffect(() => {
        const id = currentParams.get('id') ?? '-1';
        getServerData({ id: id });
    }, []);

    const getServerData = ({ id }: { id: string }) => {
        getClassStudentsById({ id });
        getClassRoomsById({ id });
        getClassInfo({ id });
    };
    const [userLoading, setUserLoading] = useState(true);
    const [userError, setUserError] = useState(null);
    const [users, setUsers] = useState<Array<ClassRoomUserType>>([]);
    const [roomLoading, setRoomLoading] = useState(true);
    const [roomError, setRoomError] = useState(null);
    const [rooms, setRooms] = useState<Array<RoomType>>([]);
    const [classLoading, setClassLoading] = useState(true);
    const [classError, setClassError] = useState(null);
    const [classInfo, setClassInfo] = useState<classType | null>(null);
    const [isStudentModelOpen, setIsStudentModelOpen] = useState<boolean>(false);

    const currentParams = useSearchParams();
    const route = useRouter();
    const getClassRoomsById = async ({ id }: { id: string }) => {
        setRoomLoading(true);
        try {
            const res = await getRomInClass({ classRomId: id, romePage: 1, romPageSize: 10 });
            setRooms(
                res.RomInClassRom.map<RoomType>(value => {
                    return {
                        id: value.id,
                        title: value.name
                    };
                })
            );
        } catch (e: any) {
            setRoomError(e.message);
        } finally {
            setRoomLoading(false);
        }
    };

    const getClassStudentsById = async ({ id }: { id: string }) => {
        setUserLoading(true);
        try {
            const res = await getUserInClass({ classRomId: id, userPage: 1, userPageSize: 10 });
            setUsers(
                res.memberClassInClassRom.map<ClassRoomUserType>(value => {
                    return {
                        name: value.user.username,
                        id: value.user.id,
                        email: value.user.email,
                        image: value.user.userImage,
                        isTeacher: value.isTeacher
                    };
                })
            );
        } catch (e: any) {
            setUserError(e.message);
        } finally {
            setUserLoading(false);
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
    const handleLabClick = (index: number) => {
        const id = currentParams.get('id') ?? '-1';
        if (id && rooms[index]) {
            const params = {
                id: id,
                roomId: rooms[index].id.toString() // Convert labId to a string
            };
            const queryString = new URLSearchParams(params).toString();
            route.push('/classes/statistics/room' + '?' + queryString);
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
                        setIsStudentModelOpen(!isStudentModelOpen);
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
                    <ManageState
                        loading={userLoading}
                        error={userError}
                        errorAndEmptyCallback={() => {
                            const id = currentParams.get('id') ?? '-1';
                            getClassStudentsById({ id });
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
                                students={users}
                                title="Students"
                                height="20.5rem"
                            ></StudentList>
                        }
                        empty={users.length == 0}
                    />
                </div>
                <div className="w-full xl:w-3/4">
                    <CodeLabContainer height="20.5rem">
                        <div className="w-full self-center p-3">
                            <ManageState
                                loading={roomLoading}
                                error={roomError}
                                errorAndEmptyCallback={() => {
                                    const id = currentParams.get('id') ?? '-1';
                                    getClassRoomsById({ id });
                                }}
                                loadedState={
                                    <RoomListComponent
                                        title="Rooms"
                                        rooms={rooms}
                                        onLabClicked={handleLabClick}
                                    ></RoomListComponent>
                                }
                                empty={rooms.length == 0}
                            />
                        </div>
                    </CodeLabContainer>
                </div>
            </div>
            <ManageState
                loading={classLoading}
                error={classError}
                errorAndEmptyCallback={() => {
                    const id = currentParams.get('id') ?? '-1';
                    getClassInfo({ id });
                }}
                customLoadingPage={
                    <CodeLabContainer>
                        <LoadingState />
                    </CodeLabContainer>
                }
                loadedState={
                    <ClassDescriptionComponent
                        classDescription={classInfo?.description ?? ''}
                        className={classInfo?.title ?? ''}
                        classType={classInfo?.type ?? ''}
                    />
                }
                empty={false}
            />

            <AddStudentModal
                initialUser={users}
                isOpen={isStudentModelOpen}
                classId={classInfo?.id ?? ''}
            />
            <NewClassLabModal />
        </div>
    );
}
