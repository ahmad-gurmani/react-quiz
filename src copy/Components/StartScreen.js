function StartScreen({ numQuestion, dispatch }) {

    function startQuiz() {
        dispatch({ type: 'start' });
    }

    return (
        <div className="start">
            <h2>Welcome to The React Quiz</h2>
            <h3>{numQuestion} question to test your React Skills</h3>
            <button className="btn btn-ui" onClick={startQuiz}>Let's start</button>
        </div>
    )
}

export default StartScreen;
