import { useQuiz } from "../context/QuizContext";
import Options from "./Options";

export default function Question({ question, setCorrect, correct }) {
    const { index } = useQuiz();
    return (
        <div className=" m-5">
            <div
                className="bg-secondary mb-12 rounded-lg border border-font p-3"
                dangerouslySetInnerHTML={{ __html: `${index + 1}. ${question.question}` }}
            ></div>
            <div>
                <Options question={question} setCorrect={setCorrect} correct={correct} />
            </div>
            <div></div>
        </div>
    );
}
