import { ClassRoomUserType, UserState, userType } from '@/app/@types/user';
import UserAvatar from '@/app/components/globals/user-avatar';
import CodeUserList from '@/app/components/list/generic-list';

export default function UserListComponent({
    currentPage,
    onPageChange,
    pageCount,
    users,
    onUserClicked
}: {
    currentPage: number;
    onPageChange: ({ index }: { index: number }) => void;
    pageCount: number;
    users: Array<ClassRoomUserType>;
    onUserClicked: (user: ClassRoomUserType) => void;
}) {
    function TableItem({ item, index }: { item: ClassRoomUserType; index: number }) {
        return (
            <CheckBoxItemOption
                key={index}
                onChange={e => {
                    if (item.selected != UserState.alreadySelected) onUserClicked(item);
                    // var checked = e.target.checked;
                    // var tempList = [...selectedItem];
                    // if (checked) {
                    //     tempList.push(element);
                    // } else {
                    //     var index = -1;
                    //     tempList.forEach((e, currentIndex) => {
                    //         if (e.id == element.id) {
                    //             index = currentIndex;
                    //         }
                    //     });
                    //     if (index > -1) {
                    //         tempList.splice(index, 1);
                    //     }
                    // }
                    // setSelectedItem(tempList);
                }}
                user={item}
                value={item.selected != UserState.notSelected}
            />
        );
    }

    return new CodeUserList<ClassRoomUserType>({
        currentPage: currentPage,
        items: users,
        wrap: false,
        onChangePage: ({ page }: { page: number }) => onPageChange({ index: page }),
        pageCount: pageCount,
        itemBuilder: ({ item, index }: { item: ClassRoomUserType; index: number }) => {
            return TableItem({ item: item, index: index });
        }
    }).build();
}

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
        <div className="flex w-full">
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
