import { useQuestionStore } from "@/store/question-store";
import { Question } from "@/types/question";
import Image from "next/image";
import { useQuizStore } from "@/store/quiz-store";

type MultipleChoiceCardProps = {
  currentQuestionIndex: number;
  currentQuestion: Question;
  selectedOption: string;
  handleSelect: (choice: string) => void;
  handleNext: () => void;
};

export function MultipleChoiceCard({
  currentQuestionIndex,
  currentQuestion,
  selectedOption,
  handleSelect,
  handleNext,
}: MultipleChoiceCardProps) {
  // zustand
  const { questions } = useQuestionStore();
  const { quiz } = useQuizStore();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-gray-500">
          {quiz.topic} • {quiz.difficulty} difficulty
        </span>
        <span className="text-sm font-medium">
          Score: {currentQuestionIndex + 1} of {questions.length}
        </span>
      </div>

      <h3 className="text-xl font-bold mb-4">
        Question {currentQuestionIndex + 1} of {questions.length}
      </h3>

      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-4">
          {currentQuestion.question}
        </h4>

        {currentQuestion.image && (
          <div className="relative w-full h-48 mb-6 rounded-lg overflow-hidden">
            <Image
              src={currentQuestion.image.url}
              alt={currentQuestion.image.alt}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="space-y-3">
          {currentQuestion.choices.map((choice: string, index: number) => (
            <button
              key={index}
              onDoubleClick={() => handleNext()}
              className={`w-full px-6 py-4 border-2 rounded-xl text-left cursor-pointer transition-all ${
                selectedOption === choice
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }`}
              onClick={() => handleSelect(choice)}
            >
              <div className="flex items-center">
                <span
                  className={`w-8 h-8 flex items-center justify-center rounded-full border-2 mr-4 ${
                    selectedOption === choice
                      ? "border-blue-500 bg-blue-500 text-white"
                      : "border-gray-300 text-gray-500"
                  }`}
                >
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="text-lg">{choice}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
