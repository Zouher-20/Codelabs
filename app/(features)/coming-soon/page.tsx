'use client';
import { DotLottiePlayer, PlayerEvents } from '@dotlottie/react-player';
import '@dotlottie/react-player/dist/index.css';
import { useState } from 'react';

const ComingSoon = () => {
    const [loading, setLoading] = useState(true);
    return (
        <div className="flex min-h-screen flex-col items-center gap-4">
            <div className="relative h-[75vh] max-h-[75vh] w-fit text-white">
                <DotLottiePlayer
                    src="/lottieFiles/coming-soon-1.lottie"
                    onEvent={(event: PlayerEvents) => {
                        if (event === PlayerEvents.Ready) {
                            setLoading(false);
                        }
                    }}
                    autoplay
                    loop
                ></DotLottiePlayer>
            </div>
            <span className=" absolute top-[50%]">
                we're working hard to bring you something amazing.Stay tuned!
            </span>
        </div>
    );
};

export default ComingSoon;
