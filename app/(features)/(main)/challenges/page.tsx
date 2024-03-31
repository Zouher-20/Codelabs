'use client';
import { challengeType } from '@/app/@types/challenge';
import Challenge from '@/app/components/cards/challenge';
import defaultImage from '@/public/lab.svg';
import Link from 'next/link';
import { Route } from 'next/types';
import { useEffect, useState } from 'react';
import LabListComponent, { LabModel } from '../discover/components/lab-list-component';
import ChallengeInfo from './components/challenge-info';
import Empty from './components/empty';
import TournamentCard from './components/tournament-card';

const info = {
    type: 'Vue JS',
    difficulty: 'hard',
    startIn: '1h 30 sec',
    alreadyEnrolled: '30'
};

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
                    description:
                        'Lorem ipsum dolor sit amet, consectetur adipisicing elit.Incidunt ex porro enim similique vero voluptatem voluptas sequi.Corporis ex, dolorem temporibus adipisci mollitia, corrupti assumenda,voluptate totam aut repellat voluptatibus!',
                    image: defaultImage,
                    attachments: []
                };
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
        return (
            <div className="flex flex-col gap-4 p-4">
                <div className="flex w-full flex-col gap-2 sm:flex-row ">
                    <Challenge name={challenge.name} description={challenge.description}>
                        <section>
                            <Link
                                className="btn min-w-24 bg-base-200 text-primary"
                                href={('/challenges/' + `${1}`) as Route}
                            >
                                enroll
                            </Link>
                        </section>
                    </Challenge>
                    <ChallengeInfo info={info} />
                </div>
                {labs.length == 0 ? (
                    <> </>
                ) : (
                    <div className="rounded-2xl bg-base-300 p-4">
                        <LabListComponent labs={labs} title="Old challenges best labs" />
                    </div>
                )}
                <TournamentCard />
            </div>
        );
    else return <Empty />;
}
