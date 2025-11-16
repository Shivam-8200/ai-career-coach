"use client";

import { useState } from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import QuizResult from "./quiz-result";

export default function QuizList({ assessments }) {
  const router = useRouter();
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  return (
    <>
      <Card className="backdrop-blur-xl bg-white/5 border border-white/10 shadow-xl transition-all">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="gradient-title text-3xl md:text-4xl">
                Recent Quizzes
              </CardTitle>
              <CardDescription>
                Review your past quiz performance
              </CardDescription>
            </div>
            <Button
              onClick={() => router.push("/interview/mock")}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 transition-all"
            >
              Start New Quiz
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-4 animate-fadeIn">
            {assessments?.map((assessment, i) => (
              <Card
                key={assessment.id}
                className="cursor-pointer backdrop-blur-xl bg-white/5 border border-white/10 transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-indigo-500/10"
                onClick={() => setSelectedQuiz(assessment)}
              >
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="gradient-title text-2xl flex items-center gap-2">
                      <span>Quiz {i + 1}</span>
                    </CardTitle>
                    <div className="text-xs text-muted-foreground">
                      {format(new Date(assessment.createdAt), "MMM dd, yyyy • HH:mm")}
                    </div>
                  </div>
                  <CardDescription className="flex justify-between items-center mt-1">
                    <div className="text-base font-semibold text-indigo-400">
                      Score: {assessment.quizScore.toFixed(1)}%
                    </div>
                  </CardDescription>
                </CardHeader>

                {assessment.improvementTip && (
                  <CardContent>
                    <p className="text-sm text-muted-foreground italic">
                      💡 {assessment.improvementTip}
                    </p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selectedQuiz} onOpenChange={() => setSelectedQuiz(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto backdrop-blur-2xl bg-white/10 border border-white/20 shadow-2xl animate-popUp">
          <DialogHeader>
            <DialogTitle></DialogTitle>
          </DialogHeader>
          <QuizResult
            result={selectedQuiz}
            hideStartNew
            onStartNew={() => router.push("/interview/mock")}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
