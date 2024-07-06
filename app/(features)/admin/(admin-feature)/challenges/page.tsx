'use client';
import { getChallenge } from '@/app/api/(modules)/admin/service/action';
import Input from '@/app/components/globals/form/input';
import IconRenderer from '@/app/components/globals/icon';
import GlobalUtils from '@/app/utils/global-utils';
import { DIFFICULTTYPE } from '@prisma/client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDebounce } from 'use-debounce';
import ChallengeTable, { challengeTableType } from './components/table/challenge-table';

const Challenges = () => {
    const [searchValue, setSearchValue] = useState<string>('');
    const [difficulty, setDifficulty] = useState<string>('');
    const [currentPage, updateCurrentPage] = useState(0);
    const currentParams = useSearchParams();
    const [selectedChallenges, setSelectedChallenges] = useState<Array<challengeTableType>>([]);
    const [challenges, setChallenges] = useState<Array<challengeTableType>>([]);
    const pageSize = 4;
    const debouncedSearch = useDebounce(searchValue, 1000);
    const [isDelete, setIsDelete] = useState(false);

    useEffect(() => {
        getChallenges();
        const id = Number(currentParams.get('id') ?? '1');
        onPageChange({ index: id });
        setIsDelete(false);
    }, [isDelete]);

    useEffect(() => {
        const searchFn = async () => {
            if (debouncedSearch) {
                const res = await getChallenge({
                    challengeType: difficulty as DIFFICULTTYPE,
                    name: debouncedSearch[0],
                    page: 1,
                    pageSize: 100
                });
                setChallenges(res.challenges);
                setSelectedChallenges(res.challenges);
            }
        };
        searchFn();
    }, debouncedSearch);

    useEffect(() => {
        const fn = async () => {
            const res = await getChallenge({
                name: debouncedSearch[0],
                challengeType: difficulty as DIFFICULTTYPE,
                page: 1,
                pageSize: 100
            });
            setChallenges(res.challenges);
            setSelectedChallenges(res.challenges);
        };
        fn();
    }, [difficulty]);

    const getChallenges = async () => {
        try {
            const res: any = await getChallenge({ page: 1, pageSize: 100 });
            setChallenges(res.challenges);
            setSelectedChallenges(res.challenges);
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    const onPageChange = ({ index }: { index: number }) => {
        updateCurrentPage(index);
        setSelectedChallenges([
            ...chunkArray({
                startingIndex: (index - 1) * pageSize,
                lastIndex: index * pageSize,
                array: challenges
            })
        ]);
    };
    function chunkArray({
        array,
        lastIndex,
        startingIndex
    }: {
        startingIndex: number;
        array: Array<challengeTableType>;
        lastIndex: number;
    }): Array<challengeTableType> {
        const chunks: Array<challengeTableType> = [];
        for (let i = startingIndex; i < lastIndex && i < array.length; i++) {
            chunks.push(array[i]);
        }
        return chunks;
    }

    return (
        <div className="flex flex-col gap-2 px-6">
            <Header
                searchValue={searchValue}
                onChange={(val: string) => setSearchValue(val)}
                difficulty={difficulty}
                difficultyChange={(val: string) => setDifficulty(val)}
            />
            {challenges.length > 0 ? (
                <ChallengeTable
                    challenges={selectedChallenges}
                    pageCount={Math.ceil(challenges.length / pageSize)}
                    currentPage={currentPage}
                    onPageChange={onPageChange}
                    isDelete={value => setIsDelete(value)}
                />
            ) : (
                <span className="text-center font-bold">There is no challenge to display</span>
            )}
        </div>
    );
};

export default Challenges;

const Header = ({
    searchValue,
    difficulty,
    onChange,
    difficultyChange
}: {
    searchValue: string;
    difficulty: string;
    onChange: (val: string) => void;
    difficultyChange: (val: string) => void;
}) => {
    let difficultyType = GlobalUtils.enumToArray(DIFFICULTTYPE);
    difficultyType.push('All Difficulty');

    return (
        <div className="flex flex-col gap-8 ">
            <h1 className="text-4xl font-bold text-white">Challenegs</h1>
            <div className="flex gap-8">
                <span className="min-w-72">
                    <Input
                        id="search"
                        type="text"
                        placeholder="Search for challenge ..."
                        icon="circum:search"
                        value={searchValue}
                        onChange={e => onChange(e.target.value)}
                    />
                </span>
                <div className="dropdown mr-auto">
                    <summary tabIndex={0} className=" btn flex h-[35px] min-h-[35px]">
                        {difficulty ? difficulty : 'All Difficulty'}
                        <IconRenderer width={24} height={24} icon={'solar:alt-arrow-down-linear'} />
                    </summary>
                    <ul
                        tabIndex={0}
                        className="menu dropdown-content z-[1] ml-4 mt-2 w-52 rounded-box bg-base-100 p-2 shadow"
                    >
                        {difficultyType.map((item, index) => (
                            <li
                                key={index}
                                onClick={() =>
                                    difficultyChange(item == 'All Difficulty' ? '' : item)
                                }
                            >
                                <a>{item}</a>
                            </li>
                        ))}
                    </ul>
                </div>
                <Link
                    href={'/admin/challenges/challenge-details'}
                    className="btn btn-outline h-[35px] min-h-[35px]"
                >
                    Challenges
                    <IconRenderer width={24} height={24} icon={'heroicons-solid:plus-sm'} />
                </Link>
            </div>
        </div>
    );
};
