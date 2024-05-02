'use client';
import Input from '@/app/components/globals/form/input';

const DiscoverHeader = ({
    onFieldChanged,
    searchWord
}: {
    searchWord: string;
    onFieldChanged: (searchWord: string) => void;
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
            </div>
        </div>
    );
};

export default DiscoverHeader;
