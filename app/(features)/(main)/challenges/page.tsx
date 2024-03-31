'use client';
import Challenge from '@/app/components/cards/challenge';
import imageEmpty from '@/public/background/challenge-background.png';
import Image from 'next/image';
import ChallengeInfo from './challenge-info';
import TournamentCard from './tournament-card';

const challenges = true;

const items = [
    {
        icon: 'solar:bookmark-circle-broken',
        label: 'type',
        color: 'text-info'
    },
    {
        icon: 'solar:bonfire-line-duotone',
        label: 'Difficulty : hard',
        color: 'text-error'
    },
    {
        icon: 'solar:clock-square-bold-duotone',
        label: 'start in : 1h 30 sec',
        color: 'text-secondary'
    },
    {
        icon: 'solar:virus-bold-duotone',
        label: 'already enrolled : 30  ',
        color: 'text-primary'
    }
];

export default function LabsPage() {
    return challenges ? (
        <div className="flex flex-col gap-4 p-2">
            <div className="flex w-full gap-2 ">
                <div className="w-3/4">
                    <Challenge
                        name="challenge name"
                        description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt ex porro enim similique vero voluptatem voluptas sequi. Corporis ex, dolorem temporibus adipisci mollitia, corrupti assumenda, voluptate totam aut repellat voluptatibus!"
                    />
                </div>
                <div className="w-1/4">
                    <ChallengeInfo items={items} />
                </div>
            </div>
            <div>carsoul</div>
            <TournamentCard />
        </div>
    ) : (
        <div className="flex w-full flex-col gap-4 py-24 text-center">
            <Image src={imageEmpty} alt="" className="self-center" />
            <p className="text-lg">
                Currently there is now challenges come later to see what's new
            </p>
        </div>
    );
}
