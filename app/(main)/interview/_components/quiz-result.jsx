"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import confetti from "canvas-confetti";

// 🎯 Function to determine motivation & emoji
function getMotivation(score) {
  if (score === 100) {
    return {
      emoji: "🎉🏆🤩",
      message: "Perfect score! You’re unstoppable — keep shining bright!",
      color: "text-yellow-400",
      glow: "drop-shadow-[0_0_20px_rgba(255,255,0,0.6)]",
    };
  } else if (score >= 70) {
    return {
      emoji: "🔥😄💪",
      message: "Awesome work! You’re doing great — keep pushing higher!",
      color: "text-green-400",
      glow: "drop-shadow-[0_0_20px_rgba(0,255,100,0.5)]",
    };
  } else if (score >= 50) {
    return {
      emoji: "🙂🚀🌱",
      message: "Good effort! You’re improving — keep learning forward!",
      color: "text-blue-400",
      glow: "drop-shadow-[0_0_20px_rgba(100,200,255,0.5)]",
    };
  } else {
    return {
      emoji: "😔💭",
      message: "Don’t worry! Every mistake is a step toward mastery.",
      color: "text-red-400",
      glow: "drop-shadow-[0_0_20px_rgba(255,100,100,0.5)]",
    };
  }
}

export default function QuizResult({
  result,
  hideStartNew = false,
  onStartNew,
}) {
  if (!result) return null;

  const { emoji, message, color, glow } = getMotivation(result.quizScore);

  // 🎊 Confetti for perfect score
  useEffect(() => {
    if (result.quizScore === 100) {
      const duration = 2 * 1000;
      const end = Date.now() + duration;
      (function frame() {
        confetti({
          particleCount: 6,
          angle: 60,
          spread: 60,
          origin: { x: 0 },
        });
        confetti({
          particleCount: 6,
          angle: 120,
          spread: 60,
          origin: { x: 1 },
        });
        if (Date.now() < end) requestAnimationFrame(frame);
      })();
    }
  }, [result.quizScore]);

  return (
    <div className="mx-auto animate-fadeIn">
      <h1 className="flex items-center gap-2 text-3xl gradient-title mb-4">
        <Trophy className="h-6 w-6 text-yellow-500 drop-shadow-glow" />
        Quiz Results
      </h1>

      <CardContent className="space-y-6">
        {/* 🎯 Score Overview */}
        <div className="text-center space-y-3">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{
              scale: [1.1, 1],
              opacity: 1,
              y: [0, -10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={`text-[100px] md:text-[130px] ${color} ${glow}`}
          >
            {emoji}
          </motion.div>

          <h3 className="text-3xl font-bold">{result.quizScore.toFixed(1)}%</h3>
          <motion.p
            className={`text-lg font-semibold ${color}`}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            {message}
          </motion.p>

          <Progress
            value={result.quizScore}
            className={`w-full transition-all duration-700 ${
              result.quizScore >= 80
                ? "bg-green-500/30"
                : result.quizScore >= 50
                ? "bg-yellow-500/30"
                : "bg-red-500/30"
            }`}
          />
        </div>

        {/* 💡 Improvement Tip */}
        {result.improvementTip && (
          <div className="bg-gradient-to-br from-indigo-900/40 to-indigo-800/20 p-4 rounded-xl shadow-inner">
            <p className="font-semibold text-indigo-300">💡 Improvement Tip:</p>
            <p className="text-sm text-muted-foreground">
              {result.improvementTip}
            </p>
          </div>
        )}

        {/* 🧠 Question Review */}
        <div className="space-y-4">
          <h3 className="font-medium text-indigo-400">Question Review</h3>
          {result.questions.map((q, index) => (
            <div
              key={index}
              className={`border rounded-lg p-4 space-y-2 transition-all duration-500 ${
                q.isCorrect
                  ? "border-green-500/40 bg-green-500/5 hover:shadow-green-500/10"
                  : "border-red-500/40 bg-red-500/5 hover:shadow-red-500/10"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <p className="font-medium">{q.question}</p>
                {q.isCorrect ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                )}
              </div>
              <div className="text-sm text-muted-foreground">
                <p>Your answer: {q.userAnswer}</p>
                {!q.isCorrect && <p>Correct answer: {q.answer}</p>}
              </div>
              <div className="text-sm bg-muted/30 p-2 rounded-lg">
                <p className="font-medium text-indigo-300">Explanation:</p>
                <p>{q.explanation}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      {/* 🚀 Start New Quiz Button */}
      {!hideStartNew && (
        <CardFooter>
          <Button
            onClick={onStartNew}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 transition-all"
          >
            Start New Quiz
          </Button>
        </CardFooter>
      )}
    </div>
  );
}
