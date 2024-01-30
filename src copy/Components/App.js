import { useEffect, useReducer } from "react";

import StartScreen from "./StartScreen";
import NextButton from "./NextButton";
import Question from "./Question";
import Progress from "./Progress";
// import ErrorBoundary from "./ErrorBoundary";
import Header from "./Header"
import Loader from "./Loader"
import Error from "./Error"
import Main from "./Main";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],
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

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { questions, status, index, answer, points, highScore, timeRemaining } = state;

  const numQuestion = questions.length;
  const totalPoints = questions.reduce((prev, cur) => prev + cur.points, 0);

  useEffect(() => {
    async function fetchData() {
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
  return (
    // <ErrorBoundary>
    <div className="App">
      <Header />
      <Main>
        {status === "loading" && <Loader />}

        {status === "error" && <Error />}

        {status === "ready" && <StartScreen numQuestion={numQuestion} dispatch={dispatch} />}

        {status === "active" &&
          <>
            <Progress numQuestion={numQuestion} index={index} points={points} totalPoints={totalPoints} answer={answer} />
            <Question questions={questions[index]} dispatch={dispatch} answer={answer} />
            <Footer>
              <NextButton dispatch={dispatch} answer={answer} numQuestions={numQuestion} index={index} />
              <Timer dispatch={dispatch} timeRemaining={timeRemaining} />
            </Footer>
          </>
        }

        {status === "finish" && <FinishScreen points={points} totalPoints={totalPoints} highScore={highScore} dispatch={dispatch} />}
      </Main>
    </div>
    // </ErrorBoundary>
  );
}

export default App;
