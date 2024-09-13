import { createContext, useContext } from "react";

const QuizContext = createContext();

function QuizProvider({ children }) {
    return <QuizContext.Provider>{children}</QuizContext.Provider>;
}

function useQuiz() {
    const context = useContext(QuizContext);
    if (context === undefined) throw new Error("useQuiz used outside of QuizProvider");
    return context;
}

export { QuizProvider, useQuiz };
