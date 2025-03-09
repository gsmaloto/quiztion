"use client";

import { decodeBase64 } from "@/lib/utils";
import { useQuestionStore } from "@/store/question-store";
import { useQuizStore } from "@/store/quiz-store";
import { useState } from "react";
// import { Upload } from "lucide-react";

export default function QuizPage() {
  const [name, setName] = useState("");
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("Medium");
  const [numQuestions, setNumQuestions] = useState(5);
  const [type, setType] = useState("multiple_choice");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // const [avatar, setAvatar] = useState<string>("YA");

  // zustand
  const { setQuestions, questions } = useQuestionStore();
  const { setGameStatus, setQuiz } = useQuizStore();

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

      setQuiz({
        name,
        topic,
        difficulty,
        numQuestions,
        type,
      });

      // setGameStatus("play-quiz");
      // setIsLoading(false);
    } catch (error) {
      console.error(error);
      setError("Failed to generate questions. Try again later.");
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center text-blue-500 mb-2">
        Create Your Quiz
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Customize your quiz experience with AI-generated questions tailored to
        your preferences.
      </p>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-500 text-xl">✨</span>
            </div>
            <h2 className="text-xl font-semibold">Your Details</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quiz Topic
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Select a topic"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Question Type
              </label>
              <select
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="multiple_choice">Multiple Choice</option>
              </select>
            </div>

            {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Custom Avatar
              </label>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-lg font-medium">
                  {avatar}
                </div>
                <button
                  type="button"
                  className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  <Upload size={16} />
                  Choose Image
                </button>
              </div>
            </div> */}

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Questions: {numQuestions}
              </label>
              <input
                type="range"
                min="1"
                max="20"
                value={numQuestions}
                onChange={(e) => setNumQuestions(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Difficulty Level
              </label>
              <div className="flex gap-4">
                {["Easy", "Medium", "Hard"].map((level) => (
                  <label key={level} className="flex-1 cursor-pointer">
                    <input
                      type="radio"
                      name="difficulty"
                      value={level}
                      checked={difficulty === level}
                      onChange={(e) => setDifficulty(e.target.value)}
                      className="sr-only"
                    />
                    <div
                      className={`text-center px-4 py-2 rounded-lg border transition-all ${
                        difficulty === level
                          ? "bg-blue-500 text-white border-blue-500"
                          : "bg-white text-gray-700 border-gray-200 hover:border-blue-500"
                      }`}
                    >
                      {level}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-500 text-xl">🎮</span>
            </div>
            <h2 className="text-xl font-semibold">Quiz Features</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:border-blue-500">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-500 text-sm">👥</span>
                </div>
                <div>
                  <p className="font-medium">Team Mode</p>
                  <p className="text-sm text-gray-500">
                    Create or join a team for collaborative quizzing
                  </p>
                </div>
              </div>
              <input
                type="checkbox"
                className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
              />
            </label>

            <label className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:border-blue-500">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-500 text-sm">💡</span>
                </div>
                <div>
                  <p className="font-medium">AI-Powered Hints</p>
                  <p className="text-sm text-gray-500">
                    {"Get intelligent hints when you're stuck"}
                  </p>
                </div>
              </div>
              <input
                type="checkbox"
                className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
              />
            </label>

            <label className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:border-blue-500">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-500 text-sm">⏱️</span>
                </div>
                <div>
                  <p className="font-medium">Timed Challenge</p>
                  <p className="text-sm text-gray-500">
                    Answer against the clock for extra points
                  </p>
                </div>
              </div>
              <input
                type="checkbox"
                className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
              />
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
          disabled={isLoading}
        >
          {isLoading ? "Generating Quiz..." : "Start Quiz"}
        </button>
      </form>

      {isLoading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div>
              {questions?.length > 0 ? (
                <div className="flex flex-col gap-4">
                  <h3 className="text-blue-500 text-xl font-semibold">
                    Quiz generated successfully
                  </h3>
                  <p className="text-sm text-gray-500">
                    Note: Double click choices to select the answer
                  </p>
                  <button
                    onClick={() => {
                      setGameStatus("play-quiz");
                      setIsLoading(false);
                    }}
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                  >
                    Start Quiz
                  </button>
                </div>
              ) : (
                <h4 className="text-blue-500 text-xl font-semibold animate-pulse">
                  Generating quiz questions...
                </h4>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
