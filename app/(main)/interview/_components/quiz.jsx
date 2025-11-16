"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { generateQuiz, saveQuizResult } from "@/actions/interview";
import QuizResult from "./quiz-result";
import useFetch from "@/hooks/use-fetch";
import { BarLoader } from "react-spinners";
import { motion, AnimatePresence } from "framer-motion";

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);

  const {
    loading: generatingQuiz,
    fn: generateQuizFn,
    data: quizData,
  } = useFetch(generateQuiz);

  const {
    loading: savingResult,
    fn: saveQuizResultFn,
    data: resultData,
    setData: setResultData,
  } = useFetch(saveQuizResult);

  useEffect(() => {
    if (quizData) setAnswers(new Array(quizData.length).fill(null));
  }, [quizData]);

  const handleAnswer = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
    } else {
      finishQuiz();
    }
  };

  const calculateScore = () => {
    let correct = 0;
    answers.forEach((answer, i) => {
      if (answer === quizData[i].correctAnswer) correct++;
    });
    return (correct / quizData.length) * 100;
  };

  const finishQuiz = async () => {
    const score = calculateScore();
    try {
      await saveQuizResultFn(quizData, answers, score);
      toast.success("Quiz completed!");
    } catch (error) {
      toast.error(error.message || "Failed to save quiz results");
    }
  };

  const startNewQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowExplanation(false);
    generateQuizFn();
    setResultData(null);
  };

  if (generatingQuiz)
    return (
      <div className="flex justify-center items-center mt-10">
        <BarLoader width="60%" color="#888" />
      </div>
    );

  if (resultData)
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mx-2"
      >
        <QuizResult result={resultData} onStartNew={startNewQuiz} />
      </motion.div>
    );

  if (!quizData)
    return (
      <Card className="mx-2 backdrop-blur-lg bg-white/5 dark:bg-gray-900/40 shadow-2xl border border-white/10 transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">
            Ready to test your knowledge?
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground mb-6">
            This quiz contains 10 questions specific to your industry and
            skills. Take your time and choose the best answer for each question.
          </p>
        </CardContent>
        <CardFooter>
          <Button
            onClick={generateQuizFn}
            className="w-full font-semibold text-lg"
          >
            Start Quiz
          </Button>
        </CardFooter>
      </Card>
    );

  const question = quizData[currentQuestion];

  return (
    <motion.div
      key={currentQuestion}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="mx-2 backdrop-blur-xl bg-white/10 dark:bg-gray-800/40 border border-white/10 shadow-lg hover:shadow-2xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl font-semibold flex justify-between">
            <span>
              Question {currentQuestion + 1} of {quizData.length}
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round(((currentQuestion + 1) / quizData.length) * 100)}%
            </span>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <motion.p
            key={question.question}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-lg font-medium leading-relaxed"
          >
            {question.question}
          </motion.p>

          <RadioGroup
            onValueChange={handleAnswer}
            value={answers[currentQuestion]}
            className="space-y-3"
          >
            {question.options.map((option, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center space-x-3 p-3 rounded-lg border border-white/10 hover:bg-white/10 transition"
              >
                <RadioGroupItem value={option} id={`option-${i}`} />
                <Label htmlFor={`option-${i}`} className="cursor-pointer w-full">
                  {option}
                </Label>
              </motion.div>
            ))}
          </RadioGroup>

          <AnimatePresence>
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4 p-4 bg-muted/20 border border-white/10 rounded-lg"
              >
                <p className="font-medium">💡 Explanation:</p>
                <p className="text-muted-foreground mt-2">
                  {question.explanation}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>

        <CardFooter className="flex justify-between mt-4">
          {!showExplanation && (
            <Button
              onClick={() => setShowExplanation(true)}
              variant="outline"
              disabled={!answers[currentQuestion]}
              className="backdrop-blur-md border-white/20"
            >
              Show Explanation
            </Button>
          )}
          <Button
            onClick={handleNext}
            disabled={!answers[currentQuestion] || savingResult}
            className="ml-auto font-semibold"
          >
            {savingResult ? (
              <BarLoader width={100} height={3} color="#fff" />
            ) : currentQuestion < quizData.length - 1 ? (
              "Next Question"
            ) : (
              "Finish Quiz"
            )}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
