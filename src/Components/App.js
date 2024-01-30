// import { useEffect, useReducer } from "react";

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
import { useQuiz } from "../contexts/QuizContext";


function App() {
  const { status } = useQuiz();

  return (
    // <ErrorBoundary>
    <div className="App">
      <Header />
      <Main>
        {status === "loading" && <Loader />}

        {status === "error" && <Error />}

        {status === "ready" && <StartScreen />}

        {status === "active" &&
          <>
            <Progress />
            <Question />
            <Footer>
              <NextButton />
              <Timer />
            </Footer>
          </>
        }

        {status === "finish" && <FinishScreen />}
      </Main>
    </div>
    // </ErrorBoundary>
  );
}

export default App;
