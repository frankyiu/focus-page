import "./App.css";
import Todo from "./components/Todo";
import { FaPlay } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import ControlBar from "./components/ControlBar";
import Timer from "./components/Timer";
import VideoSelector from "./components/VideoSelector";
import VideoAdder from "./components/VideoAdder";

declare global {
    interface Window {
        onYouTubeIframeAPIReady: any;
        playerRef: any;
    }
}

function App() {
    // const initialVideo = 'g36q0ZLvygQ'
    const initialVideo = 'jfKfPfyJRdk'
    const playerRef = useRef<YT.Player| null>(null);

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
                videoId: initialVideo,
                playerVars: { autoplay: 0, controls: 0, cc_load_policy: 0},
                events: {
                    'onReady': (event: any) => { event.target.playVideo(); },
                    'onStateChange': (event: any) => {setPlayerState(event.data)}
                },
            });
            window.playerRef = playerRef.current;
        };

        return () => {
            if (playerRef.current) 
                playerRef.current.destroy();
        }
        
    }, []);
 
    // const onVideoIdChange = (event: { target: { value: any; }; }) => {
    //     const newVideoId = event.target.value;
    //     setVideoId(newVideoId);
    //     if (playerRef.current) {
    //       playerRef.current.loadVideoById({videoId: newVideoId});
    //     }
    // };
    

    return (
        <div className="App container-fluid ">
            <div className="background">
                <div className={`background-frame`}>
                   <div className={`text-center align-content-center h-100 ${playerState !== 3 && 'd-none'}`}>buffering...</div> 
                </div>
                <div>
                    <div id="player"></div>
                </div>
            </div>
            <div className="row">
                <div className="col-3 p-5">
                    <div className="fs-1 mb-2">LOFI-FOCUS</div>
                    <VideoSelector playerRef={playerRef}/>
                </div>
                <div className="col-5"/>
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
