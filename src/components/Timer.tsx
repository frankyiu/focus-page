import { memo, useCallback, useEffect, useRef, useState } from "react";
import "./Timer.css";
import { ProgressBar } from "react-bootstrap";
import PushButton from "./PushButton";

function Timer({ workTime = 0, breakTime = 0, play = false }) {
    
    const initialPlay = play

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


    const [time, setTime] = useState<number>(toTime(workTime));
    const [counter, setCounter] = useState<number>(1)
    const [isWorkMode, setIsWorkMode] = useState<boolean>(true);
    const [isStart, setIsStart] = useState<boolean>(initialPlay);
    
    const timerRef = useRef<NodeJS.Timer>()


    const startTimer = () => {
        const updateTimer = () => {
            setTime((pre) => Math.max(0, pre-1));
        };
        const intervalId = setInterval(updateTimer, 1000);
        timerRef.current = intervalId      
        setIsStart(true)
    }

    const stopTimer = () => {
        const intervalId = timerRef.current;
        clearInterval(intervalId);
        setIsStart(false)
    }

    useEffect(()=>{
     if (initialPlay) 
        startTimer()
     return stopTimer
    }, [initialPlay])

    const memoizedToggleTimer = useCallback(()=> isStart ? stopTimer() : startTimer(), [isStart])


    return (
        <div className="Timer">
            <div className="d-flex align-items-center gap-4"> 
                <PushButton active={isStart} onClick={memoizedToggleTimer}>
                    {isStart? 'PAUSE': 'START'}
                </PushButton>
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
