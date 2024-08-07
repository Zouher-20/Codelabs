'use client';
import Button from '@/app/components/globals/form/button';
import Input from '@/app/components/globals/form/input';

const RoomViewHeader = ({
    onFieldChanged,
    name,
    searchWord,
    withAddButton
}: {
    searchWord: string;
    name: string;
    withAddButton: boolean;
    onFieldChanged: (searchWord: string) => void;
}) => {
    return (
        <div className="flex flex-col ">
            <div className="flex w-full justify-between">
                <h1 className="mb-10 text-4xl font-bold text-white">{name}</h1>
                {withAddButton && <Button label={`+ New ${name}`} color="any" onClick={() => {}} />}
            </div>

            <div className="flex gap-8">
                <span>
                    <Input
                        id="search"
                        type="text"
                        placeholder={`Search for ${name} ...`}
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

export default RoomViewHeader;
