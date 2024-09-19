import YouTube from "react-youtube";
import "./App.css";
import Timer from "./components/Timer";
import Todo from "./components/Todo";
import { FaPlay } from "react-icons/fa";
import { FaStop } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";



declare global {
    interface Window {
        onYouTubeIframeAPIReady: any
        YT: any
    }
}


function App() {

    const playerRef = useRef<any>(null);

    const [volume, setVolume] = useState<number>(50);
    const [playing, setPlaying] = useState<boolean>(false);


    const toggleVideo = () => {
        if (!playing) {
            playerRef.current.playVideo()
        } else {
            playerRef.current.stopVideo()
        }
        setPlaying(!playing)
    }

    const changeVolume = (e:React.ChangeEvent<HTMLInputElement>) => {
        const volume = parseInt(e.target.value)
        setVolume(volume)
        if (playerRef.current) {
            playerRef.current.setVolume(volume)
        }
    }

    useEffect(() => {
        var tag = document.createElement('script');
        tag.id = 'iframe-demo';
        tag.src = 'https://www.youtube.com/iframe_api';
        var firstScriptTag = document.getElementsByTagName('script')[0];
        if (firstScriptTag && firstScriptTag.parentNode)
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        window.onYouTubeIframeAPIReady = ()=>{
            playerRef.current = new window.YT.Player('player', {
                videoId: 'jfKfPfyJRdk',
                playerVars: { 'autoplay': 1, 'controls': 0},
                events: {
                    'onReady': (event:any)=>{event.target.playVideo()},
                }
            })
        }
    }, [])

    


    return (
        <div className="App container-fluid ">
            {/* <div className="background">
                <div className="player" id="player"></div>
            </div> */}
            <div className="background">
                <div className="background-frame"></div>
                <div id='player'> </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="p-5 fs-1">LOFI-FOCUS</div>
                </div>
                <div className="col-4">
                    <div className="IconSession">
                        <div className="inline-block">
                            <div className="d-flex flex-column align-items-center">
                                <FaPlay color="white" />
                                <div className="mt-2">focus</div>
                            </div>
                        </div>
                        {/* <Timer minutes={25} seconds={0} /> */}
                    </div>
                    <div className="TodoSession">
                        <Todo />
                    </div>
                </div>
            </div>
            <div className="fixed-bottom d-flex justify-content-center align-items-center p-4 gap-3">
                <div className="circle-button">
                {
                    playing? 
                    <FaStop className="cursor-pointer" size={24} color="white" onClick={toggleVideo}></FaStop>:
                    <FaPlay className="cursor-pointer" size={24} color="white" onClick={toggleVideo}></FaPlay>
                }
                </div>
                <div>
                    <Form.Range value={volume} onChange={changeVolume}/>
                </div>
            </div>
        </div>
    );
}

export default App;
