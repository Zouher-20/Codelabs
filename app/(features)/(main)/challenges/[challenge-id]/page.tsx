"use client"
import Image from "next/image";
import defaultImage from '@/public/lab.png'
import attachment from '@/public/images/challenges/attachment.png'
import ChallengeInfo from "../challenge-info";
import Lab from "@/app/components/globals/lab/lab";
import Button from "@/app/components/globals/form/button";
import { useEffect, useState } from "react";

type Challenge = {
    name: string,
    description: string,
    image: any,
    attachments: []
}
const ChallengeDetails = ({ params }: { params: { id: number } }) => {

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
    const id = params.id;
    const [challenge, setChallenge] = useState<Challenge>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                // const response = await getChallengeData(id);
                const challengeData: Challenge = {
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

    return (
        challenge ?
            <div className="flex p-4 gap-4 min-h-[550px]">
                <div className="flex flex-col gap-6 w-3/4 mr-auto">
                    <div className=" bg-base-300 flex flex-col gap-1 p-4 rounded-2xl ">
                        <div className="h-full flex gap-8">
                            <div className="max-h-52 min-h-52 justify-center min-w-52 bg-base-200 flex flex-col items-center rounded-xl">
                                <Image className="self-center" src={challenge.image ? challenge.image : defaultImage} alt="image" />
                            </div>
                            <div className="flex flex-col gap-2 slef-center w-full py-4">
                                <h1 className="text-xl font-bold">{challenge.name}</h1>
                                <p className="text-sm tracking-wide h-full">{challenge.description}</p>
                            </div>
                        </div>
                    </div>
                    <Attachments attachment={attachment} />
                </div>
                <div className="flex flex-col gap-4 fixed right-4" >
                    <div className="h-52">
                        <ChallengeInfo items={items} />
                    </div>
                    <p className="text-xl text-center">Submission History</p>
                    <section className="h-52 "><Lab /></section>
                    <Button style='w-1/3 self-end' label="enroll" color="any" />
                </div>
            </div>
            : <></>
    );
}

export default ChallengeDetails;

const Attachments = (attachments: any) => {
    const attachmentss = [attachment, attachment, attachment]
    return (
        <div className="bg-base-300 flex flex-col gap-4 p-4 rounded-2xl  w-full  ">
            <p className=" text-xl">Attachments</p>
            <div className="flex gap-4 flex-wrap">
                {attachmentss.map((attachment, index) => (
                    <div key={index}>
                        <Image className="self-center" src={attachment ? attachment : ''} alt="image" />
                    </div>
                ))
                }
            </div>
        </div>
    )
}