import { useEffect } from "react";

function Timer({ dispatch, timeRemaining }) {
    const min = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;

    useEffect(() => {
        const timerId = setInterval(() => dispatch({ type: "tick" }), 1000);

        return () => clearInterval(timerId);
    }, [dispatch]);

    return (
        <button className="btn btn-ui timer">{min < 10 && "0"}{min}:{seconds < 10 && "0"}{seconds}</button>
    )
}

export default Timer;
