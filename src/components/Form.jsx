import { useState, useRef, useEffect } from "react";
import categories from "./categories";
import Button from "./Button";
import Params from "./Params";

const DEFAULT_PARAMS = {
    number: "10",
    categories: "any",
    difficulty: "any",
    type: "any",
};

const difficultyOptions = [
    { id: "any", name: "ALL" },
    { id: "easy", name: "Easy" },
    { id: "medium", name: "Medium" },
    { id: "hard", name: "Hard" },
];

const typeOptions = [
    { id: "any", name: "Both" },
    { id: "multiple", name: "Multiple Choices" },
    { id: "boolean", name: "True/False" },
];

export default function Form({ dispatch }) {
    const messageRef = useRef(null);
    const [params, setParams] = useState(DEFAULT_PARAMS);

    useEffect(() => {
        if (!params.number || params.number == 0) {
            messageRef.current.focus();
            messageRef.current.style.outline = "1px solid red";
        }
    }, [params.number]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!params.number || params.number == 0) {
            return;
        }
        dispatch({
            type: "submit",
            payload: [params.number, params.categories, params.difficulty, params.type],
        });
    };

    const handleClear = (event) => {
        event.preventDefault();
        setParams(DEFAULT_PARAMS);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setParams((prevParams) => ({
            ...prevParams,
            [name]: value,
        }));
    };

    return (
        <form className="h-[60%] w-[85%] mt-12 flex flex-col gap-8 justify-between text-2xl *:flex">
            <div>
                <label htmlFor="number">Number of questions:</label>
                <input
                    id="number"
                    autoFocus
                    ref={messageRef}
                    className="text-2xl text-black flex-1 rounded-lg px-2"
                    onChange={handleChange}
                    value={params.number}
                    name="number"
                />
            </div>
            <Params setParams={setParams} params={params} paramsName="difficulty" items={difficultyOptions}>
                Difficulty of questions:
            </Params>
            <Params setParams={setParams} params={params} paramsName="categories" items={categories}>
                Category:
            </Params>
            <Params setParams={setParams} params={params} paramsName="type" items={typeOptions}>
                Type of questions:
            </Params>
            <div className="flex justify-between">
                <Button className="hover:bg-secondary" onClick={handleClear}>
                    Clear
                </Button>
                <Button className="hover:bg-secondary" onClick={handleSubmit}>
                    Start
                </Button>
            </div>
        </form>
    );
}
