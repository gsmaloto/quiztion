"use client";

import { useState, useEffect, useRef } from "react";
import QuizSummary from "@/components/quiz-summary";
import { MultipleChoiceCard } from "@/components/multiple-choice-card";
import { useQuestionStore } from "@/store/question-store";
import QuizForm from "@/components/quiz-form";
import { useQuizStore } from "@/store/quiz-store";
export const dynamic = "force-dynamic"; // Prevent static generation

export default function QuizPage() {
  // zustand
  const { questions, setQuestions } = useQuestionStore();
  const { gameStatus, setGameStatus, answers, setAnswers } = useQuizStore();

  // useState
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [totalTime, setTotalTime] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTime = useRef<number | null>(null);

  useEffect(() => {
    if (gameStatus === "play-quiz") {
      startTime.current = performance.now(); // Start time in milliseconds
      const timerId = timerRef.current; // Store the ref value

      return () => {
        if (timerId) clearInterval(timerId); // Use the stored value
      };
    }
  }, [gameStatus]);

  const currentQuestion = questions[currentQuestionIndex] ?? [];

  const handleSelect = (choice: string) => {
    setSelectedOption(choice);
  };

  const handleNext = () => {
    const endTime = performance.now();
    const totalTimeMs = endTime - (startTime.current ?? 0);
    const formattedTime = (totalTimeMs / 1000).toFixed(2); // Convert to seconds with milliseconds

    setAnswers([
      ...answers,
      {
        question: currentQuestion?.question ?? "",
        selected: selectedOption ?? "",
        isCorrect:
          selectedOption?.toLowerCase() ===
          currentQuestion?.answer.toLowerCase(),
        correctAnswer: currentQuestion?.answer ?? "",
      },
    ]);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      clearInterval(timerRef.current as NodeJS.Timeout);
      setTotalTime(Number(formattedTime));
      setCurrentQuestionIndex(0);
      setSelectedOption(null);
      setQuestions([]);
      setGameStatus("summary");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient px-4">
      <div className=" h-11/12 w-full md:w-[800px] mx-auto">
        {gameStatus === "create-quiz" ? (
          <QuizForm />
        ) : gameStatus === "play-quiz" ? (
          <MultipleChoiceCard
            currentQuestionIndex={currentQuestionIndex}
            currentQuestion={currentQuestion}
            selectedOption={selectedOption ?? ""}
            handleSelect={handleSelect}
            handleNext={handleNext}
          />
        ) : (
          <QuizSummary totalTime={totalTime} answers={answers} />
        )}
      </div>
    </div>
  );
}
