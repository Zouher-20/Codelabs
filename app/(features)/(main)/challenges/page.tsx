import { challengeType } from '@/app/@types/challenge';
import { getChallenge } from '@/app/api/(modules)/admin/service/action';
import IconRenderer from '@/app/components/globals/icon';
import imageTournament from '@/public/images/challenges/tornament.svg';
import Image from 'next/image';
import Link from 'next/link';

async function getData() {
    const data = await getChallenge({ page: 1, pageSize: 100 });
    const currentCh: challengeType[] = [];
    const lastCh: challengeType[] = [];

    if (data.challenges) {
        data.challenges.map(challenge => {
            if (!challenge.isComplete) currentCh.push(challenge as unknown as challengeType);
            else lastCh.push(challenge as unknown as challengeType);
        });
    }
    return { lastCh, currentCh };
}

export default async function ChallengesPage() {
    const challenges = await getData();
    return (
        <div className="flex flex-col gap-8 pb-8">
            <Introduction showImage={challenges ? true : false} />

            {challenges.currentCh.length > 0 ? (
                <CurrentChallenge challenge={challenges.currentCh[0]} />
            ) : (
                <div className="flex justify-center pt-44 text-xl font-bold ">
                    There is no challenge right now !
                </div>
            )}

            {challenges.currentCh.length > 0 && (
                <div>
                    <span className="pl-4 text-2xl font-bold">Ongoing challenges : </span>
                    <div className="mt-8 grid gap-8 px-8 lg:grid-cols-2">
                        {challenges.currentCh.map((challenge, index) => {
                            if (index == 0) return null;
                            else
                                return (
                                    <div key={index}>
                                        <LastChallenge challenge={challenge} />
                                    </div>
                                );
                        })}
                    </div>
                </div>
            )}
            {challenges.lastCh.length > 0 && (
                <div>
                    <span className="text-2xl font-bold">Last challenges : </span>
                    <div className="mt-8 grid gap-8 px-8 lg:grid-cols-2">
                        {challenges.lastCh.map((challenge, index) => {
                            return (
                                <div key={index}>
                                    <LastChallenge challenge={challenge} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}

const LastChallenge = ({ challenge }: { challenge: challengeType }) => {
    let formattedDate = '';
    if (challenge.createdAt) {
        const month = challenge.createdAt.toLocaleString('default', { month: 'long' });
        const day = challenge.createdAt.getDate();
        const year = challenge.createdAt.getFullYear();
        formattedDate = `${month} ${day} ${year}`;
    }
    return (
        <div className="flex flex-col gap-2 rounded-2xl bg-base-100 p-4">
            <span className="mt-4 text-primary">
                {' '}
                {challenge.isComplete
                    ? `${formattedDate} Days - Complete`
                    : `${daysBetween(challenge.endAt)} Days - Right Now`}
            </span>
            <h1 className="-ml-12 flex gap-2 text-4xl font-bold capitalize text-white">
                <IconRenderer
                    className="h-12 w-12 self-center  rounded-full text-primary"
                    fontSize={24}
                    icon="solar:check-circle-bold"
                />
                {challenge.name}
            </h1>
            <div
                className="leading-relaxed"
                dangerouslySetInnerHTML={{ __html: challenge.description }}
            ></div>
            <Link
                href={`/challenges/${challenge.id}`}
                className="btn btn-primary mt-2 w-fit self-end"
            >
                Details
            </Link>
        </div>
    );
};
const Introduction = ({ showImage }: { showImage: boolean }) => {
    return (
        <div className="relative flex gap-2 py-8 pl-2">
            <div className="flex flex-col gap-4  self-center">
                <h1 className="text-4xl font-bold text-white">Challenges</h1>
                <span>
                    Challenges are fun opportunities for leveling up your skills by building things.
                    <br />
                    Each week, you’ll get a new prompt surrounding a monthly theme to riff on.
                    <br />
                    The best Labs get picked and featured on the homepage!
                </span>
            </div>
            {showImage && (
                <Image
                    src={imageTournament}
                    alt=""
                    className="absolute right-32 top-5 hidden h-80 w-80 xl:block "
                />
            )}
        </div>
    );
};

const CurrentChallenge = ({ challenge }: { challenge: challengeType }) => {
    return (
        <div className="flex flex-col gap-2 rounded-l-xl bg-base-100 p-6">
            <span className="text-primary">This month challenge</span>
            <span className="text-xl font-bold text-white">
                {daysBetween(challenge.endAt)} - {challenge.isComplete ? 'Complete' : 'Right Now!'}
            </span>
            <h1 className="text-4xl font-bold text-white">{challenge.name}</h1>
            <div
                className="leading-6"
                dangerouslySetInnerHTML={{ __html: challenge.description }}
            ></div>
            <Link href={`/challenges/${challenge.id}`} className="btn btn-primary w-fit">
                Start Now
            </Link>
        </div>
    );
};
const daysBetween = (date: Date) => {
    let now = new Date();
    const diffInMilliseconds = date.getTime() - now.getTime();
    const days = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24));
    const minuts = diffInMilliseconds / (1000 * 60 * 60 * 24);
    if (minuts <= 0) return 'Finished';
    else if (minuts < 1) return `${(diffInMilliseconds / (1000 * 60)).toFixed(2)} Minutes`;
    return `${days}  Days`;
};
