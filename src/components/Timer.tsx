import { useEffect, useState } from "react";
import "./Timer.css";

function Timer({minutes = 0, seconds = 0 }) {
    const [time, setTime] = useState({
        minutes: minutes,
        seconds: seconds,
    });

    const [stop, setStop] = useState(true);

    const formatTime = (unit: number) => {
       return unit.toString().padStart(2, '0')
    }

    useEffect(() => {
        const updateTimer = () => {
            setTime((pre) => {
                const { minutes, seconds } = pre;
                if (seconds > 0) {
                    return { minutes, seconds: seconds - 1 }
                } else if (minutes > 0) {
                    return { minutes: minutes - 1, seconds: 59 };
                }
                setStop(true)
                return pre
            });
        };

        if (!stop) {
            updateTimer()
            const timer = setInterval(updateTimer, 1000);
            return () => clearInterval(timer);
        }
    }, [stop]);

    return (
        <div className="Timer">
            {`${formatTime(time.minutes)}:${formatTime(time.seconds)}`}
            <button onClick={() => setStop(!stop)}>{stop? 'Start': 'Stop'}</button>
        </div>
    );
}

export default Timer;
