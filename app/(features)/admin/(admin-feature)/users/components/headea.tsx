'use client';
import Button from '@/app/components/globals/form/button';
import Input from '@/app/components/globals/form/input';
import IconRenderer from '@/app/components/globals/icon';

const UserViewHeader = ({
    onFieldChanged,
    searchWord,
    plans,
    selectedSearchPlan,
    onChangeSearchPlan
}: {
    searchWord: string;
    onFieldChanged: (searchWord: string) => void;
    onChangeSearchPlan: (searchWord: string) => void;
    plans: Array<string>;
    selectedSearchPlan: string;
}) => {
    function toggleModal() {
        if (document) {
            (document.getElementById('new-user-modal') as HTMLFormElement)?.showModal();
        }
    }
    return (
        <div className="flex flex-col gap-8 p-6">
            <div className="flex w-full justify-between">
                <h1 className="text-4xl font-bold text-white">Users</h1>
                <Button label="+ New User" color="any" onClick={toggleModal} />
            </div>

            <div className="flex gap-8">
                <span>
                    <Input
                        id="search"
                        type="text"
                        placeholder="Search for Users ..."
                        icon="circum:search"
                        value={searchWord}
                        onChange={e => {
                            onFieldChanged(e.target.value);
                        }}
                    />
                </span>
                <div className="dropdown mr-auto">
                    <summary tabIndex={0} className=" btn flex h-[35px] min-h-[35px]">
                        {selectedSearchPlan == '' ? 'Plan' : selectedSearchPlan}
                        <IconRenderer width={24} height={24} icon={'solar:alt-arrow-down-linear'} />
                    </summary>
                    <ul
                        tabIndex={0}
                        className="menu dropdown-content z-[1] ml-4 mt-2 w-52 rounded-box bg-base-100 p-2 shadow"
                    >
                        <li>
                            <a onClick={() => onChangeSearchPlan('')}>All</a>
                        </li>
                        {plans.map((e, index) => {
                            return (
                                <li key={index}>
                                    <a onClick={() => onChangeSearchPlan(e)}>{e}</a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default UserViewHeader;
