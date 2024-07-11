'use client';
import { ClassRoomUserType } from '@/app/@types/user';
import {
    getRomInClass,
    getUserInClassForAdmin
} from '@/app/api/(modules)/admin/class-rom/service/action';
import { ManageState } from '@/app/components/page-state/state_manager';
import { Tab, TabPanel, Tabs, TabsBody, TabsHeader } from '@material-tailwind/react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import RoomViewHeader from './header';
import RoomTable, { RoomTableType } from './room_table';
import StudentTable from './user-table';

export function VerticalTabs({ withAddButtons }: { withAddButtons: boolean }) {
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
    useEffect(() => {
        getTapInfo({ label: activeTab, page, searchWord });
    }, []);
    const getClassRoomsById = async ({
        searchWord,
        page,
        id
    }: {
        searchWord: string;
        page: number;
        id: string;
    }) => {
        setRoomLoading(true);
        try {
            const res = await getRomInClass({
                classRomId: id,
                romePage: page,
                romPageSize: 10,
                searchWord
            });
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
    const getClassStudentsById = async ({
        searchWord,
        page,
        id
    }: {
        searchWord: string;
        page: number;
        id: string;
    }) => {
        setUserLoading(true);
        try {
            const res = await getUserInClassForAdmin({
                classRomId: id,
                userPage: page,
                userPageSize: 10,
                searchWord
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

    const getTapInfo = ({
        label,
        searchWord,
        page
    }: {
        label: string;
        searchWord: string;
        page: number;
    }) => {
        const id = currentParams.get('id') ?? '-1';
        if (label == 'Rooms') {
            getClassRoomsById({ id, page, searchWord });
        } else {
            getClassStudentsById({ id, page, searchWord });
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
                        getClassRoomsById({ id, page, searchWord });
                    }}
                    loading={roomLoading}
                    loadedState={
                        <RoomTable
                            rooms={rooms}
                            pageCount={totalPageCount / 10}
                            currentPage={page}
                            onPageChange={({ index }) => {
                                const id = currentParams.get('id') ?? '-1';
                                setPage(index);
                                getClassRoomsById({ id, page: index, searchWord });
                            }}
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
                        getClassStudentsById({ id, page, searchWord });
                    }}
                    loading={userLoading}
                    loadedState={
                        <StudentTable
                            students={users}
                            pageCount={totalPageCount / 10}
                            currentPage={page}
                            onPageChange={({ index }) => {
                                setPage(index);
                                const id = currentParams.get('id') ?? '-1';

                                getClassStudentsById({
                                    id,
                                    page: index,
                                    searchWord
                                });
                            }}
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
                            getTapInfo({ label, page: 1, searchWord: '' });
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
                                withAddButton={withAddButtons}
                                onFieldChanged={e => {
                                    setSearchWord(e);
                                    setPage(1);
                                    getTapInfo({
                                        label,
                                        page: 1,
                                        searchWord: e
                                    });
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
