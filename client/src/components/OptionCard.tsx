import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Option } from "@/lib/questions";

interface OptionCardProps {
  option: Option;
  onClick: () => void;
  index: number;
}

export function OptionCard({ option, onClick, index }: OptionCardProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "option-card w-full text-left p-5 md:p-6 rounded-2xl flex items-center group",
        "bg-white hover:bg-gradient-to-r hover:from-white hover:to-primary/5"
      )}
    >
      <div className="flex-1">
        <span className="text-lg md:text-xl font-medium text-foreground/80 group-hover:text-primary transition-colors">
          {option.text}
        </span>
      </div>
      <div className="w-8 h-8 rounded-full border-2 border-muted group-hover:border-primary/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
        <div className="w-4 h-4 rounded-full bg-primary" />
      </div>
    </motion.button>
  );
}
