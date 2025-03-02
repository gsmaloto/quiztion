import { Question } from "@/types/question";

export const questions: Question[] = [
  {
    question: "What is the correct syntax to output text in JavaScript?",
    type: "multiple_choice",
    choices: [
      "print('Hello')",
      "console.log('Hello')",
      "echo 'Hello'",
      "System.out.println('Hello')",
    ],
    answer: "console.log('Hello')",
  },
  {
    question: "Which keyword is used to declare a variable in JavaScript?",
    type: "multiple_choice",
    choices: ["var", "int", "string", "declare"],
    answer: "var",
  },
  {
    question: "What does `typeof` operator return for an array in JavaScript?",
    type: "multiple_choice",
    choices: ["'array'", "'object'", "'list'", "'undefined'"],
    answer: "'object'",
  },
  {
    question: "Which symbol is used for single-line comments in JavaScript?",
    type: "multiple_choice",
    choices: ["//", "/*", "<!--", "#"],
    answer: "//",
  },
  {
    question:
      "Which built-in function converts a string to an integer in JavaScript?",
    type: "multiple_choice",
    choices: ["parseInt()", "toInteger()", "Number.parse()", "int()"],
    answer: "parseInt()",
  },
];

export const identificationQuestions = [
  {
    question: "What is the capital of France?",
    type: "identification",
    answer: "Paris",
  },
];
