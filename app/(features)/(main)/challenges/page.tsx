import Image from "next/image"
import imageTournament from '@/public/images/challenges/tornament.svg'
import IconRenderer from "@/app/components/globals/icon"
import Link from "next/link"

export default function LabsPage() {

    const info = {
        id: 1,
        name: 'Notifactions',
        duration: 'week 4',
        difficulty: 'hard',
        isComplete: false,
        createdAt: '22/4/2024',
        tags: [{ name: 'clc-notification-center', tagType: 'challenges' }],
        description: "It's the final week of the Notifications challenge!Last week, we gave some love to the most unloveable type of notifications: error messages. Check out the Pens from week three in our #CodePenChallenge: Error Messages collection. This week, we'll gather up all kinds of notifications into one convenient place with a Notification Center 💁‍♂️ Our starter template includes a simple social notification center that opens & closes to reveal the notifications. It's not very stylish or user-friendly — yet. That's your challenge!We'll have lots of ideas and resources to help you tackle this challenge. And, as always, the template is just a starting point. Feel free to add or remove elements, change the content, or dismiss the whole thing and start over from scratch.",
        resources: "Gather style inspiration for your notification center from Juxtopposed's Futuristic Social Media, Chris Bolson's well-rounded Notifications and Messages, or Vaibhav Khulbe's iOS 15 Notification Summary. And of course, you can find a ton of style concepts for a project like this under Dribbble's notification center tag. While you planning out the open & close of your notification center, take a little time to browse through some community inspiration! Check out the elegantly brisk open & close animation in Ward Larson's Activity notification panel concept, and the slide-out card controls on Sabine Robart's Sliding Notifications Card, and the classic style of sean_codes' Notifications Menu. Want to add some interactivity to your message center? Peruse Takane Ichinose's Reaction Social Media Card, Chris Coyier's Vue Neverending Inbox, Piotr Galor's cheeky Thanks for notifications, and Pieter Biesemans' Notifications UI + filtering for ideas."
    }
    const lastChallenge = [
        {
            id: 1,
            name: 'Bubbles',
            createdAt: 'April 2024',
            duration: 'week 4',
            isComplete: true,
            tags: [{ name: 'clc-notification-center', tagType: 'challenges' }],
            difficulty: 'hard',
            description: "The April #CodePenChallenge starts now! This month, we're going to play around with bubbles 🫧 Each week this month we'll give you a bubble-themed coding prompt, plus lots of resources and ideas to help get your creativity bubbling.Let's dive in 🛁 Beautiful, buoyant bubbles are just as fun on the front-end as in real life! And this week, your challenge is to bring that bubbly fun to a Pen.This week's template includes a bubble emoji to help bubble up some ideas for your challenge Pen. The template is just a starting point to help you get going. Feel free to add or remove elements, change the style, or pop that bubble and start over from scratch!"
        },
        {
            id: 2,
            name: 'Bubbles',
            createdAt: 'April 2024',
            duration: 'week 4',
            isComplete: true,
            tags: [{ name: 'clc-notification-center', tagType: 'challenges' }],
            difficulty: 'hard',
            description: "The April #CodePenChallenge starts now! This month, we're going to play around with bubbles 🫧 Each week this month we'll give you a bubble-themed coding prompt, plus lots of resources and ideas to help get your creativity bubbling.Let's dive in 🛁 Beautiful, buoyant bubbles are just as fun on the front-end as in real life! And this week, your challenge is to bring that bubbly fun to a Pen.This week's template includes a bubble emoji to help bubble up some ideas for your challenge Pen. The template is just a starting point to help you get going. Feel free to add or remove elements, change the style, or pop that bubble and start over from scratch!"
        },
        {
            id: 3,
            name: 'Bubbles',
            createdAt: 'April 2024',
            duration: 'week 4',
            isComplete: true,
            tags: [{ name: 'clc-notification-center', tagType: 'challenges' }],
            difficulty: 'hard',
            description: "The April #CodePenChallenge starts now! This month, we're going to play around with bubbles 🫧 Each week this month we'll give you a bubble-themed coding prompt, plus lots of resources and ideas to help get your creativity bubbling.Let's dive in 🛁 Beautiful, buoyant bubbles are just as fun on the front-end as in real life! And this week, your challenge is to bring that bubbly fun to a Pen.This week's template includes a bubble emoji to help bubble up some ideas for your challenge Pen. The template is just a starting point to help you get going. Feel free to add or remove elements, change the style, or pop that bubble and start over from scratch!"
        }
    ]
    return <div className="flex flex-col gap-8 pb-8">
        <Introduction />
        <CurrentChallenge id={info.id} duration={info.duration} name={info.name} description={info.description} />
        <div className="grid grid-cols-2 gap-8 px-8">
            {lastChallenge.map((challenge, index) => (
                <div key={index}>
                    <LastChallenge
                        id={challenge.id}
                        duration={challenge.duration}
                        isComplete={challenge.isComplete}
                        name={challenge.name}
                        description={challenge.description}
                    />
                </div>
            ))}
        </div>
    </div>
}

const LastChallenge = ({ id, duration, isComplete, name, description }: {
    id: number, duration: string, isComplete: boolean, name: string, description: string
}) => {
    return (
        <div className="flex flex-col rounded-2xl p-4 bg-base-100 gap-2" >
            <span className="text-primary mt-4">{duration} - {isComplete ? 'Complete' : 'In Progress'}</span>
            <span className="text-white text-xl font-bold">{duration}-{name}</span>
            <h1 className="capitalize text-white text-4xl font-bold flex gap-2 -ml-12">
                <IconRenderer className="self-center rounded-full text-primary  w-12 h-12" fontSize={24} icon="solar:check-circle-bold" />
                {name}</h1>
            <span className="leading-relaxed">{description}</span>
            <Link href={`/challenges/${id}`} className="btn w-fit btn-primary mt-2 self-end">Details</Link>
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
        <Image src={imageTournament} alt="" className=' absolute right-32 top-5 w-80 h-80' />
    </div>
}

const CurrentChallenge = ({ id, duration, name, description }: {
    id: number, duration: string, name: string, description: string
}) => {
    return (
        <div className="flex flex-col gap-2 bg-base-100 p-6 rounded-l-xl">
            <span className="text-primary">This month challenge</span>
            <span className="text-white text-xl font-bold">{duration}-{name}</span>
            <h1 className="text-white text-4xl font-bold">{name}</h1>
            <span className="leading-6">{description}</span>
            <Link href={`/challenges/${id}`} className="btn w-fit btn-primary">Start Now</Link>
        </div>);
}