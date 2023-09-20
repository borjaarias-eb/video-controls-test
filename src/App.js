import {useState} from "react";
import Button from "./Button";
import YoutubeIFrame from "./YoutubeIFrame";
import YoutubeIFrameAPI from "./YoutubeIFrameAPI";

const buildUrl = (baseUrl, params) => {
    const url = new URL(baseUrl);
    for (let [key, value] of Object.entries(params)) {
        console.log(key, value);
        if (![null, undefined].includes(value)) {
            url.searchParams.set(key, `${value}`);
        }
    }
    console.log(url.toString());
    return url.toString();
}

const pages = {
    iframe: YoutubeIFrame,
    iframeapi: YoutubeIFrameAPI,
}

function App() {
    const [current, setCurrent] = useState('iframe');

    const CurrentElement = pages[current];
    return (
        <div>
            <div>
                <Button onClick={() => setCurrent('iframe')}>IFrame</Button>
                <Button onClick={() => setCurrent('iframeapi')}>iFrameAPI</Button>
            </div>
            <CurrentElement />
        </div>
    )
}

export default App;
