import Image from "next/image"
import imageTournament from '@/public/images/challenges/tornament.svg'
import IconRenderer from "@/app/components/globals/icon"
import Link from "next/link"

export default function LabsPage() {

    const info = {
        id: 1,
        name: 'Notifactions',
        title: 'Notification Center',
        subtitle: 'notification center',
        time: 'March 2024',
        startIn: '1h 30 sec',
        state: 'Right now!',
        duration: 'week 4',
        type: 'Vue JS',
        difficulty: 'hard',
        alreadyEnrolled: '30',
        tags: ["clc-notification-center"],
        description: [
            "It's the final week of the Notifications challenge!",
            "Last week, we gave some love to the most unloveable type of notifications: error messages. Check out the Pens from week three in our #CodePenChallenge: Error Messages collection.",
            "This week, we'll gather up all kinds of notifications into one convenient place with a Notification Center 💁‍♂️",
            "Our starter template includes a simple social notification center that opens & closes to reveal the notifications. It's not very stylish or user-friendly — yet. That's your challenge!",
            "We'll have lots of ideas and resources to help you tackle this challenge. And, as always, the template is just a starting point. Feel free to add or remove elements, change the content, or dismiss the whole thing and start over from scratch."
        ],
        ideas: [
            "This week's starter template has some basic features already in place: there are a handful of notifications tucked away inside a Notifications banner. But it sure doesn't look great. Think about how you could make it more appealing! Maybe you could swap out the clunky text banner with a notification bell icon like the one you made in week one?",
            "Consider how to handle opening and dismissing the UI in an interesting way. Could you make the notification center slide in or pop out? Or maybe keep the template's basic dropdown design but give it a little bounce or tilt? Also, think about where the notification center should live on the page. Do you want to keep it in a fixed position? Or would you like to float it along with the user as they navigate around the page?",
            "Bring in some interactivity! Give the user an option to delete or archive their notifications, or add in a little pull to refresh action. Maybe go a step further to make the notification center even more useful: help the user interact with the notification directly from the center. Could you mock up UI for replying, liking, or sending a tapback reaction in the notification center?"
        ],
        resources: [
            "Gather style inspiration for your notification center from Juxtopposed's Futuristic Social Media, Chris Bolson's well-rounded Notifications and Messages, or Vaibhav Khulbe's iOS 15 Notification Summary. And of course, you can find a ton of style concepts for a project like this under Dribbble's notification center tag.",
            "While you planning out the open & close of your notification center, take a little time to browse through some community inspiration! Check out the elegantly brisk open & close animation in Ward Larson's Activity notification panel concept, and the slide-out card controls on Sabine Robart's Sliding Notifications Card, and the classic style of sean_codes' Notifications Menu.",
            "Want to add some interactivity to your message center? Peruse Takane Ichinose's Reaction Social Media Card, Chris Coyier's Vue Neverending Inbox, Piotr Galor's cheeky Thanks for notifications, and Pieter Biesemans' Notifications UI + filtering for ideas."
        ],
    }
    const lastChallenge = [
        {
            name: 'Bubbles',
            time: 'April 2024',
            duration: 'week 4',
            state: 'complete',
            title: 'Bubbles',
            description: [
                "The April #CodePenChallenge starts now!",
                "This month, we're going to play around with bubbles 🫧",
                "Each week this month we'll give you a bubble-themed coding prompt, plus lots of resources and ideas to help get your creativity bubbling.",
                "Let's dive in 🛁",
                "Beautiful, buoyant bubbles are just as fun on the front-end as in real life! And this week, your challenge is to bring that bubbly fun to a Pen.",
                "This week's template includes a bubble emoji to help bubble up some ideas for your challenge Pen. The template is just a starting point to help you get going. Feel free to add or remove elements, change the style, or pop that bubble and start over from scratch!"
            ],
        },
        {
            name: 'Bubbles',
            time: 'April 2024',
            duration: 'week 4',
            state: 'complete',
            title: 'Bubbles',
            description: [
                "The April #CodePenChallenge starts now!",
                "This month, we're going to play around with bubbles 🫧",
                "Each week this month we'll give you a bubble-themed coding prompt, plus lots of resources and ideas to help get your creativity bubbling.",
                "Let's dive in 🛁",
                "Beautiful, buoyant bubbles are just as fun on the front-end as in real life! And this week, your challenge is to bring that bubbly fun to a Pen.",
                "This week's template includes a bubble emoji to help bubble up some ideas for your challenge Pen. The template is just a starting point to help you get going. Feel free to add or remove elements, change the style, or pop that bubble and start over from scratch!"
            ],
        },
        {
            name: 'Bubbles',
            time: 'April 2024',
            duration: 'week 4',
            state: 'complete',
            title: 'Bubbles',
            description: [
                "The April #CodePenChallenge starts now!",
                "This month, we're going to play around with bubbles 🫧",
                "Each week this month we'll give you a bubble-themed coding prompt, plus lots of resources and ideas to help get your creativity bubbling.",
                "Let's dive in 🛁",
                "Beautiful, buoyant bubbles are just as fun on the front-end as in real life! And this week, your challenge is to bring that bubbly fun to a Pen.",
                "This week's template includes a bubble emoji to help bubble up some ideas for your challenge Pen. The template is just a starting point to help you get going. Feel free to add or remove elements, change the style, or pop that bubble and start over from scratch!"
            ],
        }
    ]
    return <div className="flex flex-col gap-8 pb-8">
        <Introduction />
        <CurrentChallenge time={info.time} name={info.name} description={info.description} />
        <div className="grid grid-cols-2 gap-8 px-8">
            {lastChallenge.map((challenge, index) => (
                <div key={index}>
                    <LastChallenge
                        duration={challenge.duration}
                        state={challenge.state}
                        time={challenge.time}
                        name={challenge.name}
                        title={challenge.title}
                        description={challenge.description}
                    />
                </div>
            ))
            }
        </div>


    </div>
}

const LastChallenge = ({ duration, state, time, name, title, description }: {
    duration: string, state: string, time: string, name: string, title: string, description: Array<string>
}) => {
    return (
        <div className="flex flex-col rounded-2xl p-4 bg-base-100 gap-2" >
            <span className="text-primary mt-4">{duration} - {state}</span>
            <span className="text-white text-xl font-bold">{time}-{name}</span>
            <h1 className="text-white text-4xl font-bold flex gap-2 -ml-12">
                <IconRenderer className="self-center rounded-full text-primary  w-12 h-12" fontSize={24} icon="solar:check-circle-bold" />
                {title}</h1>
            <span className="leading-6">
                {description.map((desc, index) => (<div key={index} >
                    {desc}
                    <br /><br />
                </div>
                ))}
            </span>
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

const CurrentChallenge = ({ time, name, description }: {
    time: string, name: string, description: Array<string>
}) => {
    return (
        <div className="flex flex-col gap-2 bg-base-100 p-4 rounded-l-xl">
            <span className="text-primary">This month challenge</span>
            <span className="text-white text-xl font-bold">{time}-{name}</span>
            <h1 className="text-white text-4xl font-bold">{name}</h1>
            <span className="leading-6">
                {description.map((desc, index) => (
                    <div key={index}>
                        {desc}
                        <br /><br />
                    </div>
                ))}
            </span>
            <Link href={"/challenges/1"} className="btn w-fit btn-primary">Start Now</Link>
        </div>);
}