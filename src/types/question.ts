export type Question = {
  question: string;
  type: QuestionType;
  answer: string;
  choices: string[];
};

export type QuestionType = "multiple_choice" | "identification";

// {
//     question: "Which keyword is used to declare a variable in JavaScript?",
//     type: "multiple_choice",
//     choices: ["var", "int", "string", "declare"],
//     answer: "var",
//   },
