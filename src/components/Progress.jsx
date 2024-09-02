export default function Progress({ highestScore, points, index, answer, questionsNum }) {
    return (
        <header className="m-5 progress">
            <progress max={questionsNum} value={index + Number(answer !== null) - 1} />
            <p>
                Question <strong>{index}</strong>/{questionsNum}
            </p>
            <p>
                <strong>{points}</strong> / {highestScore}
            </p>
        </header>
    );
}
