import React, { useState, useEffect } from 'react';
import { Trophy, User, Swords, Gift, Settings, Crown, Zap, Heart, Shield, Users, Star, Package, X } from "lucide-react";

// Типы для данных
interface Fighter {
  id: number;
  name: string;
  rarity: string;
  power: number;
  trophies: number;
  color: string;
  emoji: string;
  unlocked: boolean;
}

interface Skin {
  id: number;
  name: string;
  fighterId: number;
  rarity: string;
  price: number;
  emoji: string;
  unlocked: boolean;
}

const LobbyScreen = () => {
  // Состояния
  const [gems, setGems] = useState(547);
  const [coins, setCoins] = useState(3280);
  const [currentCharacter, setCurrentCharacter] = useState(0);
  const [showBox, setShowBox] = useState(false);
  const [boxAnimation, setBoxAnimation] = useState(false);
  const [reward, setReward] = useState<{type: string; value: number; name: string; rarity: string; emoji: string} | null>(null);
  const [activeTab, setActiveTab] = useState("fighters");
  const [notification, setNotification] = useState(2);
  
  // Данные бойцов
  const fighters: Fighter[] = [
    { id: 1, name: "Шелли", rarity: "начальный", power: 7, trophies: 328, color: "from-blue-500 to-blue-700", emoji: "🔫", unlocked: true },
    { id: 2, name: "Кольт", rarity: "редкий", power: 5, trophies: 215, color: "from-red-500 to-red-700", emoji: "🤠", unlocked: true },
    { id: 3, name: "Булл", rarity: "редкий", power: 6, trophies: 187, color: "from-green-600 to-green-800", emoji: "🦬", unlocked: true },
    { id: 4, name: "Бо", rarity: "супер редкий", power: 4, trophies: 156, color: "from-yellow-500 to-yellow-700", emoji: "🏹", unlocked: true },
    { id: 5, name: "Спайк", rarity: "легендарный", power: 3, trophies: 121, color: "from-green-500 to-green-700", emoji: "🌵", unlocked: true },
    { id: 6, name: "Ворон", rarity: "легендарный", power: 1, trophies: 0, color: "from-black to-gray-800", emoji: "🦅", unlocked: false },
    { id: 7, name: "Леон", rarity: "легендарный", power: 2, trophies: 54, color: "from-green-400 to-teal-600", emoji: "🦎", unlocked: true },
  ];
  
  // Данные скинов
  const skins: Skin[] = [
    { id: 1, name: "Бандитка Шелли", fighterId: 1, rarity: "редкий", price: 80, emoji: "👒", unlocked: false },
    { id: 2, name: "Рок-звезда Кольт", fighterId: 2, rarity: "редкий", price: 150, emoji: "🎸", unlocked: false },
    { id: 3, name: "Варвар Бык", fighterId: 3, rarity: "супер редкий", price: 300, emoji: "⚔️", unlocked: false },
    { id: 4, name: "Хо-хо-хо Бо", fighterId: 4, rarity: "эпический", price: 500, emoji: "🎅", unlocked: false },
  ];
  
  // Выбор текущего бойца
  const character = fighters[currentCharacter];
  
  // Функция перелистывания бойцов
  const changeCharacter = (direction: number) => {
    let newIndex = currentCharacter + direction;
    if (newIndex < 0) newIndex = fighters.length - 1;
    if (newIndex >= fighters.length) newIndex = 0;
    setCurrentCharacter(newIndex);
  };
  
  // Функция открытия ящика
  const openBox = () => {
    if (showBox) return;
    
    setShowBox(true);
    setTimeout(() => {
      setBoxAnimation(true);
      
      setTimeout(() => {
        // Случайная награда
        const rewardType = Math.random();
        if (rewardType < 0.5) {
          // Монеты (50% шанс)
          const amount = Math.floor(Math.random() * 50) + 10;
          setReward({ type: "coins", value: amount, name: "Монеты", rarity: "обычный", emoji: "🪙" });
          setCoins(prev => prev + amount);
        } else if (rewardType < 0.8) {
          // Очки силы (30% шанс)
          const amount = Math.floor(Math.random() * 5) + 1;
          setReward({ type: "power", value: amount, name: "Очки силы", rarity: "редкий", emoji: "⚡" });
        } else if (rewardType < 0.95) {
          // Гемы (15% шанс)
          const amount = Math.floor(Math.random() * 10) + 5;
          setReward({ type: "gems", value: amount, name: "Гемы", rarity: "эпический", emoji: "💎" });
          setGems(prev => prev + amount);
        } else {
          // Боец (5% шанс)
          const unlockedFighters = fighters.filter(f => !f.unlocked);
          if (unlockedFighters.length > 0) {
            const randomFighter = unlockedFighters[Math.floor(Math.random() * unlockedFighters.length)];
            setReward({ 
              type: "fighter", 
              value: randomFighter.id, 
              name: randomFighter.name, 
              rarity: randomFighter.rarity, 
              emoji: randomFighter.emoji 
            });
          } else {
            // Если все бойцы разблокированы, даем монеты
            const amount = Math.floor(Math.random() * 100) + 50;
            setReward({ type: "coins", value: amount, name: "Монеты", rarity: "обычный", emoji: "🪙" });
            setCoins(prev => prev + amount);
          }
        }
      }, 1500);
    }, 500);
  };
  
  // Закрытие окна с наградой
  const closeReward = () => {
    setReward(null);
    setBoxAnimation(false);
    setShowBox(false);
  };
  
  // Эффект мигания уведомлений
  useEffect(() => {
    const interval = setInterval(() => {
      setNotification(prev => prev === 2 ? 3 : 2);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#9365E2] to-[#5E3B92] p-4 flex flex-col overflow-x-hidden">
      {/* Шапка лобби */}
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <div className="w-12 h-12 rounded-full bg-primary-foreground flex items-center justify-center">
            <User className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h2 className="text-white font-bold">Игрок123</h2>
            <div className="flex items-center">
              <Trophy className="w-4 h-4 text-accent mr-1" fill="currentColor" />
              <span className="text-white/90 text-sm">4782</span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-2">
          <div className="flex items-center bg-black/20 px-3 py-1 rounded-full">
            <div className="w-5 h-5 rounded-full bg-yellow-400 mr-1 flex items-center justify-center">
              <span className="text-xs text-yellow-800">🪙</span>
            </div>
            <span className="text-white font-bold">{coins}</span>
          </div>
          
          <div className="flex items-center bg-black/20 px-3 py-1 rounded-full">
            <div className="w-5 h-5 rounded-full bg-purple-400 mr-1 flex items-center justify-center">
              <span className="text-xs text-purple-800">💎</span>
            </div>
            <span className="text-white font-bold">{gems}</span>
          </div>
          
          <button className="w-10 h-10 rounded-full bg-black/20 flex items-center justify-center">
            <Settings className="w-5 h-5 text-white" />
          </button>
        </div>
      </header>
      
      {/* Выбор бойца */}
      <div className="w-full mb-4">
        <div className="character-card h-52 w-full rounded-3xl overflow-hidden relative border-4 border-yellow-500 shadow-xl mb-2" 
             style={{background: `linear-gradient(to bottom, ${character.color.split(' ')[0].slice(5)}, ${character.color.split(' ')[2].slice(3)})`}}>
          <div className="absolute top-0 left-0 w-full p-3 flex justify-between items-start">
            <div className="bg-black/30 px-3 py-1 rounded-full">
              <span className="text-white font-bold">{character.name}</span>
            </div>
            <div className="flex flex-col items-end">
              <div className="bg-black/30 px-3 py-1 rounded-full mb-1">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" />
                  <span className="text-white font-bold">{character.rarity}</span>
                </div>
              </div>
              <div className="bg-black/30 px-3 py-1 rounded-full">
                <div className="flex items-center">
                  <Trophy className="w-4 h-4 text-accent mr-1" fill="currentColor" />
                  <span className="text-white font-bold">{character.trophies}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 w-full p-3">
            <div className="flex justify-between items-center">
              <button 
                className="w-10 h-10 rounded-full bg-black/40 flex items-center justify-center"
                onClick={() => changeCharacter(-1)}
              >
                <span className="text-white text-xl font-bold">←</span>
              </button>
              
              <div className="bg-black/30 px-4 py-2 rounded-full">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-400" fill="currentColor" />
                  <span className="text-white font-bold">Уровень {character.power}</span>
                </div>
              </div>
              
              <button 
                className="w-10 h-10 rounded-full bg-black/40 flex items-center justify-center"
                onClick={() => changeCharacter(1)}
              >
                <span className="text-white text-xl font-bold">→</span>
              </button>
            </div>
          </div>
          
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-28 h-28 bg-white/10 rounded-full flex items-center justify-center">
              <span className="text-5xl">{character.emoji}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Ящик */}
      <div className="relative mb-5">
        <button 
          onClick={openBox}
          className="bg-gradient-to-b from-yellow-500 to-yellow-600 w-full py-3 rounded-2xl flex items-center justify-center gap-3 shadow-lg border-2 border-yellow-400 hover:from-yellow-400 hover:to-yellow-500 transition-all"
        >
          <Package className="w-6 h-6 text-white" />
          <span className="text-white font-bold text-lg">БЕСПЛАТНЫЙ ЯЩИК</span>
          <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center animate-pulse">
            1
          </div>
        </button>
      </div>
      
      {/* Кнопки режимов */}
      <div className="flex flex-col gap-3 mb-auto">
        <button className="game-button bg-accent text-white text-xl flex justify-between items-center">
          <Swords className="w-6 h-6 mr-2" />
          ИГРАТЬ
          <div className="w-6 h-6" />
        </button>
        
        <div className="grid grid-cols-3 gap-3">
          <button className="game-button bg-secondary text-white relative">
            <span className="flex flex-col items-center justify-center">
              <Trophy className="w-5 h-5 mb-1" />
              Турниры
            </span>
            <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center animate-pulse">
              {notification}
            </div>
          </button>
          
          <button className="game-button bg-green-500 text-white">
            <span className="flex flex-col items-center justify-center">
              <Gift className="w-5 h-5 mb-1" />
              Магазин
            </span>
          </button>
          
          <button className="game-button bg-purple-500 text-white">
            <span className="flex flex-col items-center justify-center">
              <Users className="w-5 h-5 mb-1" />
              Клуб
            </span>
          </button>
        </div>
      </div>
      
      {/* Нижняя панель */}
      <div className="mt-4 bg-black/20 rounded-xl p-3">
        <div className="grid grid-cols-3 gap-2">
          <div className={`flex flex-col items-center p-2 rounded-xl ${activeTab === "fighters" ? "bg-purple-500/30" : ""}`}
               onClick={() => setActiveTab("fighters")}>
            <Heart className="w-6 h-6 text-accent mb-1" />
            <span className="text-white text-xs">Бойцы</span>
          </div>
          
          <div className={`flex flex-col items-center p-2 rounded-xl ${activeTab === "battles" ? "bg-purple-500/30" : ""}`}
               onClick={() => setActiveTab("battles")}>
            <Swords className="w-6 h-6 text-accent mb-1" />
            <span className="text-white text-xs">Битвы</span>
          </div>
          
          <div className={`flex flex-col items-center p-2 rounded-xl ${activeTab === "profile" ? "bg-purple-500/30" : ""}`}
               onClick={() => setActiveTab("profile")}>
            <Shield className="w-6 h-6 text-accent mb-1" />
            <span className="text-white text-xs">Профиль</span>
          </div>
        </div>
      </div>
      
      {/* Модальное окно ящика */}
      {showBox && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="relative">
            {!reward ? (
              <div className={`w-64 h-64 bg-gradient-to-b from-blue-500 to-blue-700 rounded-3xl flex items-center justify-center shadow-2xl ${boxAnimation ? 'animate-bounce' : ''}`}>
                <div className="w-40 h-40 bg-blue-600 rounded-2xl flex items-center justify-center border-4 border-yellow-400 shadow-inner">
                  <span className="text-8xl">📦</span>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center"
                     onClick={() => setShowBox(false)}>
                  <X className="w-5 h-5 text-white" />
                </div>
              </div>
            ) : (
              <div className="w-80 bg-gradient-to-b from-purple-500 to-purple-700 rounded-3xl p-6 flex flex-col items-center justify-center shadow-2xl animate-scale-in">
                <div className="text-2xl text-white font-bold mb-4">Награда!</div>
                
                <div className={`w-32 h-32 ${
                  reward.rarity === "легендарный" ? "bg-yellow-500" :
                  reward.rarity === "эпический" ? "bg-purple-400" :
                  reward.rarity === "супер редкий" ? "bg-blue-400" :
                  reward.rarity === "редкий" ? "bg-green-400" : "bg-gray-300"
                } rounded-full flex items-center justify-center mb-4 animate-pulse`}>
                  <span className="text-6xl">{reward.emoji}</span>
                </div>
                
                <div className="text-xl text-white font-bold mb-1">{reward.name}</div>
                <div className="text-white/70 mb-3">{reward.type === "fighter" ? reward.name : `${reward.value} ${reward.name}`}</div>
                <div className="px-3 py-1 bg-white/20 rounded-full text-white text-sm mb-6">{reward.rarity}</div>
                
                <button 
                  className="bg-green-500 text-white px-8 py-3 rounded-xl font-bold shadow-lg"
                  onClick={closeReward}
                >
                  КРУТО!
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LobbyScreen;
