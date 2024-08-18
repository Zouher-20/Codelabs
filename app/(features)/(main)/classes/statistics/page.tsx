'use client';

import StudentTable from '@/app/(features)/admin/(admin-feature)/classes/statistics/componenets/user-table';
import { classType } from '@/app/@types/class';
import { RoomType } from '@/app/@types/room';
import { ClassRoomUserType, userType } from '@/app/@types/user';
import { getMyInfo } from '@/app/api/(modules)/auth/service/actions';
import {
    getClassRomById,
    getClassRomStatistics,
    getRomInClass,
    getUserInClass
} from '@/app/api/(modules)/class-room/services/action';
import { EmptyState } from '@/app/components/page-state/empty';
import { LoadingState } from '@/app/components/page-state/loading';
import { ManageState } from '@/app/components/page-state/state_manager';
import { CustomToaster } from '@/app/components/toast/custom-toaster';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import CodeLabContainer from '../components/container';
import AddRoomInClassModal from './components/add_lab_modal';
import AddStudentModal from './components/add_student_modal';
import ClassDescriptionComponent from './components/class-description';
import DeleteClassModal from './components/delete-class-modal';
import DeleteUserFromClassModal from './components/delete-user-form-class-modal copy';
import RoomListComponent from './components/room_list';
import StatisticsContainer from './components/statistics_components';

export default function StatisticsPage() {
    useEffect(() => {
        const id = currentParams.get('id') ?? '-1';
        getServerData({ id: id });
    }, []);

    const getServerData = ({ id }: { id: string }) => {
        getClassStudentsById({ id, page: userPage });
        getClassRoomsById({ id });
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
    const [myInfo, setMyInfo] = useState<userType | null>(null);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const [userPage, setUserPage] = useState<number>(1);
    const [userTotalPageCount, setUserToatalPageCount] = useState<number>(0);

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
    const getClassStatistics = async ({ id }: { id: string }) => {
        setStaticLoading(true);
        setStaticError(null);
        try {
            const res = await getClassRomStatistics({ classRomId: id });
            setStaticData(res);
        } catch (e: any) {
            setStaticError(e.message);
        } finally {
            setStaticLoading(false);
        }
    };
    const getClassStudentsById = async ({ id, page }: { id: string; page: number }) => {
        setUserLoading(true);
        try {
            const res = await getUserInClass({ classRomId: id, userPage: page, userPageSize: 10 });
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
            setUserToatalPageCount(res.countMemberClassInClassRom);
            const res2 = await getMyInfo();
            setMyInfo({
                email: res2.email ?? '',
                id: res2.id ?? '',
                username: res2.username ?? '',
                userImage: res2.userImage ?? '',
                PlanSubscription: null
            });
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

            <p className="pb-1 text-3xl">Rooms</p>
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
            <p className="pb-1 text-3xl">Students</p>
            <ManageState
                loading={userLoading}
                error={userError}
                errorAndEmptyCallback={() => {
                    const id = currentParams.get('id') ?? '-1';
                    getClassStudentsById({ id, page: userPage });
                }}
                loadedState={
                    <StudentTable
                        students={users}
                        pageCount={userTotalPageCount / 10}
                        currentPage={userPage}
                        onPageChange={({ index }) => {
                            setUserPage(index);
                            const id = currentParams.get('id') ?? '-1';

                            getClassStudentsById({
                                id,
                                page: index
                            });
                        }}
                    />
                }
                empty={users.length == 0}
            />
            <p className="pb-1 text-3xl">Description</p>
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
                        dropdown={
                            <div className="dropdown dropdown-left">
                                <div
                                    tabIndex={0}
                                    role="button"
                                    className="flex cursor-pointer items-center gap-2 rounded-btn hover:opacity-85"
                                >
                                    <Icon
                                        icon="solar:menu-dots-bold-duotone"
                                        className="size-10 text-primary"
                                    />
                                </div>

                                <ul
                                    tabIndex={0}
                                    className="menu dropdown-content z-[1] mt-4 w-52 rounded-box bg-base-100 p-2 shadow"
                                >
                                    <li
                                        onClick={() => {
                                            if (document) {
                                                (
                                                    document.getElementById(
                                                        'delete-class-modal'
                                                    ) as HTMLFormElement
                                                )?.showModal();
                                            }
                                        }}
                                    >
                                        <div className="text-red-500">
                                            <Icon
                                                icon="solar:trash-bin-2-bold-duotone"
                                                className="size-8 text-red-500"
                                            />
                                            Delete Class
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        }
                    />
                }
                empty={false}
            />
            <AddStudentModal
                initialUser={users}
                isOpen={isStudentModelOpen}
                classId={classInfo?.id ?? ''}
                addCallbackFunction={() => {
                    const id = currentParams.get('id') ?? '-1';
                    getClassStudentsById({ id, page: userPage });
                    getClassStatistics({ id });
                    toast.success('students added successfully');
                }}
            />
            <AddRoomInClassModal
                classId={classInfo?.id ?? ''}
                callbackFunction={() => {
                    const id = currentParams.get('id') ?? '-1';
                    getClassRoomsById({ id });
                    getClassStatistics({ id });
                    toast.success('add new room done');
                }}
            />
            <DeleteUserFromClassModal
                callback={() => {
                    getClassStudentsById({ id: classInfo?.id ?? '', page: userPage });
                }}
                classId={classInfo?.id ?? ''}
                userId={selectedUserId ?? ''}
            />
            <DeleteClassModal
                callback={() => {
                    route.push('/classes');
                }}
                classId={classInfo?.id ?? ''}
            ></DeleteClassModal>
            <CustomToaster />
        </div>
    );
}
