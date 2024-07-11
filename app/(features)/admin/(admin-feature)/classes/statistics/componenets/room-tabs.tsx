'use client';
import { ClassRoomUserType } from '@/app/@types/user';
import { getUserInClassForAdmin } from '@/app/api/(modules)/admin/class-rom/service/action';
import { getRomInClass } from '@/app/api/(modules)/class-room/services/action';
import { ManageState } from '@/app/components/page-state/state_manager';
import { Tab, TabPanel, Tabs, TabsBody, TabsHeader } from '@material-tailwind/react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import RoomViewHeader from './header';
import RoomTable, { RoomTableType } from './room_table';
import StudentTable from './user-table';

export function VerticalTabs() {
    const currentParams = useSearchParams();

    const [rooms, setRooms] = useState<Array<RoomTableType>>([]);
    const [activeTab, setActiveTab] = useState('Rooms');
    const [userLoading, setUserLoading] = useState(true);
    const [userError, setUserError] = useState(null);
    const [users, setUsers] = useState<Array<ClassRoomUserType>>([]);
    const [roomLoading, setRoomLoading] = useState(true);
    const [roomError, setRoomError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPageCount, setToatalPageCount] = useState(0);
    const [searchWord, setSearchWord] = useState('');

    const getClassRoomsById = async ({ id }: { id: string }) => {
        setRoomLoading(true);
        try {
            const res = await getRomInClass({ classRomId: id, romePage: page, romPageSize: 10 });
            setRooms(
                res.RomInClassRom.map<RoomTableType>(value => {
                    return {
                        id: value.id,
                        desription: value.description,
                        name: value.name,
                        endAt: value.endAt,
                        createdAt: value.createdAt,
                        type: value.type,
                        title: value.name
                    };
                })
            );
            setToatalPageCount(res.romCountInClassRom);
        } catch (e: any) {
            setRoomError(e.message);
        } finally {
            setRoomLoading(false);
        }
    };
    const getClassStudentsById = async ({ id }: { id: string }) => {
        setUserLoading(true);
        try {
            const res = await getUserInClassForAdmin({
                classRomId: id,
                userPage: page,
                userPageSize: 10
            });
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
            setToatalPageCount(res.countMemberClassInClassRom);
        } catch (e: any) {
            setUserError(e.message);
        } finally {
            setUserLoading(false);
        }
    };
    useEffect(() => {
        getTapInfo(activeTab);
    }, [page]);
    const getTapInfo = (label: string) => {
        const id = currentParams.get('id') ?? '-1';
        if (label == 'Rooms') {
            getClassRoomsById({ id });
        } else {
            getClassStudentsById({ id });
        }
    };

    const data = [
        {
            label: 'Rooms',
            componenet: (
                <ManageState
                    empty={rooms.length == 0}
                    error={roomError}
                    errorAndEmptyCallback={() => {
                        const id = currentParams.get('id') ?? '-1';
                        getClassRoomsById({ id });
                    }}
                    loading={roomLoading}
                    loadedState={
                        <RoomTable
                            rooms={rooms}
                            pageCount={totalPageCount / 10}
                            currentPage={page}
                            onPageChange={({ index }) => {
                                setPage(index);
                            }}
                            deleteRoomButtonClicked={() => {}}
                        />
                    }
                />
            )
        },
        {
            label: 'Students',
            componenet: (
                <ManageState
                    empty={users.length == 0}
                    error={userError}
                    errorAndEmptyCallback={() => {
                        const id = currentParams.get('id') ?? '-1';
                        getClassStudentsById({ id });
                    }}
                    loading={userLoading}
                    loadedState={
                        <StudentTable
                            students={users}
                            pageCount={totalPageCount / 10}
                            currentPage={page}
                            onPageChange={({ index }) => {
                                setPage(index);
                            }}
                            deleteStudentButtonClicked={() => {}}
                        />
                    }
                />
            )
        }
    ];

    return (
        <Tabs value={activeTab}>
            <TabsHeader
                className=" w-1/3 rounded-none bg-transparent p-0"
                indicatorProps={{
                    className: 'bg-transparent shadow-none rounded-none '
                }}
                placeholder={undefined}
            >
                {data.map(({ label }) => (
                    <Tab
                        key={label}
                        value={label}
                        onClick={() => {
                            setActiveTab(label);
                            setSearchWord('');
                            setPage(1);
                        }}
                        className={`${activeTab === label ? 'rounded-xl bg-base-100  text-white ' : ''} font-bold`}
                        placeholder={undefined}
                    >
                        {label}
                    </Tab>
                ))}
            </TabsHeader>
            <TabsBody placeholder={undefined}>
                {data.map(({ label, componenet }) => (
                    <TabPanel key={label} value={label}>
                        <div className="flex w-full flex-col">
                            <RoomViewHeader
                                searchWord={searchWord}
                                onFieldChanged={e => {
                                    setSearchWord(e);
                                    setPage(1);
                                }}
                                name={label}
                            />

                            {componenet}
                        </div>
                    </TabPanel>
                ))}
            </TabsBody>
        </Tabs>
    );
}
