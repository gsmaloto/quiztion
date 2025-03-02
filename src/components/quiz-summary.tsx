import { Answer } from "@/types/answer";
import { useQuizStore } from "@/store/quiz-store";
import { useQuestionStore } from "@/store/question-store";
import { CircleCheck, CircleX, ListChecks, Timer } from "lucide-react";

export default function QuizSummary({
  totalTime,
  answers,
}: {
  totalTime: number;
  answers: Answer[];
}) {
  const { setGameStatus, setAnswers } = useQuizStore();
  const { setQuestions } = useQuestionStore();
  const correctAnswersCount = answers.filter((item) => item.isCorrect).length;
  const scorePercentage = (
    (correctAnswersCount / answers.length) *
    100
  ).toFixed(0);

  return (
    <main className="space-y-4">
      <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
        <h3 className="text-2xl font-bold mb-2 text-center">Quiz Results</h3>
        <p className="text-lg text-gray-600 text-center mb-4">
          Your performance summary
        </p>
        <div className="text-center mb-4">
          <h1 className="text-4xl font-bold text-blue-600">
            {scorePercentage}%
          </h1>
          <p className="text-lg">
            You scored {correctAnswersCount} out of {answers.length} Questions
          </p>
        </div>
        <div className="mb-12">
          <div className="bg-gray-200 mx-auto rounded-full h-2 w-full md:w-3/4">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{
                width: `${scorePercentage}%`,
              }}
            />
          </div>
        </div>

        <div className="flex justify-evenly items-center mb-12">
          <p className="flex flex-col items-center gap-2">
            <CircleCheck className="text-green-600 h-10 w-10" />
            <span className="text-3xl">{correctAnswersCount}</span>
            <span className="font-semibold text-gray-400">Correct</span>
          </p>
          <p className="flex flex-col items-center gap-2">
            <CircleX className="text-red-600 h-10 w-10" />
            <span className="text-3xl">
              {answers.length - correctAnswersCount}
            </span>
            <span className="font-semibold text-gray-400">Incorrect</span>
          </p>
        </div>
        <div className="mb-2 text-gray-700 flex gap-2 items-center justify-center ">
          <Timer className="h-12 w-12 text-blue-600" />
          <div className="text-center">
            <p className="font-semibold text-xl">{totalTime}s</p>
            <p className="text-gray-400">Time taken</p>
          </div>
        </div>

        <div className="space-y-2 py-2">
          <button
            className="bg-indigo-600 hover:bg-indigo-700 w-full py-4 text-white rounded-md font-bold transition duration-300"
            onClick={() => {
              setGameStatus("create-quiz");
              setAnswers([]);
              setQuestions([]);
            }}
          >
            Try Another Quiz
          </button>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="text-2xl font-semibold mb-2 flex items-center gap-2 text-gray-700">
          <ListChecks className="h-12 w-12" /> Question Review
        </h4>
        <ul className="space-y-6 py-4">
          {answers.map((item, index) => (
            <li key={index}>
              <div className="grid grid-cols-[50px_1fr]">
                {item.isCorrect ? (
                  <CircleCheck className="text-green-600 mt-4" />
                ) : (
                  <CircleX className="text-red-600 mt-4" />
                )}
                <div>
                  <p className="font-semibold">
                    {index + 1}: {item.question}
                  </p>
                  <p className="mt-1">
                    <span className="font-semibold">Your Answer:</span>{" "}
                    <span
                      className={`${
                        item.isCorrect ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {item.selected}
                    </span>
                  </p>
                  {!item.isCorrect && (
                    <p className="text-blue-600 mt-1">
                      <span className="font-semibold">Correct Answer:</span>{" "}
                      {item.correctAnswer}
                    </p>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
