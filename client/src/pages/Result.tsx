import { useEffect, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { 
  typeMapping, 
  typeDescriptions, 
  type OptionType 
} from "@/lib/questions";
import { useSubmitQuiz, useQuizStats } from "@/hooks/use-quiz";
import { Button } from "@/components/ui/button";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from "recharts";
import { Loader2, Share2, RefreshCcw } from "lucide-react";

type Counts = Record<OptionType, number>;

export default function Result() {
  const [result, setResult] = useState<{
    topType: OptionType;
    counts: Counts;
    total: number;
  } | null>(null);
  
  const submitQuiz = useSubmitQuiz();
  const { data: stats } = useQuizStats();

  useEffect(() => {
    const storedAnswers = localStorage.getItem("quizAnswers");
    if (!storedAnswers) {
      window.location.href = "/";
      return;
    }

    const answers = JSON.parse(storedAnswers) as OptionType[];
    
    // Calculate counts
    const counts: Counts = { A: 0, B: 0, C: 0, D: 0, E: 0 };
    answers.forEach(a => {
      if (counts[a] !== undefined) counts[a]++;
    });

    // Find winner
    let max = -1;
    let topType: OptionType = 'A';
    
    (Object.keys(counts) as OptionType[]).forEach(type => {
      if (counts[type] > max) {
        max = counts[type];
        topType = type;
      }
    });

    setResult({ topType, counts, total: answers.length });

    // Submit to backend
    submitQuiz.mutate({
      resultType: topType,
      answers: answers // Assuming backend schema accepts array of strings as jsonb
    });

    // Fire confetti
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const random = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval = window.setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  if (!result) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-10 h-10 animate-spin text-primary" />
    </div>
  );

  const chartData = (Object.keys(result.counts) as OptionType[]).map(type => ({
    name: type,
    fullName: typeMapping[type].split('(')[0].trim(),
    score: result.counts[type],
    color: type === result.topType ? "hsl(340, 85%, 65%)" : "hsl(20, 15%, 80%)"
  }));

  const sortedScores = (Object.keys(result.counts) as OptionType[])
    .map(type => ({
      type,
      name: typeMapping[type],
      score: result.counts[type]
    }))
    .sort((a, b) => b.score - a.score);

  return (
    <div className="min-h-screen w-full py-12 px-4 md:px-8 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className="text-xl md:text-2xl font-medium text-muted-foreground mb-4">
          당신의 사랑의 언어는?
        </h2>
        <div className="flex flex-col items-center gap-2 mb-8">
          {sortedScores.slice(0, 2).map((s, i) => (
            <h1 key={s.type} className={`${i === 0 ? 'text-4xl md:text-6xl' : 'text-2xl md:text-3xl'} font-bold text-foreground`}>
              {i + 1}위 : <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                {s.name}
              </span>
            </h1>
          ))}
        </div>
        
        <div className="space-y-8 text-left mb-12">
          {sortedScores.map((s) => (
            <div key={s.type} className="glass-card p-8 rounded-3xl shadow-xl">
              <h3 className="text-2xl font-bold mb-4 text-primary">
                {s.name} ({s.score}점)
              </h3>
              <p className="text-lg leading-relaxed text-foreground/80 whitespace-pre-wrap">
                {s.type === result.topType && `제1의 언어가 <${s.name}>인 경우는 `}
                {typeDescriptions[s.type]}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Chart Section */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-6 rounded-3xl shadow-lg border border-border"
        >
          <h3 className="text-lg font-bold mb-6 text-center">항목별 점수</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <XAxis dataKey="fullName" axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="score" radius={[8, 8, 8, 8]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Community Stats Section */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-secondary/30 p-6 rounded-3xl border border-border flex flex-col justify-center"
        >
          <h3 className="text-lg font-bold mb-6 text-center">전체 통계</h3>
          {stats ? (
             <div className="space-y-4">
               {stats.sort((a, b) => b.count - a.count).slice(0, 5).map((stat, idx) => {
                 const total = stats.reduce((acc, curr) => acc + curr.count, 0);
                 const percent = Math.round((stat.count / total) * 100) || 0;
                 return (
                   <div key={stat.type} className="flex items-center gap-3">
                     <span className="font-mono font-bold w-6">{idx + 1}</span>
                     <div className="flex-1">
                       <div className="flex justify-between text-sm mb-1">
                         <span className="font-medium">{typeMapping[stat.type as OptionType] || stat.type}</span>
                         <span className="text-muted-foreground">{percent}%</span>
                       </div>
                       <div className="h-2 bg-white rounded-full overflow-hidden">
                         <div 
                           className="h-full bg-foreground/80 rounded-full" 
                           style={{ width: `${percent}%` }} 
                         />
                       </div>
                     </div>
                   </div>
                 );
               })}
             </div>
          ) : (
            <div className="flex justify-center py-10">
              <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
          )}
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex gap-4 justify-center"
      >
        <Link href="/">
          <Button variant="outline" size="lg" className="rounded-full px-8 h-14 text-base border-2">
            <RefreshCcw className="mr-2 h-4 w-4" /> 다시 시작하기
          </Button>
        </Link>
        <Button 
          size="lg" 
          className="rounded-full px-8 h-14 text-base shadow-xl shadow-primary/20"
          onClick={() => {
            navigator.clipboard.writeText(`나의 사랑의 언어는 ${typeMapping[result.topType]}! 여기서 확인해보세요: ${window.location.origin}`);
            alert("링크가 복사되었습니다!");
          }}
        >
          <Share2 className="mr-2 h-4 w-4" /> 결과 공유하기
        </Button>
      </motion.div>
    </div>
  );
}
