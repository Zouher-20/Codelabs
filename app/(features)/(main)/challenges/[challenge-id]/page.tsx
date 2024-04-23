import IconRenderer from "@/app/components/globals/icon";
import EnrollCard from '../components/enroll-card'
import DisplayCard from "../components/display-card";
import Link from "next/link";
const ChallengeDetails = ({ params }: { params: { id: number } }) => {

    const id = params.id;
    const info = {
        id: id,
        name: 'Notifactions',
        time: 'March 2024',
        startIn: '1h 30 sec',
        isComplete: true,
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

    return (
        <div className="p-4">
            <div className="p-8 bg-base-100 flex flex-col w-3/5 rounded-3xl relative">
                <span className="text-white text-xl font-bold flex gap-1 -ml-4">
                    <Link href={'/challenges'}><IconRenderer fontSize={24} icon="solar:arrow-left-linear" /></Link>
                    {info.time}-{info.name}</span>
                <span className="text-primary mt-4">{info.duration} - {info.isComplete ? 'Complete' : 'inProgress'}</span>
                <h1 className="text-white text-4xl font-bold ">{info.name}</h1>
                <span className="mt-4 leading-6">
                    {info.description.map((desc) => (<>
                        {desc} <br /><br />
                    </>
                    ))}
                </span>
                <EnrollCard title={info.name} tags={info.tags} />
            </div>
            <div className="flex pr-2 gap-12 mt-[7rem] ">
                <DisplayCard name="IDEAS" items={info.ideas} />
                <DisplayCard name="RESOURCES" items={info.resources} />
            </div>
        </div>
    );
}

export default ChallengeDetails;

