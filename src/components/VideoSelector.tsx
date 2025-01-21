import { useState } from "react";
import initialVideos from '../data/videos.json'
import styled from "styled-components";

interface Video {
    name: string
    code: string
}


function VideoSelector({playerRef}: {playerRef: {current: YT.Player | null} }) {

    
    const [videoList, setVideolist] = useState<Video[]>(initialVideos)


    const selectVideo = (index: number) => {
        if (playerRef.current) {
            playerRef.current.loadPlaylist(videoList[index].code);
            playerRef.current.setLoop(true)
        }   
    }

    return (
        <div className="ps-5">
            {videoList.map( (video, index) => (
                <div className="d-flex text-uppercase pb-1">
                    <div className="cursor-pointer magnify" key={index} onClick={()=>selectVideo(index)}>{video.name}</div>
                </div>
            ))}
        </div>
    )
}

export default VideoSelector