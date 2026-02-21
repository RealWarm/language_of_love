import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import { questions, shuffleOptions, type OptionType } from "@/lib/questions";
import { ProgressBar } from "@/components/ProgressBar";
import { OptionCard } from "@/components/OptionCard";

export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<OptionType[]>([]);
  const [, setLocation] = useLocation();

  const currentQuestion = questions[currentQuestionIndex];

  // Memoize shuffled options so they don't reshuffle on re-renders, ONLY on question change
  const shuffledOptions = useMemo(() => {
    return shuffleOptions(currentQuestion.options);
  }, [currentQuestion.id]);

  const handleOptionClick = (type: OptionType) => {
    const newAnswers = [...answers, type];
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      // Delay slightly for visual feedback if desired, or instant
      setCurrentQuestionIndex((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Quiz finished
      // Pass answers in state location or localStorage? 
      // Wouter doesn't support state passing easily in URL without encoding.
      // We'll use localStorage to persist temporarily for the result page
      localStorage.setItem("quizAnswers", JSON.stringify(newAnswers));
      setLocation("/result");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center py-10 px-4 md:px-8 max-w-4xl mx-auto relative">
      <div className="w-full flex justify-between items-center mb-6">
        <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          질문 {currentQuestionIndex + 1} / {questions.length}
        </span>
      </div>

      <ProgressBar current={currentQuestionIndex + 1} total={questions.length} />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center leading-tight">
            {currentQuestion.text}
          </h2>

          <div className="grid grid-cols-1 gap-4">
            {shuffledOptions.map((option, idx) => (
              <OptionCard
                key={`${currentQuestion.id}-${option.type}`} // Unique key
                index={idx}
                option={option}
                onClick={() => handleOptionClick(option.type)}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
