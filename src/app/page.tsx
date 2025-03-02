import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient text-white text-center p-6">
      <h1 className="text-4xl md:text-6xl font-bold mb-4">
        Welcome to Quiztion
      </h1>
      <p className="text-lg md:text-xl mb-6 max-w-2xl">
        Create and play AI-generated quizzes on any topic! Test your knowledge
        with dynamically generated questions tailored to your preferences.
      </p>
      <div className="flex space-x-4">
        <Link href="/quiz">
          <button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow-md cursor-pointer hover:bg-gray-200">
            Get Started
          </button>
        </Link>
        {/* <Link href="/about">
          <button className="bg-transparent border-2 border-white px-6 py-3 rounded-lg hover:bg-white cursor-pointer hover:text-blue-600">
            Learn More
          </button>
        </Link> */}
      </div>
      <div className="mt-10 w-full max-w-lg">
        {/* <img
          src="/quiz-illustration.svg"
          alt="Quiz Illustration"
          className="w-full"
        /> */}
      </div>
    </div>
  );
}
