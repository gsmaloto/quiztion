import { useRouter } from "next/navigation";
import { Answer } from "@/types/answer";

export default function QuizSummary({
  elapsedTime,
  answers,
}: {
  elapsedTime: number;
  answers: Answer[];
}) {
  // next
  const router = useRouter();

  return (
    <div className="mt-4">
      <h3 className="text-lg font-bold mb-2">Quiz Summary</h3>
      <div>
        <p className="mb-2 text-gray-700">
          Total Time:{" "}
          <span className="font-semibold text-blue-600">{elapsedTime}s</span>
        </p>
        <p className="mb-2 text-gray-700">
          Result:{" "}
          <span className="font-semibold text-blue-600">
            {answers.filter((item) => item.correct).length} / {answers.length}
          </span>
        </p>
      </div>

      <ul className="space-y-2 overflow-y-auto max-h-[50vh] py-2">
        {answers.map((item, index) => (
          <li
            key={index}
            className={`p-2 border rounded-md w-full ${
              item.correct ? "bg-green-100" : "bg-red-100/80"
            }`}
          >
            <p className="font-semibold">
              {index + 1}. {item.question}
            </p>
            <p>
              <span className="font-semibold">Your Answer:</span>{" "}
              <span
                className={`${
                  item.correct ? "text-green-600" : "text-red-600"
                }`}
              >
                {item.selected}
              </span>
            </p>
            {!item.correct && (
              <p className="text-blue-600">
                <span className="font-semibold">Correct Answer:</span>{" "}
                {item.correctAnswer}
              </p>
            )}
          </li>
        ))}
      </ul>

      <div className="space-y-2 py-2">
        <button
          className="bg-indigo-600 hover:bg-indigo-700 w-full py-4 text-white rounded-md font-bold transition duration-300"
          onClick={() => router.push("/quiz")}
        >
          Play Again
        </button>
        <button
          className="bg-indigo-600 hover:bg-indigo-700 w-full py-4 text-white rounded-md font-bold transition duration-300"
          onClick={() => router.push("/quiz")}
        >
          Share questions
        </button>
      </div>
    </div>
  );
}
