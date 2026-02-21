import { Link } from "wouter";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[100px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="glass-card max-w-2xl w-full rounded-3xl p-8 md:p-16 text-center z-10"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-primary/20 rotate-3"
        >
          <Heart className="w-10 h-10 text-white fill-white" />
        </motion.div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground tracking-tight">
          당신의 <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">사랑의 언어는?</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-lg mx-auto">
          당신이 사랑을 주고받는 방식을 확인해보세요. 30개의 질문을 통해 당신의 주요 사랑의 언어를 찾아드립니다.
        </p>

        <Link href="/quiz">
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 rounded-full bg-foreground text-background hover:bg-foreground/90 hover:scale-105 transition-all shadow-xl shadow-black/10"
          >
            테스트 시작하기
          </Button>
        </Link>
      </motion.div>
      
      <p className="mt-8 text-sm text-muted-foreground/60">
        5가지 사랑의 언어(5 Love Languages) 개념을 바탕으로 합니다.
      </p>
    </div>
  );
}
