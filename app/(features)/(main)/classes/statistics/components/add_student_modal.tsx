import UserListComponent from '@/app/(features)/(main)/classes/statistics/components/user_list';
import { ClassRoomUserType, UserState, userType } from '@/app/@types/user';
import {
    addUsersInClass,
    getAllUserAndSearch
} from '@/app/api/(modules)/class-room/services/action';
import Button from '@/app/components/globals/form/button';
import Input from '@/app/components/globals/form/input';
import UserAvatar from '@/app/components/globals/user-avatar';
import { ManageState } from '@/app/components/page-state/state_manager';
import { CustomToaster } from '@/app/components/toast/custom-toaster';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const UserSelectedItemsList = ({
    selectedUsers,
    onClick
}: {
    selectedUsers: Array<userType>;
    onClick: Function;
}) => {
    if (selectedUsers.length == 0) {
        return null;
    }
    return (
        <div className="flex flex-wrap">
            {selectedUsers.map((user, index) => {
                return (
                    <div key={index} className="flex items-center px-2">
                        <Icon
                            icon="solar:close-circle-bold-duotone"
                            className="mx-2 size-7 cursor-pointer text-red-600"
                            onClick={() => {
                                onClick(index);
                            }}
                        />
                        <UserAvatar user={user} />
                    </div>
                );
            })}
        </div>
    );
};

const AddStudentModal = ({
    initialUser,
    isOpen,
    classId,
    addCallbackFunction
}: {
    initialUser: Array<ClassRoomUserType>;
    isOpen: boolean;
    classId: string;
    addCallbackFunction: Function;
}) => {
    const [users, setUsers] = useState<Array<ClassRoomUserType>>([]);
    const [filterWord, setFilterWord] = useState<string>('');
    const [selectedItem, setSelectedItem] = useState<Array<ClassRoomUserType>>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const [totalItemCount, setTotalItemCount] = useState<number>(1);
    const [buttonLoading, setButtonLoading] = useState<boolean>(false);

    const fetchUserFromServer = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await getAllUserAndSearch({
                searchWord: filterWord,
                page: page,
                pageSize: 10
            });
            setTotalItemCount(res.userCount);
            const fetchedUser = res.usres.map<ClassRoomUserType>(value => {
                return {
                    name: value.username,
                    id: value.id,
                    email: value.email,
                    image: value.userImage,
                    isTeacher: false,
                    selected: checkIfAlreadySelected(value.id)
                        ? UserState.alreadySelected
                        : checkIfSelected(value.id)
                          ? UserState.selected
                          : UserState.notSelected
                };
            });
            setUsers(fetchedUser);
        } catch (e: any) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };
    const addStudentToClass = async () => {
        setButtonLoading(true);
        try {
            await addUsersInClass({
                classRomId: classId,
                userIds: selectedItem.map(value => value.id)
            });
            addCallbackFunction();
            (document.getElementById('add-student-modal') as HTMLDialogElement).close();
        } catch (e: any) {
            toast.error(e.message);
        } finally {
            setButtonLoading(false);
        }
    };
    useEffect(() => {
        setSelectedItem([]);
        fetchUserFromServer();
    }, [isOpen, page, filterWord]);

    function checkIfAlreadySelected(userId: string): boolean {
        let result = false;
        initialUser.forEach(e => {
            if (e.id == userId) {
                result = true;
            }
        });
        return result;
    }

    function checkIfSelected(userId: string): boolean {
        let result = false;
        selectedItem.forEach(e => {
            if (e.id == userId) {
                result = true;
            }
        });
        return result;
    }

    return (
        <dialog id="add-student-modal" className="modal">
            <div className="modal-box w-1/2 justify-center max-md:w-11/12">
                <form className="flex w-full flex-col items-center justify-center">
                    <div className="flex w-full items-center">
                        <Input
                            id="searchFilter"
                            name="search"
                            type="search"
                            placeholder="search"
                            icon="solar:rounded-magnifer-bold-duotone"
                            value={filterWord}
                            onChange={e => {
                                setFilterWord(e.target.value);
                                setPage(1);
                            }}
                        />
                        <Icon
                            icon="solar:rounded-magnifer-bold-duotone"
                            className="mx-1 size-8 cursor-pointer pb-2 text-primary"
                            type="submit"
                        />
                    </div>
                </form>

                <div className="h-2" />
                <UserSelectedItemsList
                    selectedUsers={selectedItem}
                    onClick={(index: number) => {
                        const user = selectedItem[index];
                        let items = selectedItem;
                        users[users.indexOf(user)].selected = UserState.notSelected;
                        items = items.filter(function (item) {
                            return item.id != user.id;
                        });
                        setSelectedItem(items);
                        setUsers(users);
                    }}
                />
                <ManageState
                    loading={loading}
                    error={error}
                    errorAndEmptyCallback={() => {
                        fetchUserFromServer();
                    }}
                    loadedState={
                        <>
                            <UserListComponent
                                onUserClicked={user => {
                                    let items = selectedItem;
                                    if (user.selected == UserState.selected) {
                                        users[users.indexOf(user)].selected = UserState.notSelected;
                                        items = items.filter(function (item) {
                                            return item.id != user.id;
                                        });
                                    } else {
                                        users[users.indexOf(user)].selected = UserState.selected;
                                        items = [...items, user];
                                    }
                                    setSelectedItem(items);
                                    setUsers(users);
                                }}
                                users={users}
                                currentPage={page}
                                pageCount={totalItemCount / 10}
                                onPageChange={({ index }: { index: number }) => {
                                    setPage(index);
                                }}
                            />
                        </>
                    }
                    empty={users.length == 0}
                />
                <div className="h-2" />
                <div className="flex w-full justify-end">
                    <Button
                        loading={buttonLoading}
                        onClick={() => {
                            addStudentToClass();
                        }}
                        style="w-fit self-end "
                        color="any"
                        label="Add"
                        type="submit"
                    />
                </div>
            </div>
            <CustomToaster />
        </dialog>
    );
};

export default AddStudentModal;
