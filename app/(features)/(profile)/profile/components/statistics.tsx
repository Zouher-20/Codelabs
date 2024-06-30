'use client';
import { userType } from '@/app/@types/user';
import { getMyStatisticsInfo } from '@/app/api/(modules)/auth/service/actions';
import StatisticsComponent from '@/app/components/statistics/statistics-components';
import { NAMEPLAN } from '@prisma/client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type statisticsType = {
    projectCount: number;
    classCount: number;
    chellangeCount: number;
    blogCount: number;
};
const Statistics = ({ user }: { user: userType }) => {
    const [myCapacity, setMyCapacity] = useState<statisticsType>();
    const [myInfo, setMyInfo] = useState<statisticsType>();

    useEffect(() => {
        getMyStatistics();
        getMyInfo();
    }, []);

    const getMyStatistics = async () => {
        await getMyStatisticsInfo().then(res => {
            setMyCapacity(res as unknown as statisticsType);
        });
    };
    const getMyInfo = () => {
        let arr: statisticsType = {
            projectCount: 0,
            classCount: 0,
            chellangeCount: 0,
            blogCount: 0
        };
        user.PlanSubscription?.plan.FeaturePlan.map(feature => {
            if (feature.name == NAMEPLAN.labs) arr.projectCount = feature.value;
            else if (feature.name == NAMEPLAN.blogs) arr.blogCount = feature.value;
            else if (feature.name == NAMEPLAN.challenge) arr.chellangeCount = feature.value;
            else arr.classCount = feature.value;
        });
        setMyInfo(arr);
    };
    const statistics = [
        { label: 'Labs', name: 'Labs capacity', key: 'projectCount' },
        { label: 'Classes', name: 'Classes capacity', key: 'classCount' },
        { label: 'Blogs', name: 'Blogs capacity', key: 'blogCount' },
        { label: 'Chellanges', name: 'Chellange capacity', key: 'chellangeCount' }
    ];
    return (
        <div className="grid w-full grid-cols-1 gap-4 p-4 sm:grid-cols-2 xl:grid-cols-3 ">
            {myInfo &&
                myCapacity &&
                statistics.map((statistic, index) => (
                    <div
                        className={index == 2 ? 'col-span-1 gap-4 sm:col-span-3 sm:flex' : ''}
                        key={index}
                    >
                        <div className={index == 2 ? 'sm:w-1/3' : ''}>
                            <StatisticsComponent
                                addStat={true}
                                cardLabel={statistic.label}
                                labels={[statistic.name, statistic.label]}
                                series={[
                                    myInfo[statistic.key as keyof typeof myInfo],
                                    myCapacity[statistic.key as keyof typeof myCapacity]
                                ]}
                                colors={['#282C2B', '#50FA7B']}
                                width={220}
                                height={200}
                            />
                        </div>
                        <div
                            className={
                                'w-2/3 self-center px-16 ' +
                                (index == 2 ? 'max-xl:hidden xl:block' : 'hidden')
                            }
                        >
                            <div
                                className="text-2xl font-bold leading-relaxed"
                                style={{ transform: 'rotate(-5deg)' }}
                            >
                                Looking to add more labs and classes? Upgrade your plan for greater
                                flexibility!
                                <br />
                                Check out our options to find the perfect plan for you!"
                                <Link href={`/plans/${user.PlanSubscription?.planId}`} className="btn btn-primary ml-2 ">Extend</Link>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default Statistics;
