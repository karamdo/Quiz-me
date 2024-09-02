import { useState } from "react";
import Button from "./Button";

export default function Options({ question, setCorrect, correct }) {
    const [option, setOption] = useState(null);
    const correct_answer = question?.correct_answer;
    const answers =
        question.type === "boolean"
            ? ["True", "False"]
            : [correct_answer, ...question.incorrect_answers];

    function handleClick(e) {
        setOption(e.target.textContent);
        setCorrect(correct_answer === e.target.textContent ? "true" : "false");
    }

    return (
        <div className="flex flex-col gap-3 *:rounded-full w-[60%] *:py-2">
            {answers.sort().map((element, index) => {
                return (
                    <Button
                        className={`${
                            correct
                                ? element === option
                                    ? "translate-x-[1rem]"
                                    : ""
                                : "hover:translate-x-[1rem]"
                        } text-start px-8 ${
                            correct ? (element === correct_answer ? "green" : "yellow") : "bg-cards"
                        }`}
                        key={index}
                        onClick={handleClick}
                        disabled={correct ? true : false}
                    >
                        {element}
                    </Button>
                );
            })}
        </div>
    );
}
