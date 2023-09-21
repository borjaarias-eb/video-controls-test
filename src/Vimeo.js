import {useEffect, useRef, useState} from "react";
import Player from '@vimeo/player';
import Button from "./Button";

const VimeoIFrame= ({config}) => {
    const iframeRef = useRef();
    const [player, setPlayer] = useState(null);
    const [end, setEnd] = useState(null);
    const [fullscreen, setFullscreen] = useState(false);
    const [start, setStart] = useState(0);

    const url = `https://player.vimeo.com/video/${config.id}?background=1`;

    useEffect(() => {
        if (iframeRef.current) {
            const plyr = new Player(iframeRef.current);

            plyr.on('play', () => plyr.setVolume(1))
            setPlayer(plyr);
        }
    }, [iframeRef]);

    const applyStartEnd = async () => {
        await player.setCurrentTime(start);
        if (!!end) {
            setTimeout(() => player.pause(), end * 1000);
        }
    }

    return <div>
        <div className={`p-8 float-left ${fullscreen ? 'fixed w-full h-full top-0' : 'relative'} bg-white transition-all`}>
                <iframe className="transition-all" src={url} width={fullscreen ? '100%' : config.w} height={fullscreen ? '100%' : config.h} ref={iframeRef} allow="autoplay" allowFullScreen/>
            <button className="absolute top-0 w-full h-full" onMouseDown={() => player.pause()} onMouseUp={() => player.play()} onTouchStart={() => player.pause()} onTouchEnd={() => player.play()}>
            </button>
        </div>
        <p> Hold mouse button on the video to pause </p>
        <div className="flex flex-col w-full md:w-1/4 p-8 gap-10">
            <div className="flex flex-col gap-5 border p-4 shadow">
                <label className="flex flex-row">
                    Start at second:
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="number" onChange={({ target: { value }}) => setStart(value)} />
                    <button className="px-4 shadow border border-l-0" onClick={() => setStart(0)}>X</button>
                </label>
                <label className="flex flex-row">
                    End after seconds:
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="number" onChange={({ target: { value }}) => setEnd(value)} />
                    <button className="px-4 shadow border border-l-0" onClick={() => setEnd(null)}>X</button>
                </label>
                <Button onClick={applyStartEnd}>Apply</Button>
            </div>
            <Button onClick={async () => {
                player.play()
            }}>Play</Button>
            <Button onClick={() => player.pause()}>Pause</Button>
            <Button disabled>Stop</Button>
            <Button onClick={async () => {
                    if (await player.getVolume() !== 0) {
                        player.setVolume(0)
                    } else {
                        player.setVolume(1);
                    }
                }
            }>Mute/unMute</Button>
            <Button className={fullscreen ? 'z-10 absolute bottom-1 right-1' : ''} onClick={() => {
                player.play()
                setFullscreen(!fullscreen);
            }
            }>{fullscreen ? 'Exit fullscreen' : 'Fullscreen'}</Button>
        </div>
    </div>
}

export default VimeoIFrame;
