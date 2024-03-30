"use client"
import Image from "next/image";
import defaultImage from '@/public/lab.png'
import attachment from '@/public/images/challenges/attachment.png'
import ChallengeInfo from "../components/challenge-info";
import Lab from "@/app/components/globals/lab/lab";
import Button from "@/app/components/globals/form/button";
import { useEffect, useState } from "react";
import Challenge from "@/app/components/cards/challenge";
import { challengeType } from "@/app/@types/challenge";

const ChallengeDetails = ({ params }: { params: { id: number } }) => {

    const info = {
        type: 'Vue JS',
        difficulty: 'hard',
        startIn: '1h 30 sec',
        alreadyEnrolled: '30',
    }
    const id = params.id;
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
            <div className="p-4 flex flex-col gap-4 w-full">
                <div className='flex flex-col sm:flex-row gap-2 w-full '>
                    <Challenge
                        name={challenge.name}
                        description={challenge.description}>
                    </Challenge>
                    <ChallengeInfo info={info} />
                </div>
                <div className='flex  sm:flex-row gap-2 w-full flex-col-reverse'>
                    <Attachments attachment={attachment} />
                    <div className="flex flex-col gap-4">
                        <p className="text-xl text-center">Submission History</p>
                        <Lab />
                        <Button style='w-1/3 self-center xl:self-end ' label="enroll" color="any" />
                    </div>
                </div>
            </div>
            : <></>
    );
}

export default ChallengeDetails;

const Attachments = (attachments: any) => {
    const attachmentss = [attachment, attachment, attachment, attachment]
    return (
        <div className="bg-base-300 flex flex-col gap-4 p-4 rounded-2xl w-full max-xl:text-center h-fit">
            <p className=" text-xl">Attachments</p>
            <div className="flex flex-col md:flex-row gap-4 flex-wrap max-xl:self-center">
                {attachmentss.map((attachment, index) => (
                    <div key={index}>
                        <Image className="self-center max-w-40 min-w-40" src={attachment ? attachment : ''} alt="image" />
                    </div>
                ))
                }
            </div>
        </div>
    )
}