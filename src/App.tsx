import "./App.css";
import Todo from "./components/Todo";
import { FaPlay } from "react-icons/fa";
import { FaStop } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { IoMdVolumeHigh } from "react-icons/io";
import { IoMdVolumeOff } from "react-icons/io";
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
                videoId: "jfKfPfyJRdk",
                playerVars: { autoplay: 1, controls: 0 },
                events: {
                    'onReady': (event: any) => { event.target.playVideo(); },
                    'onStateChange': (event: any) => {setPlayerState(event.data)}
                },
            });
        };
    }, []);

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
                    <div className="ms-5"><Timer minutes={25} seconds={0} /></div>
                </div>
                <div className="col-4">
                    {/* <div className="IconSession">
                        <div className="inline-block">
                            <div className="d-flex flex-column align-items-center">
                                <FaPlay color="white" />
                                <div className="mt-2">focus</div>
                            </div>
                        </div>
                        <Timer minutes={25} seconds={0} />
                    </div> */}
                    <div className="TodoSession mt-5">
                        <Todo />
                    </div>
                </div>
            </div>
            <div className="fixed-bottom">
                <ControlBar playerState={playerState} playerRef={playerRef}/>
            </div>
        </div>
    );
}

export default App;
