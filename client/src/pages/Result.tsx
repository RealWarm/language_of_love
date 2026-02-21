import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { loveLanguageTypes } from "@shared/schema";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { Heart, Share2, Home } from "lucide-react";

export default function Results() {
    const [, setLocation] = useLocation();
    const answers = JSON.parse(localStorage.getItem("quizAnswers") || "[]");

    if (!answers.length) {
        setLocation("/");
        return null;
    }

    // === 결과 계산 (프론트에서 직접) ===
    const scoreMap: Record<string, number> = {};
    answers.forEach((answer: any) => {
        scoreMap[answer.type] = (scoreMap[answer.type] || 0) + 1;
    });

    const sortedResults = Object.entries(scoreMap).sort((a, b) => b[1] - a[1]);
    const topType = sortedResults[0][0];
    const topScore = sortedResults[0][1];

    const resultType = loveLanguageTypes.find(type => type.type === topType);

    // 차트 데이터
    const chartData = Object.entries(scoreMap).map(([type, score]) => ({
        type: loveLanguageTypes.find(t => t.type === type)?.name || type,
        score,
        fullMark: 10,
    }));

    const shareResults = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: "My Love Language Results",
                    text: `My primary love language is ${resultType?.name}! 💕`,
                    url: window.location.href,
                });
            } catch (error) {
                console.log("Error sharing:", error);
            }
        }
    };

    const restartQuiz = () => {
        localStorage.removeItem("quizAnswers");
        setLocation("/");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 p-4">
            <div className="max-w-4xl mx-auto py-8">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-3xl shadow-xl p-8 text-center mb-8"
                >
                    <Heart className="w-16 h-16 mx-auto mb-4 text-pink-500" />
                    <h1 className="text-3xl font-bold mb-2">Your Love Language</h1>
                    <h2 className="text-2xl font-semibold text-pink-600 mb-4">
                        {resultType?.name}
                    </h2>
                    <p className="text-gray-600 mb-6">
                        {resultType?.description}
                    </p>
                    <div className="text-lg font-medium text-purple-600">
                        Score: {topScore}
                    </div>
                </motion.div>

                {/* Chart Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-3xl shadow-xl p-8 mb-8"
                >
                    <h3 className="text-xl font-bold text-center mb-6">
                        Your Love Language Breakdown
                    </h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart data={chartData}>
                                <PolarGrid />
                                <PolarAngleAxis dataKey="type" />
                                <PolarRadiusAxis />
                                <Radar dataKey="score" fill="#ec4899" fillOpacity={0.6} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Action Buttons */}
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                    <Button
                        onClick={shareResults}
                        className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600"
                    >
                        <Share2 className="w-4 h-4" />
                        Share Results
                    </Button>

                    <Button
                        onClick={restartQuiz}
                        variant="outline"
                        className="flex items-center gap-2"
                    >
                        <Home className="w-4 h-4" />
                        Take Again
                    </Button>
                </div>

            </div>
        </div>
    );
}