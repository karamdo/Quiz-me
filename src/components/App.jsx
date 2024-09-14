import StartScreen from "./StartScreen";
import Main from "./Main";
import Finish from "./Finish";
import { useQuiz } from "../context/QuizContext";

export default function App() {
    const { status, dispatch } = useQuiz();
    return (
        <div className="bg-primary font-mono text-font min-h-screen h-full flex flex-col items-center p-2">
            {status === "ready" && <StartScreen dispatch={dispatch} />}
            {status === "start" && <Main />}
            {status === "finish" && <Finish />}
        </div>
    );
}
