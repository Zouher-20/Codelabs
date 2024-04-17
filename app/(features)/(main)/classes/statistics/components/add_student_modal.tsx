import { userType } from '@/app/@types/user';
import Input from '@/app/components/globals/form/input';
import UserAvatar from '@/app/components/globals/user-avatar';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useEffect, useState } from 'react';

const CheckBoxItemOption = ({
    user,
    value,
    onChange
}: {
    user: userType;
    value: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
    return (
        <div className="flex">
            <div className="form-control">
                <label className="label cursor-pointer">
                    <input
                        type="checkbox"
                        onChange={onChange}
                        checked={value}
                        className="checkbox-primary checkbox checkbox-sm"
                    />
                    <div className="w-6" />
                    <UserAvatar user={user} />
                </label>
            </div>
        </div>
    );
};

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

const AddStudentModal = ({ initialUser }: { initialUser: Array<userType> }) => {
    const [users, setUsers] = useState<Array<userType>>([]);
    const [filterWord, setFilterWord] = useState<string>('');
    const [selectedItem, setSelectedItem] = useState<Array<userType>>([]);

    const onSubmit = () => {
        const filteredUsers = initialUser.filter(e => {
            return e.name?.includes(filterWord);
        });
        setUsers(filteredUsers);
    };

    useEffect(() => {
        setUsers([...initialUser]);
    }, []);

    function checkIfSelected(index: number): boolean {
        var result = false;
        selectedItem.forEach(e => {
            if (e.id == users[index].id) {
                result = true;
            }
        });
        return result;
    }
    return (
        <dialog id="add-student-modal" className="modal">
            <div className="modal-box w-1/2 justify-center max-md:w-11/12">
                <form
                    className="flex w-full flex-col items-center justify-center"
                    onSubmit={e => {
                        e.preventDefault();
                        onSubmit();
                    }}
                >
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
                        var tempList = [...selectedItem];
                        tempList.splice(index, 1);
                        setSelectedItem(tempList);
                    }}
                />
                {users.map((element, index) => (
                    <div key={`user${index}`}>
                        <CheckBoxItemOption
                            onChange={e => {
                                var checked = e.target.checked;
                                var tempList = [...selectedItem];
                                if (checked) {
                                    tempList.push(element);
                                } else {
                                    var index = -1;
                                    tempList.forEach((e, currentIndex) => {
                                        if (e.id == element.id) {
                                            index = currentIndex;
                                        }
                                    });
                                    if (index > -1) {
                                        tempList.splice(index, 1);
                                    }
                                }
                                setSelectedItem(tempList);
                            }}
                            user={element}
                            value={checkIfSelected(index)}
                        />
                    </div>
                ))}
            </div>
        </dialog>
    );
};

export default AddStudentModal;
