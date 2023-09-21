import {useState} from "react";
import Button from "./Button";
import YoutubeIFrame from "./YoutubeIFrame";
import YoutubeIFrameAPI from "./YoutubeIFrameAPI";
import Vimeo from "./Vimeo";

const ytPages = {
    iframe: YoutubeIFrame,
    iframeapi: YoutubeIFrameAPI,
}

const vimeoPages = {
    iframe: Vimeo
}

const pages = {
    yt: ytPages,
    vimeo: vimeoPages
}

const videoConfig = {
    short: {
        id: 'OIibXW2JS3A',
        w: 360,
        h: 640
    },
    normal: {
        id: 'M7lc1UVf-VE',
        w: 640,
        h: 360
    }
}

const vimeoConfig = {
    normal: {
        id: '199748380',
        w: 640,
        h: 360
    }
}

const playersConfig = {
    yt: videoConfig,
    vimeo: vimeoConfig
}

function App() {
    const [implementation, setImplementation] = useState('iframe');
    const [video, setVideo] = useState('normal');
    const [player, setPlayer] = useState('yt');

    const videoTypes = Object.keys(playersConfig[player]);
    const implementationTypes = Object.keys(pages[player]);
    const CurrentElement = pages[player][implementation];
    return (
        <div>
            <div className="flex gap-5 items-center mb-5">
                Provider:
                <Button onClick={() => setPlayer('yt')}>Youtube</Button>
                <Button onClick={() => setPlayer('vimeo')}>Vimeo</Button>
            </div>
            <div className="flex gap-5 items-center mb-5">
                type of video:
                {videoTypes.map((type) =>
                    <Button onClick={() => setVideo(type)}>{type}</Button>
                )}
            </div>
            <div className="flex gap-5 items-center mb-5">
                implementation type:
                {implementationTypes.map((type) =>
                    <Button onClick={() => setImplementation(type)}>{type}</Button>
                )}
            </div>
            <CurrentElement config={playersConfig[player][video]}/>
        </div>
    )
}

export default App;
