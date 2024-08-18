'use client';

import StudentTable from '@/app/(features)/admin/(admin-feature)/classes/statistics/componenets/user-table';
import { classType } from '@/app/@types/class';
import { RoomType } from '@/app/@types/room';
import { ClassRoomUserType, userType } from '@/app/@types/user';
import { getMyInfo } from '@/app/api/(modules)/auth/service/actions';
import {
    getClassRomById,
    getRomInClass,
    getUserInClass
} from '@/app/api/(modules)/class-room/services/action';
import { addReport } from '@/app/api/(modules)/report/services/action';
import { ReportType } from '@/app/api/core/constant/enum';
import { LoadingState } from '@/app/components/page-state/loading';
import { ManageState } from '@/app/components/page-state/state_manager';
import { CustomToaster } from '@/app/components/toast/custom-toaster';
import { SwalUtil } from '@/app/utils/swal-util';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import CodeLabContainer from '../components/container';
import ClassDescriptionComponent from '../statistics/components/class-description';
import RoomListComponent from '../statistics/components/room_list';
import ExitClassModal from './room/components/exit-class-modal';

export default function ClassLabPage() {
    useEffect(() => {
        const id = currentParams.get('id') ?? '-1';
        getServerData({ id: id });
    }, []);

    const getServerData = ({ id }: { id: string }) => {
        getClassStudentsById({ id, page: userPage });
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
    const [myInfo, setMyInfo] = useState<userType | null>(null);
    const [userPage, setUserPage] = useState<number>(1);
    const [userTotalPageCount, setUserToatalPageCount] = useState<number>(0);

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
    const getClassStudentsById = async ({ id, page }: { id: string; page: number }) => {
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
            setUserToatalPageCount(res.countMemberClassInClassRom);
            const res2 = await getMyInfo();
            setMyInfo({
                email: res2.email ?? '',
                username: res2.username ?? '',
                userImage: res2.userImage ?? '',
                id: res2.id ?? '',
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

    const currentParams = useSearchParams();
    const route = useRouter();

    const handleLabClick = (index: number) => {
        const id = currentParams.get('id') ?? '-1';
        if (id && rooms[index]) {
            const params = {
                id: id,
                roomId: rooms[index].id.toString()
            };
            const queryString = new URLSearchParams(params).toString();
            route.push('/classes/students/room' + '?' + queryString);
        } else {
            console.error('Invalid id or index.');
        }
        return;
    };
    const reportLab = async (message: string) => {
        try {
            const id = currentParams.get('id') ?? '-1';

            const res = await addReport({
                classId: id,
                messageReport: message,
                reportType: ReportType.CLASS
            });
            toast.success(res);
        } catch (err: any) {
            toast.error(err.message);
        }
    };
    return (
        <div className="flex flex-col gap-2">
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
                                                        'exit-class-modal'
                                                    ) as HTMLFormElement
                                                )?.showModal();
                                            }
                                        }}
                                    >
                                        <div className="text-red-500">
                                            <Icon
                                                icon="solar:exit-bold-duotone"
                                                className="size-8 text-red-500"
                                            />
                                            Exit Class
                                        </div>
                                    </li>
                                    <li
                                        onClick={() => {
                                            SwalUtil.showReportModalWithTextArea(value => {
                                                reportLab(value);
                                            });
                                        }}
                                    >
                                        <div className="text-red-500">
                                            <Icon
                                                icon="solar:masks-bold-duotone"
                                                className="size-8 text-red-500"
                                            />
                                            Report class
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        }
                    />
                }
                empty={false}
            />
            <ExitClassModal
                callback={() => {
                    route.push('/classes');
                }}
                classId={classInfo?.id ?? ''}
            ></ExitClassModal>
            <CustomToaster />
        </div>
    );
}
