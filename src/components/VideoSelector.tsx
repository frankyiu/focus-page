import { useState } from "react";
import initialVideos from '../data/videos.json'
import styled from "styled-components";
import VideoAdder from "./VideoAdder";


function VideoSelector({playerRef}: {playerRef: {current: YT.Player | null} }) {

    const [isShowAdder, setIsShowAdder] = useState<boolean>(false)
    const [videoList, setVideoList] = useState<Video[]>(initialVideos)


    const selectVideo = (index: number) => {
        if (playerRef.current) {
            playerRef.current.loadPlaylist(videoList[index].code);
            playerRef.current.setLoop(true)
        }   
    }

    const addVideo = (newVideo: Video) => {
        setVideoList([...videoList, newVideo])
        setIsShowAdder(false)
    }


    return (
        <div>
            {isShowAdder? 
            <VideoAdder onSubmitEvent={addVideo} onExitEvent={()=>{setIsShowAdder(false)}}/>
            :
            <div>
                {videoList.map( (video, index) => (
                    <div className="d-flex text-uppercase pb-1"  key={index}>
                        <div className="cursor-pointer magnify" onClick={()=>selectVideo(index)}>{video.name}</div>
                    </div>
                ))}
                <div className="d-flex">
                    <div className="cursor-pointer magnify" onClick={()=>setIsShowAdder(true)}>+ Add New Video</div>
                </div>
            </div>
            }
        </div>
    )
}

export default VideoSelector