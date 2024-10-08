import { useEffect, useState } from "react";
import "./Timer.css";
import { ProgressBar } from "react-bootstrap";
import { FaPlay } from "react-icons/fa";

function Timer({ minutes = 0, seconds = 0 }) {


    const formatTimeStr = (unit: number) => {
        return unit.toString().padStart(2, "0");
    };

    const toTime = (minutes: number, seconds: number) => {
        return minutes*60 + seconds
    }

    const toMinute = (time: number) => {
        return Math.floor(time / 60)
    }

    const toSecond = (time: number) => {
        return time % 60
    }

    const [time, setTime] = useState<number>(toTime(minutes, seconds));
    const [stop, setStop] = useState(true);

    useEffect(() => {
        const updateTimer = () => {
            setTime((pre) => {
                if (pre > 0) 
                    return pre-1;
                setStop(true);
                return pre;
            });
        };

        if (!stop) {
            updateTimer();
            const timer = setInterval(updateTimer, 1000);
            return () => clearInterval(timer);
        }
    }, [stop]);

    return (
        <div className="Timer">
            {stop?
            <div className="d-flex flex-column align-items-center cursor-pointer" onClick={() => setStop(!stop)}>
                <FaPlay color="white" />
                <div className="mt-2">focus</div>
            </div>
            :
            <div>
                <div className="fs-1 fw-bold">{`${formatTimeStr(toMinute(time))}:${formatTimeStr(toSecond(time))}`}</div>
                <div className="d-flex align-items-center gap-1">
                    <div className="d-block w-100">
                        <ProgressBar now={toTime(minutes, seconds)-time} max={toTime(minutes, seconds)}/>
                    </div>
                    <small>{Math.floor((1-time/toTime(minutes, seconds))*100)}%</small>
                </div>
                {/* <button onClick={() => setStop(!stop)}>{stop? 'Start': 'Stop'}</button> */}
            </div>
            }
        </div>
    );
}

export default Timer;
