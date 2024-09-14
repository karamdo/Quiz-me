import { useEffect } from "react";
import { useQuiz } from "../context/QuizContext";

export default function Timer({ dispatch }) {
    const { secondsRemaining } = useQuiz();
    const min = Math.floor(secondsRemaining / 60);
    const sec = secondsRemaining % 60;

    useEffect(() => {
        const id = setInterval(() => dispatch({ type: "tick" }), 1000);
        return () => clearInterval(id);
    }, [dispatch]);

    return (
        <div className="border rounded-full px-3 py-1 text-3xl self-center">
            {min < 10 && "0"}
            {min}:{sec < 10 && "0"}
            {sec}
        </div>
    );
}
