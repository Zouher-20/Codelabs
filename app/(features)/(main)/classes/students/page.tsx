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
import ClassDescriptionComponent from '../statistics/components/class-description';
import RoomListComponent from '../statistics/components/room_list';
import StudentList from '../statistics/components/student_list';

export default function ClassLabPage() {
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

    const getClassRoomsById = async ({ id }: { id: string }) => {
        setRoomLoading(true);
        try {
            const res = await getRomInClass({ classRomId: id, romePage: 1, romPageSize: 10 });
            setRooms(
                res.RomInClassRom.map<RoomType>(value => {
                    return {
                        id: value.id,
                        description: value.description,
                        endAt: value.endAt,
                        createdAt: value.createdAt,
                        type: value.type,
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
            const res = await getUserInClass({ classRomId: id, userPage: 1, userPageSize: 100 });
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
                <div className="w-full justify-center xl:w-3/4">
                    <div className="w-full">
                        <ManageState
                            loading={roomLoading}
                            error={roomError}
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
                            errorAndEmptyCallback={() => {
                                const id = currentParams.get('id') ?? '-1';
                                getClassRoomsById({ id });
                            }}
                            loadedState={
                                <CodeLabContainer height="20.5rem">
                                    <RoomListComponent
                                        title="Rooms"
                                        rooms={rooms}
                                        onLabClicked={handleLabClick}
                                    ></RoomListComponent>
                                </CodeLabContainer>
                            }
                            empty={rooms.length == 0}
                        />
                    </div>
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
        </div>
    );
}
