"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";

export default function PerformanceChart({ assessments }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (assessments) {
      const formattedData = assessments.map((assessment) => ({
        date: format(new Date(assessment.createdAt), "MMM dd"),
        score: assessment.quizScore,
      }));
      setChartData(formattedData);
    }
  }, [assessments]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Card className="backdrop-blur-xl bg-white/10 dark:bg-gray-900/40 border border-white/10 shadow-lg hover:shadow-2xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Performance Trend
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Your quiz scores over time
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <defs>
                  {/* Sky blue glowing gradient */}
                  <linearGradient id="glowLine" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.95} />
                    <stop offset="100%" stopColor="#0ea5e9" stopOpacity={0.2} />
                  </linearGradient>

                  {/* Glow filter effect */}
                  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.08)"
                />

                <XAxis
                  dataKey="date"
                  tick={{ fill: "var(--muted-foreground)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  domain={[0, 100]}
                  tick={{ fill: "var(--muted-foreground)" }}
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip
                  cursor={{ strokeDasharray: "3 3", stroke: "#38bdf8" }}
                  content={({ active, payload }) => {
                    if (active && payload?.length) {
                      return (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="bg-white/10 dark:bg-gray-800/70 border border-white/20 backdrop-blur-md rounded-lg px-3 py-2 shadow-lg"
                        >
                          <p className="text-sm font-semibold text-white">
                            Score:{" "}
                            <span className="text-sky-300">
                              {payload[0].value}%
                            </span>
                          </p>
                          <p className="text-xs text-gray-300 mt-1">
                            {payload[0].payload.date}
                          </p>
                        </motion.div>
                      );
                    }
                    return null;
                  }}
                />

                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="url(#glowLine)"
                  strokeWidth={4}
                  filter="url(#glow)"
                  dot={{
                    r: 6,
                    strokeWidth: 2,
                    fill: "#38bdf8",
                    stroke: "#fff",
                    filter: "url(#glow)",
                  }}
                  activeDot={{
                    r: 8,
                    fill: "#0ea5e9",
                    stroke: "#fff",
                    strokeWidth: 2,
                    filter: "url(#glow)",
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
