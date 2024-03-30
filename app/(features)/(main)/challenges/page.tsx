'use client';
import Challenge from '@/app/components/cards/challenge';
import TournamentCard from './components/tournament-card';
import ChallengeInfo from './components/challenge-info';
import LabListComponent, { LabModel } from '../discover/components/lab-list-component';
import Link from 'next/link';
import { Route } from 'next/types';
import Empty from './components/empty';
import { challengeType } from '@/app/@types/challenge';
import { useEffect, useState } from 'react';
import defaultImage from '@/public/lab.png'


const info = {
    type: 'Vue JS',
    difficulty: 'hard',
    startIn: '1h 30 sec',
    alreadyEnrolled: '30',
}

var labs: Array<LabModel> = [
    { title: 'A new code Lab Sidebar' },
    { title: 'a unique appbar' },
    { title: 'button' },
    { title: 'text' },
    { title: 'new font style' },
    { title: 'new font style2' },
    { title: 'new font style3' }
];


export default function LabsPage() {

    const [challenge, setChallenge] = useState<challengeType>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                // const response = await getChallengeData(id);
                const challengeData: challengeType = {
                    name: 'challenge name',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.Incidunt ex porro enim similique vero voluptatem voluptas sequi.Corporis ex, dolorem temporibus adipisci mollitia, corrupti assumenda,voluptate totam aut repellat voluptatibus!',
                    image: defaultImage,
                    attachments: []
                }
                setChallenge(challengeData);
            } catch (error: any) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    if (challenge)
        return <div className='p-4 flex flex-col gap-4'>
            <div className='flex flex-col sm:flex-row gap-2 w-full '>
                <Challenge
                    name={challenge.name}
                    description={challenge.description}>
                    <section><Link className="btn min-w-24 bg-base-200 text-primary" href={('/challenges/' + `${1}`) as Route} >enroll</Link></section>
                </Challenge>
                <ChallengeInfo info={info} />
            </div>
            {
                (labs.length == 0) ? <> </> :
                    <div className='bg-base-300 p-4 rounded-2xl'>
                        <LabListComponent labs={labs} title="Old challenges best labs" />
                    </div>
            }
            <TournamentCard />
        </div>
    else return <Empty />
}

