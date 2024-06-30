'use client';
import Button from '@/app/components/globals/form/button';
import Input from '@/app/components/globals/form/input';

const TagViewHeader = ({
    onFieldChanged,
    searchWord,
    onCreateClicked
}: {
    searchWord: string;
    onFieldChanged: (searchWord: string) => void;
    onCreateClicked: () => void;
}) => {
    return (
        <div className="flex flex-col gap-8 p-6">
            <div className="flex w-full justify-between">
                <h1 className="text-4xl font-bold text-white">Tags</h1>
                <Button label="+ New Tag" color="any" onClick={onCreateClicked} />
            </div>

            <div className="flex gap-8">
                <span>
                    <Input
                        id="search"
                        type="text"
                        placeholder="Search for Tags ..."
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

export default TagViewHeader;
