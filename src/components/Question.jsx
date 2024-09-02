import Options from "./Options";

export default function Question({ question, setCorrect, index, correct }) {
    return (
        <div className=" m-5">
            <div
                className="bg-secondary mb-12 rounded-lg border border-font p-3"
                dangerouslySetInnerHTML={{ __html: `${index}. ${question.question}` }}
            ></div>
            <div>
                <Options question={question} setCorrect={setCorrect} correct={correct} />
            </div>
            <div></div>
        </div>
    );
}
