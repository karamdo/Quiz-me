import { useQuiz } from "../context/QuizContext";

export default function Progress({ answer }) {
    const { highestScore, points, index, questionsNum } = useQuiz();
    console.log(answer);
    return (
        <header className="m-5 progress">
            <progress max={questionsNum} value={index} />
            <p>
                Question <strong>{index + 1}</strong>/{questionsNum}
            </p>
            <p>
                <strong>{points}</strong> / {highestScore}
            </p>
        </header>
    );
}
