import { useQuestionStore } from "@/store/question-store";
import { Question } from "@/types/question";
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

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-4">
        {currentQuestionIndex + 1}. {currentQuestion.question}
      </h3>
      <div className="space-y-2">
        {currentQuestion.choices.map((choice: string, index: number) => (
          <button
            key={index}
            onDoubleClick={() => handleNext()}
            className={`w-full px-4 py-6 border rounded-md text-left cursor-pointer transition-all 
                  ${
                    selectedOption === choice
                      ? "bg-blue-100 border-blue-500"
                      : "hover:bg-gray-100"
                  }
                `}
            onClick={() => handleSelect(choice)}
          >
            {choice}
          </button>
        ))}
      </div>
      <div className="flex justify-between items-center mt-4 text-sm">
        <span>
          {currentQuestionIndex + 1} of {questions.length} Questions
        </span>
      </div>
    </div>
  );
}
