import { Question } from "@/types/question";
import { NextResponse } from "next/server";
import OpenAI from "openai";

console.log("OPENROUTER_API_KEY", process.env.OPEN_ROUTER_API_KEY);

const openai = new OpenAI({
  apiKey: process.env.OPEN_ROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export async function POST(req: Request) {
  try {
    const { topic, difficulty, numQuestions, type } = await req.json();

    const prompt = `
        Generate a quiz based on the following details:

        - **Topic:** ${topic}  
        (The subject of the quiz, e.g., Science, History, Technology, Movies, etc.)  

        - **Difficulty:** ${difficulty} (Easy, Medium, Hard)  
        (Easy: Basic questions, Medium: Moderate difficulty, Hard: Challenging questions.)  

        - **Number of questions:** ${numQuestions}  
        (The total number of questions in the quiz.)  

        - **Type:** ${type} (Identification or Multiple Choice)  
        (Identification: The user provides a direct answer.  
        Multiple Choice: The question includes answer choices.)  

        Return the quiz in the following JSON format:  

        {
        "questions": [
            {
            "question": "What is the capital of France?",
            "type": "identification",
            "answer": "Paris"
            },
            {
            "question": "Which planet is known as the Red Planet?",
            "type": "multiple_choice",
            "choices": ["Earth", "Mars", "Jupiter", "Venus"],
            "answer": "Mars"
            }
        ]
        }

        Return only the JSON object, no extra text or comments and backticks.
    `;

    const response = await openai.chat.completions.create({
      model: "meta-llama/llama-3.3-70b-instruct:free",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });
    console.log("response", response);

    const aiContent = response.choices[0].message.content?.trim() || "{}";
    console.log("aiContent", aiContent);
    try {
      const parsedQuestions: { questions: Question[] } = JSON.parse(aiContent);
      console.log("parsedQuestions", parsedQuestions);
      return NextResponse.json(parsedQuestions);
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to parsed questions", details: error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to generate questions" },
      { status: 500 }
    );
  }
}
