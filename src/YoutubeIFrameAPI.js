import {useEffect, useRef, useState} from "react";
import Button from "./Button";
import YouTube from "react-youtube";

const onYouTubeIframeAPIReady = () => {
    debugger;
}

const YoutubeIFrameAPI = ({config}) => {
    const iframeRef = useRef(null);
    const [player, setPlayer] = useState(null);
    const [controls, setControls] = useState(false);
    const [end, setEnd] = useState(null);
    const [start, setStart] = useState(0);

    const applyStartEnd = () => {
        player.seekTo(start, true);
        if (!!end) {
            setTimeout(() => player.pauseVideo(), end * 1000);
        }
    }

    return (
        <div className="App">
            <div className="p-8 w-full float-left">
                <YouTube
                    id="player"
                    videoId={config.id}
                    opts={
                        {
                            width:config.w,
                            height:config.h,
                            playerVars: {
                                controls: controls ? 1 : 0,
                                fs: 1,
                            }
                        }
                    }
                    onReady={({ target }) => {
                        target.playVideo();
                        setPlayer(target);
                    }}
                />
            </div>
            <div className="flex flex-col w-full md:w-1/4 p-8 gap-10">
                <Button onClick={() => setControls(!controls)}>Show/hide controls</Button>
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
                <Button onClick={() => player.playVideo()}>Play</Button>
                <Button onClick={() => player.pauseVideo()}>Pause</Button>
                <Button onClick={() => player.stopVideo()}>Stop</Button>
                <Button disabled>Fullscreen</Button>
            </div>
        </div>
    );
}

export default YoutubeIFrameAPI;
