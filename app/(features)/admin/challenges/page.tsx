'use client';
import Input from '@/app/components/globals/form/input';
import IconRenderer from '@/app/components/globals/icon';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ChallengeTable, { challengeTableType } from './components/table/challenge-table'
import Link from 'next/link';

const Challenges = () => {
    const [currentPage, updateCurrentPage] = useState(0);
    const currentParams = useSearchParams();
    var challenges: Array<challengeTableType> = [
        {
            id: 1,
            name: 'Challenge',
            difficulty: 'Hard',
            duration: '2 weeks',
            createdAt: 'April 22/4/204',
            tags: [{ name: 'clc-notification-center', tagType: 'challenges' }, { name: 'clc--center', tagType: 'challenges' }],
            isComplete: false
        },
        {
            id: 2,
            name: 'Challenge',
            difficulty: 'Hard',
            duration: '2 weeks',
            createdAt: 'April 22/4/204',
            tags: [{ name: 'clc-notification-center', tagType: 'challenges' },
            { name: 'clc-notification-center', tagType: 'challenges' },
            { name: 'clc-notification-center', tagType: 'challenges' },
            ],
            isComplete: true
        },
        {
            id: 3,
            name: 'Challenge',
            difficulty: 'Hard',
            duration: '2 weeks',
            createdAt: 'April 22/4/204',
            tags: [{ name: 'clc-notification-center', tagType: 'challenges' },],
            isComplete: true
        },
        {
            id: 4,
            name: 'Challenge',
            difficulty: 'Hard',
            duration: '2 weeks',
            tags: [{ name: 'clc-notification-center', tagType: 'challenges' }, { name: 'clc--center', tagType: 'challenges' }],
            createdAt: 'April 22/4/204',
            isComplete: true
        },
        {
            id: 5,
            name: 'Challenge',
            difficulty: 'Hard',
            duration: '2 weeks',
            tags: [{ name: 'clc-notification-center', tagType: 'challenges' }, { name: 'clc--center', tagType: 'challenges' }],
            createdAt: 'April 22/4/204',
            isComplete: true
        }
    ];
    const [selectedChallenges, setSelectedChallenges] = useState<Array<challengeTableType>>([]);
    const pageSize = 4;

    useEffect(() => {
        const id = Number(currentParams.get('id') ?? '1');
        onPageChange({ index: id });
    }, []);
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
    return <div className="flex flex-col gap-2 px-6">
        <Header />
        <ChallengeTable
            challenges={selectedChallenges}
            pageCount={Math.ceil(challenges.length / pageSize)}
            currentPage={currentPage}
            onPageChange={onPageChange}
        />
    </div>
}

export default Challenges;

const Header = () => {
    return <div className="flex flex-col gap-8 ">
        <h1 className="text-4xl font-bold text-white">Challenegs</h1>
        <div className="flex gap-8">
            <span className='min-w-72'>
                <Input
                    id="search"
                    type="text"
                    placeholder="Search for challenge ..."
                    icon="circum:search"
                    defaultValue={""}
                />
            </span>
            <div className="dropdown mr-auto">
                <summary tabIndex={0} className=" flex min-h-[35px] h-[35px] btn">Difficulty
                    <IconRenderer width={24} height={24} icon={'solar:alt-arrow-down-linear'} />
                </summary>
                <ul tabIndex={0} className="mt-2 ml-4 p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                    <li><a>Hard</a></li>
                    <li><a>easy</a></li>
                </ul>
            </div>
            <Link href={'/admin/challenges/challenge-details'} className="btn h-[35px] min-h-[35px] btn-outline">Challenges
                <IconRenderer width={24} height={24} icon={'heroicons-solid:plus-sm'} />
            </Link>
        </div>
    </div>
}
