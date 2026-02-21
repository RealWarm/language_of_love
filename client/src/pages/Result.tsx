import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { Heart, Share2, Home } from "lucide-react";

const loveLanguageTypes = [
    {
        type: "words",
        name: "인정의 말",
        description:
            "당신은 따뜻한 말과 진심 어린 표현을 통해 사랑을 느낍니다. 사소해 보이는 한마디 칭찬, '고마워', '수고했어', '나는 네가 자랑스러워' 같은 말이 오랫동안 마음에 남습니다. 상대가 자신의 감정을 솔직하고 다정하게 표현해 줄 때 깊은 안정감과 유대감을 느끼며, 말 한마디가 하루의 기분을 완전히 바꿔줄 수도 있습니다."
    },
    {
        type: "acts",
        name: "봉사의 행동",
        description:
            "당신은 말보다 행동에서 사랑을 느끼는 사람입니다. 힘들 때 묵묵히 곁에 있어주거나, 바쁜 날 대신 무언가를 도와주는 작은 배려가 큰 감동으로 다가옵니다. 상대가 시간을 들이고 노력을 기울여 당신을 위해 행동할 때, 그 안에서 진심과 사랑을 읽어냅니다. 당신에게 사랑은 '해주는 것'입니다."
    },
    {
        type: "gifts",
        name: "선물",
        description:
            "당신에게 선물은 단순한 물건이 아니라 마음의 표현입니다. 값비싼 것이 아니어도 괜찮습니다. 나를 떠올리며 고른 작은 선물, 예상치 못한 깜짝 이벤트 속에서 깊은 애정을 느낍니다. 당신은 그 물건 자체보다 '나를 생각해 준 시간과 마음'을 소중히 여깁니다."
    },
    {
        type: "time",
        name: "함께하는 시간",
        description:
            "당신은 온전히 나에게 집중해 주는 시간을 통해 사랑을 느낍니다. 핸드폰을 내려두고 눈을 맞추며 대화하는 순간, 함께 웃고 이야기 나누는 그 시간이 무엇보다 소중합니다. 짧더라도 진심이 담긴 시간은 당신에게 큰 의미가 되며, 함께한 추억이 관계를 단단하게 만든다고 믿습니다."
    },
    {
        type: "touch",
        name: "스킨십",
        description:
            "당신은 따뜻한 신체 접촉을 통해 사랑을 느낍니다. 손을 잡거나 가볍게 안아주는 행동, 어깨를 토닥여주는 작은 스킨십이 큰 위로가 됩니다. 말이 없어도 체온과 접촉을 통해 감정이 전달된다고 느끼며, 가까이에서 느끼는 온기가 당신에게는 가장 확실한 사랑의 신호입니다."
    }
];

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