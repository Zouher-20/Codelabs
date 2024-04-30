"use client"
import React, { useState } from 'react';
import { DotLottiePlayer, Controls, PlayerEvents } from '@dotlottie/react-player';
import '@dotlottie/react-player/dist/index.css';

const HeaderImage = () => {
    const [loading, setLoading] = useState(true);

    return <DotLottiePlayer
        src='/lottieFiles/Design.lottie'
        onEvent={(event: PlayerEvents) => {
            if (event === PlayerEvents.Ready) {
                setLoading(false);
            }
        }}
        autoplay
    >
    </DotLottiePlayer>
}

export default HeaderImage;