import { Answer } from "@/types/answer";
import { create } from "zustand";

interface QuizStore {
  gameStatus: "create-quiz" | "play-quiz" | "summary";
  setGameStatus: (gameStatus: "create-quiz" | "play-quiz" | "summary") => void;

  answers: Answer[];
  setAnswers: (answers: Answer[]) => void;

  quiz: {
    name: string;
    topic: string;
    difficulty: string;
    numQuestions: number;
    type: string;
  };
  setQuiz: (quiz: {
    name: string;
    topic: string;
    difficulty: string;
    numQuestions: number;
    type: string;
  }) => void;
}

export const useQuizStore = create<QuizStore>((set) => ({
  gameStatus: "create-quiz",
  setGameStatus: (gameStatus) => set({ gameStatus }),

  answers: [],
  setAnswers: (answers) => set({ answers }),

  quiz: {
    name: "",
    topic: "",
    difficulty: "",
    numQuestions: 0,
    type: "",
  },
  setQuiz: (quiz) => set({ quiz }),
}));
