'use client';

import Input from '@/app/components/globals/form/input';

const ReportsViewHeader = ({
    onFieldChanged,
    searchWord,
    title
}: {
    searchWord: string;
    title: string;
    onFieldChanged: (searchWord: string) => void;
}) => {
    return (
        <div className="flex flex-col gap-8 p-6">
            <div className="flex w-full justify-between">
                <h1 className="text-4xl font-bold text-white">{title}</h1>
            </div>

            <div className="flex gap-8">
                <span>
                    <Input
                        id="search"
                        type="text"
                        placeholder={`Search for ${title} ...`}
                        icon="circum:search"
                        value={searchWord}
                        onChange={e => {
                            onFieldChanged(e.target.value);
                        }}
                    />
                </span>
            </div>
        </div>
    );
};

export default ReportsViewHeader;
