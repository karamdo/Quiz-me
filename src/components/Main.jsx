import { useState } from "react";
import Header from "./Header";
import Question from "./question";
import Button from "./Button";
import Timer from "./Timer";
import Progress from "./Progress";
import { useQuiz } from "../context/QuizContext";

export default function Main() {
    const { dispatch, questionsNum, index, questions } = useQuiz();
    const question = questions[index];
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
            <Header />
            <Progress />
            <Question setCorrect={setCorrect} question={question} dispatch={dispatch} correct={correct} />
            <div className="flex justify-between">
                <Timer dispatch={dispatch} />
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
