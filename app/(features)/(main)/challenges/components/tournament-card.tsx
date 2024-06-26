import imageTournament from '@/public/images/challenges/tornament.svg'
import Image from 'next/image';

const TournamentCard = () => {
    return (
        <div className='bg-base-300 flex flex-col xl:flex-row justify-center text-center rounded-2xl p-2 gap-2'>
            <Image src={imageTournament} alt="" className='xl:p-5 self-center' />
            <div className='flex flex-col gap-4 justify-center'>
                <h1 className='font-bold text-primary'>Let the tournament begin !!! </h1>
                <p className='text-sm '>
                    Codelab tournament will let you enrol in a very competitive challenges and fight to be the
                    winner.
                    <br />
                    winning this challenge will higher you rate and make your lab shown to other user more
                    try hard to win these challenges we wish you all the best </p>
            </div>
        </div>
    );
}

export default TournamentCard;