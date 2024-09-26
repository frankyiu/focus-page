import { useState } from "react";
import { Form } from "react-bootstrap";
import { FaPlay, FaStop } from "react-icons/fa";
import { IoMdVolumeHigh, IoMdVolumeOff } from "react-icons/io";

function ControlBar ({playerState, playerRef}:{playerState: number; playerRef:any} ) {

    const [volume, setVolume] = useState<number>(50);

    const toggleVideo = () => {
        if (!playerRef.current)
            return
        if (playerState === window.YT.PlayerState.PLAYING) {
            playerRef.current.stopVideo();
        } else {
            playerRef.current.playVideo();
        }
    };

    const handleChangeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        const volume = parseInt(e.target.value);
        changeVolume(volume);
    };

    const changeVolume = (volume: number) => {
        setVolume(volume);
        if (playerRef.current) {
            playerRef.current.setVolume(volume);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center p-4 gap-3">
          <div className="circle-button">
            {playerState === 1 ? (
              <FaStop
                className="cursor-pointer"
                size={24}
                color="white"
                onClick={toggleVideo}
              />
            ) : (
              <FaPlay
                className="cursor-pointer"
                size={24}
                color="white"
                onClick={toggleVideo}
              />
            )}
          </div>
          <div className="d-flex align-items-center gap-2">
            {volume > 0 ? (
              <IoMdVolumeHigh className="cursor-pointer" onClick={() => changeVolume(0)} size={24} />
            ) : (
              <IoMdVolumeOff className="cursor-pointer" onClick={() => changeVolume(50)} size={24} />
            )}
            <Form.Range value={volume} onChange={handleChangeVolume} />
          </div>
        </div>
      );

}

export default ControlBar;