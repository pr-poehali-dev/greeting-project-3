import { useState, useEffect } from 'react';
import { Progress } from "@/components/ui/progress";
import { Star, Trophy, ZapIcon } from "lucide-react";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  
  // Симулируем загрузку
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.floor(Math.random() * 10);
        if (newProgress >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onComplete();
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 300);
    
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-primary to-secondary p-4">
      <div className="w-full max-w-md text-center mb-8">
        <div className="mb-6 inline-block relative">
          <div className="text-6xl font-bold text-white tracking-wider hero-shine mb-2">
            BATTLE ARENA
          </div>
          <div className="absolute -top-4 -right-4">
            <Star className="w-10 h-10 text-accent animate-pulse" fill="currentColor" />
          </div>
        </div>
        
        <div className="flex justify-center gap-3 mb-12">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i}
              className="w-2 h-2 rounded-full bg-white/50"
              style={{
                animation: `pulse 1.5s ease-in-out ${i * 0.2}s infinite`
              }}
            />
          ))}
        </div>
        
        <div className="relative w-full mb-2">
          <div className="h-8 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-accent rounded-full transition-all duration-300 flex items-center justify-end pr-2"
              style={{ width: `${progress}%` }}
            >
              {progress > 15 && (
                <ZapIcon className="w-5 h-5 text-white animate-bounce" />
              )}
            </div>
          </div>
          <div className="absolute -top-1 -left-1">
            <Trophy className="w-10 h-10 text-accent" fill="currentColor" />
          </div>
        </div>
        
        <div className="text-white font-medium">
          Загружено: {progress}%
        </div>
        
        <div className="text-white/70 text-sm mt-3 italic">
          {progress < 30 && "Подготовка арены..."}
          {progress >= 30 && progress < 60 && "Загрузка бойцов..."}
          {progress >= 60 && progress < 90 && "Настройка способностей..."}
          {progress >= 90 && "Готовимся к бою!"}
        </div>
      </div>
      
      <div className="text-white/50 text-xs absolute bottom-4">
        © 2024 Battle Arena Studios
      </div>
    </div>
  );
};

export default LoadingScreen;
