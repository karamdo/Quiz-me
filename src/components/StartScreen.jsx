import { useEffect, useReducer } from "react";
import Form from "./Form";
import Loader from "./Loader";

const initialState = {
    status: "start",
    number: "",
    category: "",
    difficulty: "",
    type: "",
};

function reducer(state, action) {
    switch (action.type) {
        case "submit":
            return {
                status: "loading",
                number: action.payload[0],
                category: action.payload[1],
                difficulty: action.payload[2],
                type: action.payload[3],
            };
        case "failed": {
            return { ...state, status: "start" };
        }
        default:
            console.log("NO ACTION");
    }
}

export default function StartScreen({ dispatch }) {
    const [{ status, number, category, difficulty, type }, formDispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        if (status === "loading") {
            const cat = category !== "any" ? `&category=${category}` : "";
            const diff = difficulty !== "any" ? `&difficulty=${difficulty}` : "";
            const tp = type !== "any" ? `&type=${type}` : "";
            console.log(`https://opentdb.com/api.php?amount=${number}${cat}${diff}${tp}`);
            async function Fetch() {
                try {
                    const res = await fetch(`https://opentdb.com/api.php?amount=${number}${cat}${diff}${tp}`);
                    const data = await res.json();
                    if (data.response_code == 0) dispatch({ type: "start", payload: data.results });
                    else {
                        formDispatch({ type: "failed" });
                    }
                } catch {
                    formDispatch({ type: "failed" });
                }
            }
            Fetch();
        }
    }, [category, difficulty, number, status, type, dispatch]);

    return (
        <div className="flex flex-col items-center h-full ">
            {status === "loading" ? (
                <Loader />
            ) : (
                <>
                    <h1 className="text-6xl">Welcome to trivia quiz bitch</h1>
                    <Form dispatch={formDispatch} />
                </>
            )}
        </div>
    );
}
