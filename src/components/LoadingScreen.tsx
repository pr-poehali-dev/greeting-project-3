import { useState, useEffect } from 'react';

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#9365E2] to-[#5E3B92] p-4 overflow-hidden">
      <div className="w-full max-w-md text-center mb-8 relative">
        {/* Фоновые элементы */}
        <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-white/10 blur-xl"></div>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-yellow-400/10 blur-xl"></div>
        
        {/* Лого */}
        <div className="mb-8 inline-block relative">
          <div className="text-6xl font-extrabold text-white tracking-wider hero-shine mb-2 font-lilita">
            BRAWL STARS
          </div>
          <div className="absolute -top-4 -right-8">
            <div className="w-10 h-10 text-yellow-400 animate-pulse">⭐</div>
          </div>
          <div className="text-sm text-white/70 italic">от Supercell</div>
        </div>
        
        {/* Индикатор загрузки */}
        <div className="flex justify-center gap-3 mb-8">
          {[...Array(3)].map((_, i) => (
            <div 
              key={i}
              className="w-3 h-3 rounded-full bg-white/70"
              style={{
                animation: `bounce 1.5s ease-in-out ${i * 0.2}s infinite`
              }}
            />
          ))}
        </div>
        
        {/* Прогресс бар */}
        <div className="relative w-full mb-4">
          <div className="h-6 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm border border-white/20">
            <div 
              className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full transition-all duration-300 flex items-center justify-end pr-2"
              style={{ width: `${progress}%` }}
            >
              {progress > 15 && (
                <span className="text-xs font-bold text-yellow-900">{progress}%</span>
              )}
            </div>
          </div>
        </div>
        
        {/* Текст загрузки */}
        <div className="text-white/70 text-sm mt-3 mb-6 italic">
          {progress < 30 && "Подключение к серверам..."}
          {progress >= 30 && progress < 60 && "Загрузка бойцов..."}
          {progress >= 60 && progress < 90 && "Подготовка арены..."}
          {progress >= 90 && "Готово к бою!"}
        </div>
        
        {/* Вращающиеся иконки */}
        <div className="flex justify-center gap-6 mb-6">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center border-2 border-white/20 rotate-animation">
            🔫
          </div>
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center border-2 border-white/20 rotate-animation" style={{animationDelay: '0.2s'}}>
            💎
          </div>
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center border-2 border-white/20 rotate-animation" style={{animationDelay: '0.4s'}}>
            🏆
          </div>
        </div>
      </div>
      
      <div className="text-white/50 text-xs absolute bottom-4">
        © 2024 Supercell
      </div>
    </div>
  );
};

export default LoadingScreen;
