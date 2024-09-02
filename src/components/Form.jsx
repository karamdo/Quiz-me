import { useState, useRef } from "react";
import categories from "./categories";
import Button from "./Button";
import Params from "./Params";

const difficulty = [
    { id: "any", name: "ALL" },
    { id: "easy", name: "Easy" },
    { id: "medium", name: "Medium" },
    { id: "hard", name: "Hard" },
];
const type = [
    { id: "any", name: "Both" },
    { id: "multiple", name: "Multiple Choices" },
    { id: "boolean", name: "True/False" },
];

export default function Form({ dispatch }) {
    const message = useRef(null);
    const [params, setParams] = useState({
        number: "10",
        categories: "any",
        difficulty: "any",
        type: "any",
    });
    function handleSubmit(event) {
        event.preventDefault();
        if (!params.number || params.number == 0) {
            message.current.focus();
            message.current.style.outline = "1px solid red";
            return;
        }
        dispatch({
            type: "submit",
            payload: [params.number, params.categories, params.difficulty, params.type],
        });
    }
    function handleClear(event) {
        event.preventDefault();
        setParams({ number: "10", categories: "any", difficulty: "any", type: "any" });
    }

    return (
        <form className="h-[60%] w-[85%] mt-12 flex flex-col gap-8 justify-between text-2xl *:flex">
            <div>
                <label>number of questions : </label>
                <input
                    autoFocus
                    ref={message}
                    className="text-2xl text-black flex-1 rounded-lg px-2"
                    onChange={(e) =>
                        setParams((params) => ({
                            ...params,
                            number: isNaN(Number(e.target.value)) ? params.number : Number(e.target.value),
                        }))
                    }
                    value={params.number}
                />
            </div>
            <Params setParams={setParams} params={params} paramsName="difficulty" items={difficulty}>
                difficulty of questions :{" "}
            </Params>
            <Params paramsName="categories" setParams={setParams} params={params} items={categories}>
                category :{" "}
            </Params>
            <Params setParams={setParams} paramsName="type" params={params} items={type}>
                type of questions :{" "}
            </Params>
            <div className="justify-between">
                <Button className="hover:bg-secondary" onClick={handleClear}>
                    clear
                </Button>
                <Button className="hover:bg-secondary" onClick={handleSubmit}>
                    start
                </Button>
            </div>
        </form>
    );
}
