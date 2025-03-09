import Link from "next/link";
import {
  Brain,
  Calendar,
  Trophy,
  Users,
  Sparkles,
  Clock,
  Timer,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center px-6 py-12 bg-white">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="text-blue-500">AI-Powered</span> Quiz Experience
        </h1>
        <p className="text-gray-600 mb-8">
          Engage with dynamically generated questions that adapt to your
          interests and challenge your knowledge.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/quiz">
            <button className="bg-blue-500 text-white px-6 py-2.5 rounded-lg flex items-center gap-2 hover:bg-blue-600">
              <Sparkles size={20} />
              Play Now
            </button>
          </Link>
          <Link href="/daily">
            <button className="bg-white text-gray-800 px-6 py-2.5 rounded-lg border border-gray-200 flex items-center gap-2 hover:bg-gray-50">
              <Calendar size={20} />
              Daily Challenge
            </button>
          </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-16">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <Brain className="text-blue-500 mb-4" size={24} />
          <h3 className="font-semibold text-xl mb-2">AI-Generated Questions</h3>
          <p className="text-gray-600 mb-4">
            Experience unique quizzes tailored to your interests with our
            advanced AI technology.
          </p>
          <button className="text-blue-500 font-semibold flex items-center gap-2 hover:text-blue-600">
            Create Custom Quiz
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <Calendar className="text-blue-500 mb-4" size={24} />
          <h3 className="font-semibold text-xl mb-2">Daily Challenges</h3>
          <p className="text-gray-600 mb-4">
            Test your knowledge with fresh daily quizzes and compete globally.
          </p>
          <button className="text-blue-500 font-semibold flex items-center gap-2 hover:text-blue-600">
            {"Join Today's Challenge"}
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <Trophy className="text-blue-500 mb-4" size={24} />
          <h3 className="font-semibold text-xl mb-2">Tournaments</h3>
          <p className="text-gray-600 mb-4">
            Participate in exciting quiz tournaments and win exclusive rewards.
          </p>
          <button className="text-blue-500 font-semibold flex items-center gap-2 hover:text-blue-600">
            Enter Tournament
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <Users className="text-blue-500 mb-4" size={24} />
          <h3 className="font-semibold text-xl mb-2">Team Battles</h3>
          <p className="text-gray-600 mb-4">
            Create or join a team and challenge other teams in thrilling quiz
            battles.
          </p>
          <button className="text-blue-500 font-semibold flex items-center gap-2 hover:text-blue-600">
            Find Team Battle
          </button>
        </div>
      </div>

      {/* Smart Features Section */}
      <div className="mt-24 text-center max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-12">
          <span className="text-blue-500">Smart Features</span> For Quiz
          Enthusiasts
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <Brain className="mx-auto text-blue-500 mb-4" size={24} />
            <h3 className="font-semibold mb-2">AI-Generated Hints</h3>
            <p className="text-gray-600">
              {
                "Get intelligent hints when you're stuck on a challenging question."
              }
            </p>
          </div>
          <div className="text-center">
            <Timer className="mx-auto text-blue-500 mb-4" size={24} />
            <h3 className="font-semibold mb-2">Streak Rewards</h3>
            <p className="text-gray-600">
              Build a streak of correct answers and earn bonus points and
              rewards.
            </p>
          </div>
          <div className="text-center">
            <Clock className="mx-auto text-blue-500 mb-4" size={24} />
            <h3 className="font-semibold mb-2">Time Challenges</h3>
            <p className="text-gray-600">
              Answer against the clock for extra points in time-based mode.
            </p>
          </div>
        </div>
      </div>

      {/* Leaderboard Section */}
      <div className="mt-24 w-full max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">
          Top Quiz Masters
        </h2>
        <p className="text-center text-gray-600 mb-8">
          {"See who's leading the challenge. Join now to earn your spot on the"}
          leaderboard.
        </p>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr className="text-left">
                <th className="px-6 py-3">#</th>
                <th className="px-6 py-3">User</th>
                <th className="px-6 py-3">Score</th>
                <th className="px-6 py-3">Quizzes</th>
                <th className="px-6 py-3">Badges</th>
              </tr>
            </thead>
            <tbody>{/* Add your leaderboard data here */}</tbody>
          </table>
          <div className="p-4 text-center">
            <button className="text-blue-500 font-semibold hover:text-blue-600">
              View Full Leaderboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
