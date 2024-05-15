import Image from "next/image"
import imageTournament from '@/public/images/challenges/tornament.svg'
import IconRenderer from "@/app/components/globals/icon"
import Link from "next/link"
import { challengeType } from '@/app/@types/challenge'
import { getDetailsChallenge } from "@/app/api/(modules)/admin/challenge/services/action"
import { getChallenge } from "@/app/api/(modules)/admin/service/action"

async function getData() {
    const challenge = await getDetailsChallenge({ challengeId: 'clw23v8hq0001pw8n67popm1d', page: 1, pageSize: 100 });
    const challenges = await getChallenge({ page: 1, pageSize: 100 });
    const data = {
        challenge: (challenge.challenge as unknown as challengeType),
        challenges: (challenges.challenges as unknown as challengeType[])
    }
    return data
}
export default async function ChallengesPage() {

    const data = await getData()
    return <div className="flex flex-col gap-8 pb-8">
        <Introduction />
        {data.challenge && <CurrentChallenge challenge={data.challenge} />}
        <div className="grid lg:grid-cols-2 gap-8 px-8">
            {data.challenges && data.challenges.map((challenge, index) => {
                if (challenge.isComplete) return (
                    <div key={index}>
                        <LastChallenge challenge={challenge} />
                    </div>
                )
            }
            )}
        </div>
    </div>
}

const LastChallenge = ({ challenge }: { challenge: challengeType }) => {

    let formattedDate = '';
    if (challenge.createdAt) {
        const month = challenge.createdAt.toLocaleString('default', { month: 'long' });
        const day = challenge.createdAt.getDate();
        const year = challenge.createdAt.getFullYear();
        formattedDate = `${month} ${day} ${year}`
    }
    return (
        <div className="flex flex-col rounded-2xl p-4 bg-base-100 gap-2" >
            <span className="text-primary mt-4"> {challenge.isComplete
                ? `${formattedDate} Days - Complete`
                : `${daysBetween(challenge.endAt)} Days - Right Now`}</span>
            <h1 className="capitalize text-white text-4xl font-bold flex gap-2 -ml-12">
                <IconRenderer className="self-center rounded-full text-primary  w-12 h-12" fontSize={24} icon="solar:check-circle-bold" />
                {challenge.name}</h1>
            <div className="leading-relaxed" dangerouslySetInnerHTML={{ __html: challenge.description }}></div>
            <Link href={`/challenges/${challenge.id}`} className="btn w-fit btn-primary mt-2 self-end">Details</Link>
        </div>
    )
}
const Introduction = () => {
    return <div className="flex gap-2 relative py-8 pl-2">
        <div className="flex flex-col gap-4  self-center">
            <h1 className="text-4xl text-white font-bold">Challenges</h1>
            <span >Challenges are fun opportunities for leveling up your skills by building things.<br />
                Each week, you’ll get a new prompt surrounding a monthly theme to riff on.<br />
                The best Labs get picked and featured on the homepage!</span>
        </div>
        <Image src={imageTournament} alt="" className='hidden xl:block absolute right-32 top-5 w-80 h-80 ' />
    </div>
}

const CurrentChallenge = ({ challenge }: { challenge: challengeType }) => {
    return (
        <div className="flex flex-col gap-2 bg-base-100 p-6 rounded-l-xl">
            <span className="text-primary">This month challenge</span>
            <span className="text-white text-xl font-bold">{daysBetween(challenge.endAt)} - {challenge.isComplete ? 'Complete' : 'Right Now!'}</span>
            <h1 className="text-white text-4xl font-bold">{challenge.name}</h1>
            <div className="leading-6" dangerouslySetInnerHTML={{ __html: challenge.description }}></div>
            <Link href={`/challenges/${challenge.id}`} className="btn w-fit btn-primary">Start Now</Link>
        </div>);
}
const daysBetween = (date: Date) => {
    let now = new Date();
    const diffInMilliseconds = date.getTime() - now.getTime();
    const days = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24));
    const minuts = diffInMilliseconds / (1000 * 60 * 60 * 24);
    if (minuts <= 0)
        return 'Finished'
    else if (minuts < 1)
        return `${(diffInMilliseconds / (1000 * 60)).toFixed(2)} Minutes`
    return `${days}  Days`

}
