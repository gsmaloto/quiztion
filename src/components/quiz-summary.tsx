import { Answer } from "@/types/answer";
import { useQuizStore } from "@/store/quiz-store";
import { useQuestionStore } from "@/store/question-store";
import { CircleCheck, CircleX, Trophy } from "lucide-react";

export default function QuizSummary({
  totalTime,
  answers,
}: {
  totalTime: number;
  answers: Answer[];
}) {
  const { setGameStatus, setAnswers, quiz } = useQuizStore();
  const { setQuestions } = useQuestionStore();
  const correctAnswersCount = answers.filter((item) => item.isCorrect).length;
  const scorePercentage = (
    (correctAnswersCount / answers.length) *
    100
  ).toFixed(0);

  return (
    <div className="max-w-3xl mx-auto space-y-6 p-4">
      <h1 className="text-3xl font-bold text-center text-blue-500">
        Quiz Completed!
      </h1>
      <p className="text-center text-gray-600">
        {"Nice try! There's room for improvement."}
      </p>

      {/* User Info Card */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-start gap-4">
          <Trophy className="text-pink-500 h-12 w-12" />
          <div>
            <h2 className="text-xl font-bold">{quiz.name}</h2>
            <p className="text-gray-600">
              {quiz.topic} • {quiz.difficulty} difficulty
            </p>
            <p className="text-sm text-gray-500">Quiz Participant</p>
          </div>
        </div>

        {/* Score Display */}
        <div className="grid sm:grid-cols-3 gap-4 mt-6 text-center">
          <div>
            <p className="text-3xl font-bold text-green-500">
              {correctAnswersCount}/{answers.length}
            </p>
            <p className="text-sm text-gray-600">Correct</p>
          </div>
          <div>
            <p className="text-3xl font-bold">{scorePercentage}%</p>
            <p className="text-sm text-gray-600">Accuracy</p>
          </div>
          <div>
            <p className="text-3xl font-bold">{totalTime}s</p>
            <p className="text-sm text-gray-600">Time Taken</p>
          </div>
        </div>
      </div>

      {/* Quiz Details Card */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold mb-4">Quiz Details</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Topic:</span>
            <span>{quiz.topic}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Questions:</span>
            <span>{answers.length}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Time Mode:</span>
            <span>No</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">AI Hints:</span>
            <span>Enabled</span>
          </div>
        </div>
      </div>

      {/* Question Review */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold mb-4">Question Review</h3>
        <ul className="space-y-6">
          {answers.map((item, index) => (
            <li key={index} className="space-y-2">
              <div className="flex items-start gap-2">
                {item.isCorrect ? (
                  <CircleCheck className="text-green-500 h-5 w-5 mt-1 flex-shrink-0" />
                ) : (
                  <CircleX className="text-red-500 h-5 w-5 mt-1 flex-shrink-0" />
                )}
                <div>
                  <p className="font-medium">
                    {index + 1}. {item.question}
                  </p>
                  <p className="text-gray-600">
                    Your answer:{" "}
                    <span
                      className={
                        item.isCorrect ? "text-green-500" : "text-red-500"
                      }
                    >
                      {item.selected}
                    </span>
                  </p>
                  {!item.isCorrect && (
                    <p className="text-gray-600">
                      Correct answer:{" "}
                      <span className="text-green-500">
                        {item.correctAnswer}
                      </span>
                    </p>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => {
            setGameStatus("create-quiz");
            setAnswers([]);
            setQuestions([]);
          }}
          className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Take Another Quiz
        </button>
        <button
          onClick={() => {
            setGameStatus("create-quiz");
            setAnswers([]);
            setQuestions([]);
          }}
          className="flex-1 border border-blue-500 text-blue-500 px-4 py-2 rounded-md hover:bg-blue-50 transition-colors"
        >
          Back to Home
        </button>
        <button className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
          Share Results
        </button>
      </div>
    </div>
  );
}
