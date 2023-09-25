import {useState} from "react";
import Button from "./Button";
import YoutubeIFrame from "./YoutubeIFrame";
import YoutubeIFrameAPI from "./YoutubeIFrameAPI";
import Vimeo from "./Vimeo";
import Instagram from "./Instagram";

const ytPages = {
    iframe: YoutubeIFrame,
    iframeapi: YoutubeIFrameAPI,
}

const vimeoPages = {
    iframe: Vimeo
}

const instagramPages = {
    iframe: Instagram
}

const pages = {
    yt: ytPages,
    vimeo: vimeoPages,
    instagram: instagramPages
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

const instagramConfig = {
    normal: {
        url: 'https://scontent-mad2-1.cdninstagram.com/o1/v/t16/f1/m82/DC4A3EBF6EA06909A9ADD821125213B9_video_dashinit.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6InZ0c192b2RfdXJsZ2VuLmNsaXBzLnVua25vd24tQzMuNzIwLmRhc2hfYmFzZWxpbmVfMV92MSJ9&_nc_ht=scontent-mad2-1.cdninstagram.com&_nc_cat=107&vs=1668381510336542_2932646398&_nc_vs=HBksFQIYT2lnX3hwdl9yZWVsc19wZXJtYW5lbnRfcHJvZC9EQzRBM0VCRjZFQTA2OTA5QTlBREQ4MjExMjUyMTNCOV92aWRlb19kYXNoaW5pdC5tcDQVAALIAQAVABgkR0RZbW9CWlZFdXZvZ2pnQkFBMkRVZDdNeEFCamJxX0VBQUFGFQICyAEAKAAYABsBiAd1c2Vfb2lsATEVAAAm1pHhgZv1pUAVAigCQzMsFz%2F%2BGJN0vGp%2FGBJkYXNoX2Jhc2VsaW5lXzFfdjERAHUAAA%3D%3D&ccb=9-4&oh=00_AfArKuRtXEwWQTWKxlWqMZkszQT5-fZnzI7BMcxM_CYq8w&oe=650F2701&_nc_sid=1d576d&_nc_rid=36fde570f0',
    }
}

const playersConfig = {
    yt: videoConfig,
    vimeo: vimeoConfig,
    instagram: instagramConfig
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
                <Button onClick={() => setPlayer('instagram')}>Instagram</Button>
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
