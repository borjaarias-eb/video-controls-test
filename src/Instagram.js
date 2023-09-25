import {useRef, useState} from "react";
import Button from "./Button";

const Instagram = ({config}) => {
    const videoRef = useRef();

    return <div className="flex">
        <div className="h-1/3">
            <video ref={videoRef}
                   onMouseDown={() => videoRef.current?.pause()} onMouseUp={() => videoRef.current?.play()} onTouchStart={() => videoRef.current?.pause()} onTouchEnd={() => videoRef.current?.play()}
                   width="320" id="background-video" autoPlay loop>
                <source src={config.url} type="video/mp4"/>
            </video>

            <p> Hold mouse button on the video to pause </p>
        </div>
        <div className="flex flex-col w-full md:w-1/4 p-8 gap-10">
            <Button onClick={async () => {
                videoRef.current?.play()
            }}>Play</Button>
            <Button onClick={() => videoRef.current?.pause()}>Pause</Button>
            <Button disabled>Stop</Button>
            <Button onClick={async () => {
                if (await videoRef.current?.volume !== 0) {
                    videoRef.current.volume = 0
                } else {
                    videoRef.current.volume = 1;
                }
            }
            }>Mute/unMute</Button>
        </div>
    </div>
}

export default Instagram;
