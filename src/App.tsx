import "./App.css";
import Todo from "./components/Todo";
import { FaPlay } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import ControlBar from "./components/ControlBar";
import Timer from "./components/Timer";

declare global {
    interface Window {
        onYouTubeIframeAPIReady: any;
        YT: any;
    }
}

function App() {
    const playerRef = useRef<any>(null);

    const [videoId, setVideoId] = useState<string>('jfKfPfyJRdk');
    const [playerState, setPlayerState] = useState<number>(-1);

    useEffect(() => {
        var tag = document.createElement("script");
        tag.id = "iframe-demo";
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName("script")[0];
        if (firstScriptTag && firstScriptTag.parentNode)
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        window.onYouTubeIframeAPIReady = () => {
            playerRef.current = new window.YT.Player("player", {
                videoId: videoId,
                playerVars: { autoplay: 1, controls: 0 },
                events: {
                    'onReady': (event: any) => { event.target.playVideo(); },
                    'onStateChange': (event: any) => {setPlayerState(event.data)}
                },
            });
        };
        
    }, [videoId]);

    return (
        <div className="App container-fluid ">
            <div className="background">
                <div className={`background-frame ${playerState !== 1 && 'bg-black'}`}>
                   <div className={`text-center align-content-center h-100 ${playerState !== 3 && 'd-none'}`}>buffering...</div> 
                </div>
                <div className={`${playerState === 1? '' : 'd-none'}`} >
                    <div id="player"></div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="p-5 fs-1">LOFI-FOCUS</div>
                    {/* <input value={videoId} onChange={(e)=>setVideoId(e.target.value)}></input> */}
                </div>
                <div className="col-4">
                    <div className="TodoSession mt-5">
                        <Todo />
                    </div>
                </div>
            </div>
            <div className="fixed-bottom d-flex justify-content-center align-items-center">
                <div className=""><ControlBar playerState={playerState} playerRef={playerRef}/></div>
                <div className="position-absolute end-0 me-5">
                <Timer workTime={25 } breakTime={5}/>
                </div>
            </div>
        </div>
    );
}

export default App;
