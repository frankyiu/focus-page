import { useEffect, useState } from "react";
import "./Timer.css";

function Timer({ hours = 0, minutes = 0, seconds = 0 }) {
    const [time, setTime] = useState({
        hours: hours,
        minutes: minutes,
        seconds: seconds,
    });

    const [stop, setStop] = useState(true)

    useEffect(() => {
        const updateTimer = ()=>{
            const {hours, minutes, seconds} = time
            if (seconds>0){
                setTime({hours, minutes, seconds: seconds - 1})
            }else if (minutes >0) {
                setTime({hours, minutes: minutes-1, seconds: 59})
            }else if (hours>0) {
                setTime({hours: hours-1, minutes: 59, seconds: 59})
            }
        }
        if (!stop) {
            const timer =  setTimeout(updateTimer, 1000);
            return () => clearTimeout(timer)
        }
    }, [stop, time]);



    return (
        <div className="Timer">
            {time.hours}:{time.minutes}:{time.seconds}
            <button onClick={()=>setStop(!stop)}>Stop</button>
        </div>
    );
}

export default Timer;
