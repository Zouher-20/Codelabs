'use client';
import { DotLottiePlayer, PlayerEvents } from '@dotlottie/react-player';
import '@dotlottie/react-player/dist/index.css';
import { useState } from 'react';

const HeaderImage = () => {
    const [loading, setLoading] = useState(true);

    return (
        <DotLottiePlayer
            src="/lottieFiles/Design.lottie"
            onEvent={(event: PlayerEvents) => {
                if (event === PlayerEvents.Ready) {
                    setLoading(false);
                }
            }}
            autoplay
        ></DotLottiePlayer>
    );
};

export default HeaderImage;
