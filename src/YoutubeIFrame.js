import {useState} from "react";

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

function YoutubeIFrame() {
    const [controls, setControls] = useState(false);
    const [end, setEnd] = useState(null);
    const [start, setStart] = useState(null);
    return (
        <div className="App">
            <div className="p-8 float-left">
                <iframe
                    id="ytplayer"
                    type="text/html"
                    width="640"
                    height="360"
                    src={buildUrl(
                        "https://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1&mute=1",
                        {
                            controls: controls ? 1 : 0,
                            end,
                            fs: controls ? 1 : 0,
                            start
                        })}
                    autoplay={1}
                    end={end ? end : undefined}
                    start={start ? start : undefined}
                    allow="autoplay"
                    allowFullScreen
                />
            </div>
            <div className="flex flex-col w-1/4 p-8 gap-10">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded" onClick={() => setControls(!controls)}>Show/hide controls</button>
                <label className="flex flex-row">
                    Start at second:
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" onChange={({ target: { value }}) => setStart(value)} />
                    <button className="px-4 shadow border border-l-0" onClick={() => setStart(null)}>X</button>
                </label>
                <label className="flex flex-row">
                    End at second:
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" onChange={({ target: { value }}) => setEnd(value)} />
                    <button className="px-4 shadow border border-l-0" onClick={() => setEnd(null)}>X</button>
                </label>
            </div>
        </div>
    );
}

export default YoutubeIFrame;
