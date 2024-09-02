import { useState } from "react";
import Header from "./Header";
import Question from "./question";
import Button from "./Button";
import Timer from "./Timer";
import Progress from "./Progress";

export default function Main({
    dispatch,
    question,
    index,
    questionsNum,
    highestScore,
    points,
    secondsRemaining,
}) {
    const [correct, setCorrect] = useState(null);
    let point = 0;
    if (correct === "true") {
        if (question.difficulty === "easy") point = 10;
        else if (question.difficulty === "hard") point = 30;
        else point = 20;
    }

    function handleClick() {
        dispatch({ type: "answer", payload: point });
        setCorrect(null);
    }
    return (
        <div className="text-2xl w-[80%] flex-1">
            <Header dispatch={dispatch} />
            <Progress
                highestScore={highestScore}
                points={point + points}
                index={index}
                answer={correct}
                questionsNum={questionsNum}
            />
            <Question
                setCorrect={setCorrect}
                question={question}
                dispatch={dispatch}
                index={index}
                correct={correct}
            />
            <div className="flex justify-between">
                <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
                {correct && (
                    <Button
                        className={"rounded-full text-3xl self-center hover:bg-secondary"}
                        onClick={handleClick}
                    >
                        {questionsNum === index ? "finish" : "next"}
                    </Button>
                )}
            </div>
        </div>
    );
}
