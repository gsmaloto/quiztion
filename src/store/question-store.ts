import { Question } from "@/types/question";
import { create } from "zustand";

interface QuestionStore {
  questions: Question[];
  setQuestions: (questions: Question[]) => void;
}

export const useQuestionStore = create<QuestionStore>((set) => ({
  questions: [],
  setQuestions: (questions) => set({ questions }),
}));
