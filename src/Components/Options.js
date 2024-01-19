function Options({ question, answer, dispatch }) {
    const hasAnswer = answer !== null;

    return (
        <div className="options">
            {question.options.map((option, index) => (
                <button
                    className={`btn btn-option 
                    ${index === answer ? "answer" : ""} 
                    ${hasAnswer
                            ? question.correctOption === index
                                ? "correct"
                                : "wrong"
                            : ""}`}
                    key={option}
                    onClick={() => dispatch({ type: "newAnswer", payload: index })}
                    disabled={hasAnswer}
                >{option}</button>
            ))}
        </div>
    )
}

export default Options
