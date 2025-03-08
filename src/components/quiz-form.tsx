"use client";

import { decodeBase64 } from "@/lib/utils";
import { useQuestionStore } from "@/store/question-store";
import { useQuizStore } from "@/store/quiz-store";
import { useState } from "react";

export default function QuizPage() {
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("Medium");
  const [numQuestions, setNumQuestions] = useState(5);
  const [type, setType] = useState("multiple_choice");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // zustand
  const { setQuestions } = useQuestionStore();
  const { setGameStatus } = useQuizStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      console.log({ topic, difficulty, numQuestions, type });

      const response = await fetch("/api/generate-question", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic, difficulty, numQuestions, type }),
      });

      const data = await response.json();
      console.log("data", data);
      const decodedData = JSON.parse(decodeBase64(data));
      console.log("decodedData", decodedData);
      setQuestions(decodedData.questions);

      setGameStatus("play-quiz");
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setError("Failed to generate questions. Try again later.");
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold mb-4 text-center text-indigo-700">
        Quiz Setup
      </h2>
      {error && (
        <div className="bg-red-400 rounded text-white p-2 my-4">{error}</div>
      )}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block font-medium text-gray-700">Quiz Topic</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-300"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter a topic (e.g., Science, History)"
            required
          />
        </div>
        <div>
          <label className="font-medium text-gray-700 flex justify-between">
            Number of Questions: {numQuestions}
          </label>
          <input
            type="range"
            min="1"
            max="20"
            value={numQuestions}
            onChange={(e) => setNumQuestions(Number(e.target.value))}
            className="w-full"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Difficulty</label>
          <select
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-300"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
        <div>
          <label className="block font-medium text-gray-700">
            Question Type
          </label>
          <select
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-300"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="multiple_choice">Multiple Choice</option>
            {/* <option value="identification">Identification</option> */}
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-bold transition duration-300"
        >
          Generate Quiz
        </button>
      </form>
      {isLoading && (
        <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
          <h4 className="text-indigo-700 text-2xl font-semibold animate-pulse">
            Generating questions...
          </h4>
        </div>
      )}
    </div>
  );
}
