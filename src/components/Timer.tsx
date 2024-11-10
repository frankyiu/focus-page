import { useEffect, useRef, useState } from "react";
import "./Timer.css";
import { ProgressBar } from "react-bootstrap";
import { FaPause, FaPlay, FaStop } from "react-icons/fa";

function Timer({ workTime = 0, breakTime = 0, play = false }) {

    const formatTimeStr = (unit: number) => {
        return unit.toString().padStart(2, "0");
    };

    const toTime = (minutes: number, seconds: number = 0) => {
        return minutes*60 + seconds
    }

    const toMinute = (time: number) => {
        return Math.floor(time / 60)
    }

    const toSecond = (time: number) => {
        return time % 60
    }

    const resetTimer = () => {
        setTime(toTime(isWorkMode?  breakTime: workTime))
        setIsWorkMode(!isWorkMode)
        setCounter(counter+1)
        setStart(false);
    }

    const [time, setTime] = useState<number>(toTime(workTime));
    const [counter, setCounter] = useState<number>(1)
    const [isWorkMode, setIsWorkMode] = useState<boolean>(true);
    const [start, setStart] = useState(play);
    // const audioRef = useRef(new Audio(require('../assets/alarm.mp3')));
    // new Audio(require('../assets/alarm.mp3')).play()

    useEffect(() => {
        const updateTimer = () => {
            setTime((pre) => {
                if (pre > 0) 
                    return pre-1;
                resetTimer()
                new Audio(require('../assets/alarm.mp3')).play()
                return pre;
            });
        };

        if (start) {
            const timer = setInterval(updateTimer, 1000);
            return () => clearInterval(timer);
        }
    }, [start]);

    return (
        <div className="Timer">
            <div className="d-flex align-items-center gap-4"> 
                {start? 
                <FaPause  className="cursor-pointer" size={20} onClick={()=> setStart(!start)}/>
                :
                <FaPlay  className="cursor-pointer" size={20} onClick={()=> setStart(!start)}/>
                }
                <div className="clock">
                    {isWorkMode?  <div>Pomodoro#{counter}</div>: <div>Break time</div> }
                    <div className="fs-1 fw-bold lh-1">{`${formatTimeStr(toMinute(time))}:${formatTimeStr(toSecond(time))}`}</div>
                    <div className="d-flex align-items-center gap-1">
                        <div className="d-block w-100">
                            <ProgressBar now={toTime(isWorkMode? workTime: breakTime)-time} max={toTime(isWorkMode?workTime: breakTime)}/>
                        </div>
                        <small style={{minWidth: '4ch'}}>{Math.floor((1-time/toTime(isWorkMode? workTime: breakTime))*100)}%</small>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Timer;
