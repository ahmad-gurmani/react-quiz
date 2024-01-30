function FinishScreen({ points, totalPoints, highScore, dispatch }) {
    const percentage = (points / totalPoints) * 100;

    let emoji;
    if (percentage === 100) emoji = "🥇";
    if (percentage >= 80 && percentage < 100) emoji = "🥳";
    if (percentage >= 50 && percentage < 80) emoji = "😊";
    if (percentage >= 0 && percentage < 50) emoji = "😬";
    if (percentage === 0) emoji = "🤦‍♂️";

    return (
        <>
            <p className="result">
                <strong>{emoji}</strong>
                Your Score <strong>{points}</strong> out of {totalPoints} (
                {Math.ceil(percentage)}%)
            </p>
            <p className="highscore">Highscore: {highScore} points</p>
            <button className="btn btn-ui" onClick={() => dispatch({ type: "restart" })}>Restart Quiz</button>
        </>
    )
}

export default FinishScreen;
