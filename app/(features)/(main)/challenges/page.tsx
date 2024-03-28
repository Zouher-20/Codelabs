'use client';
import Image from 'next/image';
import imageEmpty from '@/public/images/challenges/challenge-background.png'
import Challenge from '@/app/components/cards/challenge';
import TournamentCard from './tournament-card';
import ChallengeInfo from './challenge-info';
import LabListComponent, { LabModel } from '../discover/components/lab-list-component';
import { useRouter } from 'next/navigation'

const challenges = true;

const items = [{
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
]

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
    const router = useRouter()
    return (
        challenges ? (
            <div className='p-4 flex flex-col gap-4'>
                <div className='flex gap-2 w-full '>
                    <div className='w-3/4'>
                        <Challenge
                            name='challenge name'
                            description='Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Incidunt ex porro enim similique vero voluptatem voluptas sequi.
                            Corporis ex, dolorem temporibus adipisci mollitia, corrupti assumenda,
                            voluptate totam aut repellat voluptatibus!'
                            id={1}
                        />
                    </div>
                    <div className='w-1/4'>
                        <ChallengeInfo items={items} />
                    </div>
                </div>
                <div className='bg-base-300 p-4 rounded-2xl'>
                    <LabListComponent labs={labs} title="Old challenges best labs" />
                </div>
                <TournamentCard />
            </div>
        ) : (
            <div className="flex flex-col w-full text-center py-24 gap-4" >
                <Image src={imageEmpty} alt="" className='self-center m-auto w-1/3' />
                <p >Currently there is now challenges come later to see what's new</p>
            </div >
        )
    )
}

