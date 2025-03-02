"use client";

import { useState, useEffect, useRef } from "react";
import QuizSummary from "@/components/quiz-summary";
import { MultipleChoiceCard } from "@/components/multiple-choice-card";
import { Answer } from "@/types/answer";
import { useQuestionStore } from "@/store/question-store";
import { redirect } from "next/navigation";
export const dynamic = "force-dynamic"; // Prevent static generation

export default function PlayPage() {
  // zustand
  const { questions } = useQuestionStore();

  // useState
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTime = useRef<number | null>(null);

  useEffect(() => {
    startTime.current = performance.now(); // Start time in milliseconds
    timerRef.current = setInterval(() => {
      setElapsedTime((prevTime) => prevTime + 1);
    }, 1000);
    return () => clearInterval(timerRef.current as NodeJS.Timeout);
  }, []);

  const currentQuestion = questions[currentQuestionIndex] ?? null;

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
        correct: selectedOption === currentQuestion?.answer,
        correctAnswer: currentQuestion?.answer ?? "",
      },
    ]);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      clearInterval(timerRef.current as NodeJS.Timeout);
      setElapsedTime(Number(formattedTime));
      setQuizCompleted(true);
    }
  };

  if (!questions || questions.length === 0) {
    redirect("/quiz");
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient px-4">
      <div className=" h-11/12 w-full md:w-[500px] mx-auto bg-white shadow-md rounded-lg p-6 border">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Quiztion</h2>
          <div className="max-w-[500px] px-3 py-1 rounded-md text-sm font-semibold">
            Time Elapsed{" "}
            <span className="bg-gray-900 text-white px-2 py-0.5 rounded">
              {elapsedTime}s
            </span>
          </div>
        </div>
        {!quizCompleted ? (
          <MultipleChoiceCard
            currentQuestionIndex={currentQuestionIndex}
            currentQuestion={currentQuestion}
            selectedOption={selectedOption ?? ""}
            handleSelect={handleSelect}
            handleNext={handleNext}
          />
        ) : (
          <QuizSummary elapsedTime={elapsedTime} answers={answers} />
        )}
      </div>
    </div>
  );
}
