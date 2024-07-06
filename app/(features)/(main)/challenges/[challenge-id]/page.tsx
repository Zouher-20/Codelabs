import { getDetailsChallenge } from '@/app/api/(modules)/admin/challenge/services/action';
import IconRenderer from '@/app/components/globals/icon';
import Link from 'next/link';
import DisplayCard from '../components/display-card';
import EnrollCard from '../components/enroll-card';

const ChallengeDetails = async ({ params }: { params: { 'challenge-id': string } }) => {
    async function getData() {
        const challenge = await getDetailsChallenge({
            challengeId: params['challenge-id'],
            page: 1,
            pageSize: 100
        });
        return challenge.challenge;
    }

    const FormatDate = (date: Date) => {
        const month = date.toLocaleString('default', { month: 'long' });
        const day = date.getDate();
        const year = date.getFullYear();
        return `${month} ${day} ${year}`;
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

    const data = await getData();

    if (data)
        return (
            <div className="p-4">
                <div className="flex w-full flex-col rounded-3xl bg-base-100 p-8 lg:w-4/5 xl:relative xl:w-3/5">
                    <span className="-ml-4 flex gap-1 text-xl font-bold text-white">
                        <Link href={'/challenges'}>
                            <IconRenderer fontSize={24} icon="solar:arrow-left-linear" />
                        </Link>
                        {data.isComplete
                            ? `${FormatDate(data.createdAt)} - Complete`
                            : data.startedAt &&
                              data.endAt &&
                              `${daysBetween(data.endAt)} - Right Now`}
                    </span>
                    <h1 className="mt-4 text-4xl font-bold text-white">{data.name}</h1>
                    {data.description && (
                        <div
                            className="mt-4 leading-6"
                            dangerouslySetInnerHTML={{ __html: data.description }}
                        ></div>
                    )}

                    <EnrollCard title={data.name} tags={data?.TagMorph.map(item => item.tag)} />
                </div>
                <div className="mt-[7rem] flex">
                    {data.resources && <DisplayCard name="RESOURCES" resources={data.resources} />}
                </div>
                {/* <div className="flex mt-4">
                {data?.ChallengeParticipation.map((challenge, index) => {
                    <div key={index}>
                        {challenge}
                    </div>
                })}
            </div> */}
            </div>
        );
};

export default ChallengeDetails;
