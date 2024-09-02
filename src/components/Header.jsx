import Button from "./Button";

export default function Header({ dispatch }) {
    function handleClick() {
        dispatch({ type: "reset" });
    }
    return (
        <div>
            <div className="flex justify-between items-center">
                <h1 className="text-6xl">Quiz Me</h1>
                <Button className="text-2xl h-[80%] hover:bg-secondary" onClick={handleClick}>
                    Restart Quiz
                </Button>
            </div>
            <hr />
        </div>
    );
}
