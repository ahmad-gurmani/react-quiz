import Options from "./Options"

function Question({ questions, dispatch, answer }) {

    return (
        <div className="">
            <h4>{questions.question}</h4>
            <Options question={questions} dispatch={dispatch} answer={answer} />
        </div>
    )
}

export default Question;
