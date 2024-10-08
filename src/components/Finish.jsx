import { useQuiz } from "../context/QuizContext";
import Header from "./Header";

export default function Finish() {
    const { highestScore, points, record } = useQuiz();
    return (
        <div className="w-[80%]">
            <Header />
            <div className="text-center">
                <h1 className="text-4xl mt-10 p-8 border border-font rounded-full bg-secondary">
                    Congrats on ending the Quiz your final score is {points} from {highestScore} (
                    {Math.ceil((points * 100) / highestScore)}%)
                </h1>
                <p className="mt-5 text-xl">(Highest Score : {record})</p>
            </div>
        </div>
    );
}
