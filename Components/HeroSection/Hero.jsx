'use client'
import React, { useEffect, useRef, useState } from 'react'
import Button from '../Reusable/Button';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/all";

// icons 
import { TiLocationArrow } from "react-icons/ti";


gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const [curuntIndex, setCuruntIndex] = useState(1);
    const [hasClicked, setHasClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [loadedVideos, setLoadedVideos] = useState(0);


    const totalVideos = 4; // Total number of videos to load
    const nextVideoRef = useRef(null);

    const upcomingVideoIndex = (curuntIndex % totalVideos) + 1; // Calculate the next video index

    const handleMiniVdClick = () => {
        setHasClicked(true);
        setCuruntIndex(upcomingVideoIndex);

    }

    const handleVideoLoad = () => {
        setLoadedVideos((prev) => prev + 1);
    }

    const getvideoSrc = (index) => `./videos/hero-${index}.mp4`;

    useEffect(() => {
        if (loadedVideos === totalVideos - 1) {
            setIsLoading(false);
        }
    }, [loadedVideos]);

    // animation gsap 
    useGSAP(
        () => {
            if (hasClicked) {
                gsap.set("#next-video", { visibility: "visible" });
                gsap.to("#next-video", {
                    transformOrigin: "center center",
                    scale: 1,
                    width: "100%",
                    height: "100%",
                    duration: 1,
                    ease: "power1.inOut",
                    onStart: () => nextVideoRef.current.play(),
                });
                gsap.from("#current-video", {
                    transformOrigin: "center center",
                    scale: 0,
                    duration: 1.5,
                    ease: "power1.inOut",
                });
            }
        },
        {
            dependencies: [curuntIndex],
            revertOnUpdate: true,
        }
    );

    useGSAP(() => {
        gsap.set("#video-frame", {
            clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
            borderRadius: "0% 0% 40% 10%",
        });
        gsap.from("#video-frame", {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            borderRadius: "0% 0% 0% 0%",
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: "#video-frame",
                start: "center center",
                end: "bottom center",
                scrub: true,
            },
        });
    });


    return (
        <div className='relative w-screen h-dvh overflow-x-hidden'>

            {isLoading && (
                <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
                    {/* https://uiverse.io/G4b413l/tidy-walrus-92 */}
                    <div className="three-body">
                        <div className="three-body__dot"></div>
                        <div className="three-body__dot"></div>
                        <div className="three-body__dot"></div>
                    </div>
                </div>
            )}

            <div id='video-frame' className='relative z-10 w-screen h-dvh overflow-hidden rounded-lg bg-billu-75 '>


                {/* video player  */}
                <div>

                    {/* miniVideo player */}
                    <div className='mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg'>
                        <div
                            className='origin-center scale-50 opacity-0 hover:scale-100 hover:opacity-100 transition-all duration-500 ease-in'
                            onClick={handleMiniVdClick}>
                            <video
                                loop
                                muted
                                ref={nextVideoRef}
                                id='curent-video'
                                src={getvideoSrc(upcomingVideoIndex)}
                                onLoadedData={handleVideoLoad}
                                className='size-64 origin-center scale-150 obeject-cover object-center'
                            />
                        </div>
                    </div>
                    {/* miniVideo player end */}

                    {/* bg video player  */}
                    <video
                        loop
                        muted
                        autoPlay
                        ref={nextVideoRef}
                        id='next-video'
                        src={getvideoSrc(curuntIndex)}
                        onLoadedData={handleVideoLoad}
                        className='absolute-center size-64 absolute invisible z-20 object-center object-cover'
                    />

                    <video
                        loop
                        muted
                        autoPlay
                        ref={nextVideoRef}
                        id='next-video'
                        src={getvideoSrc(curuntIndex === totalVideos - 1 ? 1 : curuntIndex)}
                        onLoadedData={handleVideoLoad}
                        className='absolute left-0 top-0 size-full object-center object-cover'
                    />
                    {/* bg video player end */}

                </div>
                {/* video player end   */}

                {/* bottom text  */}
                <h1 className='special-font hero-heading absolute bottom-5  z-40 right-5 text-billu-75'><b>a</b>nime</h1>

                {/* main text contain */}
                <div className='absolute left-0 top-0 z-40 size-full'>
                    <div className='mt-24 px-5 sm:px-10'>
                        <h1 className='special-font hero-heading cursor-default text-billu-100'><b>A</b>nimeb<b>H</b>UB</h1>
                        <p className='mb-5 max-w-64 font-robert-regular cursor-default text-billu-100'>Enter the Anime Universe <br />
                            Fill It With Your Favorite Anime
                        </p>

                        <Button id='watch-trailer' title="Watch Trailer" leftIcon={<TiLocationArrow />} containerClass="!bg-yellow-300 flex-center gap-1" />

                    </div>
                </div>
            </div>

            {/* bottom animation text  */}
            <h1 className='special-font hero-heading absolute bottom-5 right-5 text-black'><b>a</b>nime</h1>

        </div>
    )
}

export default Hero