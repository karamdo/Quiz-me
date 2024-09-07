import { useReducer } from "react";
import StartScreen from "./StartScreen";
import Main from "./Main";
import Finish from "./Finish";

const SEC_PER_QUESTION = 30;

const initialState = {
    questions: [],
    // ready start finish failed
    status: "ready",
    questionsNum: null,
    index: 0,
    highestScore: 0,
    secondsRemaining: 0,
    points: 0,
    record: 0,
};

function reducer(state, action) {
    switch (action.type) {
        case "start":
            return {
                ...state,
                status: "start",
                questions: action.payload,
                questionsNum: action.payload.length,
                highestScore: action.payload.reduce((prev, cur) => {
                    prev += cur.difficulty === "easy" ? 10 : cur.difficulty === "hard" ? 30 : 20;
                    return prev;
                }, 0),
                secondsRemaining: SEC_PER_QUESTION * action.payload.length,
            };
        case "answer":
            return {
                ...state,
                index: state.index + 1,
                points: state.points + action.payload,
            };
        case "finish":
            return {
                ...state,
                status: "finish",
                index: 0,
                record: Math.max(state.record, state.points),
            };
        case "reset":
            return {
                ...initialState,
                record: state.record,
            };
        case "tick":
            if (state.secondsRemaining === 0)
                return {
                    ...state,
                    status: "finish",
                };
            return {
                ...state,
                secondsRemaining: state.secondsRemaining - 1,
            };
    }
}

export default function App() {
    const [
        { questions, status, questionsNum, index, highestScore, secondsRemaining, points, record },
        dispatch,
    ] = useReducer(reducer, initialState);

    if (index === questionsNum) {
        dispatch({ type: "finish" });
    }
    return (
        <div className="bg-primary font-mono text-font min-h-screen h-full flex flex-col items-center p-2">
            {status === "ready" && <StartScreen dispatch={dispatch} />}
            {status === "start" && (
                <Main
                    dispatch={dispatch}
                    question={questions[index]}
                    index={index + 1}
                    questionsNum={questionsNum}
                    highestScore={highestScore}
                    points={points}
                    secondsRemaining={secondsRemaining}
                />
            )}
            {status === "finish" && (
                <Finish highestScore={highestScore} points={points} record={record} dispatch={dispatch} />
            )}
        </div>
    );
}
