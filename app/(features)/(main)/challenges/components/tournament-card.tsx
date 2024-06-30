import imageTournament from '@/public/images/challenges/tornament.svg';
import Image from 'next/image';

const TournamentCard = () => {
    return (
        <div className="flex flex-col justify-center gap-2 rounded-2xl bg-base-300 p-2 text-center xl:flex-row">
            <Image src={imageTournament} alt="" className="self-center xl:p-5" />
            <div className="flex flex-col justify-center gap-4">
                <h1 className="font-bold text-primary">Let the tournament begin !!! </h1>
                <p className="text-sm ">
                    Codelab tournament will let you enrol in a very competitive challenges and fight
                    to be the winner.
                    <br />
                    winning this challenge will higher you rate and make your lab shown to other
                    user more try hard to win these challenges we wish you all the best{' '}
                </p>
            </div>
        </div>
    );
};

export default TournamentCard;
