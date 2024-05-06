'use client';
import Input from '@/app/components/globals/form/input';

const PlanDetailsHeader = ({
    onFieldChanged,
    searchWord,
    planName
}: {
    searchWord: string;
    onFieldChanged: (searchWord: string) => void;
    planName: string;
}) => {
    return (
        <div className="flex flex-col gap-8 p-6">
            <div className="flex w-full justify-between">
                <h1 className="text-4xl font-bold text-white">Plan: {planName}</h1>
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
            </div>
        </div>
    );
};

export default PlanDetailsHeader;
