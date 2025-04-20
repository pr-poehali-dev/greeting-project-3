import { useState, useEffect } from 'react';
import LoadingScreen from "@/components/LoadingScreen";
import LobbyScreen from "@/components/LobbyScreen";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  
  // Инициализация аудио
  useEffect(() => {
    const audioElement = new Audio('/brawl-stars-music.mp3'); // Реальный путь к файлу должен быть заменен
    audioElement.loop = true;
    audioElement.volume = 0.5;
    setAudio(audioElement);
    
    return () => {
      if (audioElement) {
        audioElement.pause();
        audioElement.src = '';
      }
    };
  }, []);
  
  // Обработка завершения загрузки
  const handleLoadingComplete = () => {
    if (audio && !isAudioEnabled) {
      setIsAudioEnabled(true);
      audio.play().catch(error => {
        console.error("Автоматическое воспроизведение аудио заблокировано браузером:", error);
      });
    }
    setIsLoading(false);
  };
  
  // Переключатель звука
  const toggleAudio = () => {
    if (!audio) return;
    
    if (isAudioEnabled) {
      audio.pause();
    } else {
      audio.play().catch(error => {
        console.error("Воспроизведение аудио заблокировано браузером:", error);
      });
    }
    
    setIsAudioEnabled(!isAudioEnabled);
  };

  return (
    <div className="font-sans">
      {isLoading ? (
        <LoadingScreen onComplete={handleLoadingComplete} />
      ) : (
        <>
          <LobbyScreen />
          <button 
            onClick={toggleAudio}
            className="fixed bottom-4 right-4 z-50 w-10 h-10 rounded-full bg-black/30 flex items-center justify-center"
          >
            {isAudioEnabled ? "🔊" : "🔇"}
          </button>
        </>
      )}
    </div>
  );
};

export default Index;
