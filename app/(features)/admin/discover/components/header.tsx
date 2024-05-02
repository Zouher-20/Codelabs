'use client';
import Input from '@/app/components/globals/form/input';
import IconRenderer from '@/app/components/globals/icon';

const DiscoverHeader = ({
    onFieldChanged,
    searchWord,
    tags,
    selectedSearchTag,
    onChangeSearchTag
}: {
    searchWord: string;
    onFieldChanged: (searchWord: string) => void;
    tags: Array<string>;
    onChangeSearchTag: (searchWord: string) => void;
    selectedSearchTag: string;
}) => {
    return (
        <div className="flex flex-col gap-8 p-6">
            <h1 className="text-4xl font-bold text-white">Labs</h1>

            <div className="flex gap-8">
                <span>
                    <Input
                        id="search"
                        type="text"
                        placeholder="Search for Lab ..."
                        icon="circum:search"
                        value={searchWord}
                        onChange={e => {
                            onFieldChanged(e.target.value);
                        }}
                    />
                </span>
                <div className="dropdown mr-auto">
                    <summary tabIndex={0} className=" btn flex h-[35px] min-h-[35px]">
                        {selectedSearchTag == '' ? 'Tag' : selectedSearchTag}
                        <IconRenderer width={24} height={24} icon={'solar:alt-arrow-down-linear'} />
                    </summary>
                    <ul
                        tabIndex={0}
                        className="menu dropdown-content z-[1] ml-4 mt-2 w-52 rounded-box bg-base-100 p-2 shadow"
                    >
                        <li>
                            <a onClick={() => onChangeSearchTag('')}>All</a>
                        </li>
                        {tags.map((e, index) => {
                            return (
                                <li key={index}>
                                    <a onClick={() => onChangeSearchTag(e)}>{e}</a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DiscoverHeader;
