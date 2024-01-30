import { createContext, useContext, useEffect, useReducer } from "react";

const QuizContext = createContext();


const SECS_PER_QUESTION = 30;

const initialState = {
    questions: [],
    // 'loading', 'error', 'ready', 'active', 'finished'
    status: "loading",
    index: 0,
    answer: null,
    points: 0,
    highScore: 0,
    timeRemaining: null
};

function reducer(state, action) {
    switch (action.type) {
        case "dataReceived":
            return {
                ...state,
                questions: action.payload,
                status: "ready"
            }

        case "dataFailed":
            return { ...state, status: "error" };

        case "start":
            return { ...state, status: "active", timeRemaining: state.questions.length * SECS_PER_QUESTION };

        case "newAnswer":
            const curQuestion = state.questions.at(state.index);
            return {
                ...state,
                answer: action.payload,
                points: action.payload === curQuestion.correctOption
                    ? curQuestion.points + state.points
                    : state.points,
            };
        case "nextQuestion":
            return { ...state, index: state.index + 1, answer: null }

        case "finish":
            return { ...state, status: "finish", highScore: state.points > state.highScore ? state.points : state.highScore }

        case "restart":
            return { ...initialState, status: "ready", questions: state.questions }

        case "tick":
            return {
                ...state, timeRemaining: state.timeRemaining - 1, status: state.timeRemaining === 0 ? "finish" : state.status
            }

        default:
            throw new Error("Action unknown");
    }
}


function QuizProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const { questions, status, index, answer, points, highScore, timeRemaining } = state;
    console.log(questions);
    const numQuestion = questions?.length;
    const totalPoints = questions.reduce((prev, cur) => prev + cur.points, 0);

    useEffect(() => {
        async function fetchData() {
            // dispatch()
            try {
                const res = await fetch("http://localhost:8000/questions");
                const data = await res.json();
                dispatch({ type: "dataReceived", payload: data });
            } catch (err) {
                dispatch({ type: "dataFailed" })
            }

        }
        fetchData();

    }, [])

    // useEffect(function () {
    //     fetch("http://localhost:9000/questions")
    //         .then((res) => res.json())
    //         .then((data) => dispatch({ type: "dataReceived", payload: data }))
    //         .catch((err) => dispatch({ type: "dataFailed" }));
    // }, []);

    return (
        <QuizContext.Provider value={{
            questions,
            status,
            index,
            answer,
            points,
            highScore,
            timeRemaining,
            numQuestion,
            totalPoints,
            dispatch
        }}
        >
            {children}
        </QuizContext.Provider>
    )

}

export function useQuiz() {
    const context = useContext(QuizContext);
    if (context === undefined)
        throw new Error("QuizContext was used outside of the QuizProvider");
    return context;
}

export default QuizProvider;