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
    <>
      <h3 className="text-lg font-bold mb-4">
        {currentQuestionIndex + 1}. {currentQuestion.question}
      </h3>
      <div className="space-y-2">
        {currentQuestion.choices.map((choice: string, index: number) => (
          <button
            key={index}
            className={`w-full px-4 py-2 border rounded-md text-left cursor-pointer transition-all 
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
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
          onClick={handleNext}
          disabled={!selectedOption}
        >
          Next
        </button>
      </div>
    </>
  );
}
