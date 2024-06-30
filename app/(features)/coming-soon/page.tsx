"use client"
import React, { useState } from 'react';
import { DotLottiePlayer, Controls, PlayerEvents } from '@dotlottie/react-player';
import '@dotlottie/react-player/dist/index.css';

const ComingSoon = () => {
    const [loading, setLoading] = useState(true);
    return <div className="min-h-screen flex flex-col items-center gap-4">
        <div className='w-fit h-[75vh] max-h-[75vh] text-white relative'>
            <DotLottiePlayer
                src='/lottieFiles/coming-soon-1.lottie'
                onEvent={(event: PlayerEvents) => {
                    if (event === PlayerEvents.Ready) {
                        setLoading(false);
                    }
                }}
                autoplay
                loop
            >
            </DotLottiePlayer>
        </div>
        <span className=' absolute top-[50%]'>we're working hard to bring you something amazing.Stay tuned!</span>
    </div>
}

export default ComingSoon;