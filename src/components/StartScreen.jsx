import { useEffect, useReducer, useCallback } from "react";
import Form from "./Form";
import Loader from "./Loader";

const initialState = {
    status: "start",
    number: "",
    category: "",
    difficulty: "",
    type: "",
};

const ActionTypes = {
    SUBMIT: "submit",
    FAILED: "failed",
};

function reducer(state, action) {
    switch (action.type) {
        case ActionTypes.SUBMIT:
            return {
                ...state,
                status: "loading",
                number: action.payload[0],
                category: action.payload[1],
                difficulty: action.payload[2],
                type: action.payload[3],
            };
        case ActionTypes.FAILED:
            return { ...state, status: "start" };
        default:
            throw new Error("Unknown action type");
    }
}

export default function StartScreen({ dispatch }) {
    const [{ status, number, category, difficulty, type }, formDispatch] = useReducer(reducer, initialState);

    const fetchTriviaData = useCallback(async () => {
        const cat = category !== "any" ? `&category=${category}` : "";
        const diff = difficulty !== "any" ? `&difficulty=${difficulty}` : "";
        const tp = type !== "any" ? `&type=${type}` : "";

        try {
            const res = await fetch(`https://opentdb.com/api.php?amount=${number}${cat}${diff}${tp}`);
            const data = await res.json();

            if (data.response_code === 0) {
                dispatch({ type: "start", payload: data.results });
            } else {
                formDispatch({ type: ActionTypes.FAILED });
            }
        } catch (error) {
            console.error("Fetch error:", error);
            formDispatch({ type: ActionTypes.FAILED });
        }
    }, [category, difficulty, number, type, dispatch]);

    useEffect(() => {
        if (status === "loading") {
            fetchTriviaData();
        }
    }, [status, fetchTriviaData]);

    return (
        <div className="flex flex-col items-center h-full">
            {status === "loading" ? (
                <Loader />
            ) : (
                <>
                    <h1 className="text-7xl">Welcome to Trivia Quiz</h1>
                    <Form dispatch={formDispatch} />
                </>
            )}
        </div>
    );
}
