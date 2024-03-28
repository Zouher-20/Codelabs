import imageTournament from '@/public/background/challenge-tournament.png'
import Image from 'next/image';

const TournamentCard = () => {
    return (
        <div className='bg-base-100 flex rounded-2xl p-1 gap-4'>
            <Image src={imageTournament} alt="" className='p-2' />
            <div className='flex flex-col gap-4 justify-center pr-10'>
                <h1 className='text-lg font-bold'>let the tournament begin !!! </h1>
                <p >
                    codelab tournament will let you enrol in a very competitive challenges and fight to be the
                    winner.
                    <br />
                    winning this challenge will higher you rate and make your lab shown to other user more
                    try hard to win these challenges we wish you all the best </p>
            </div>
        </div>
    );
}

export default TournamentCard;