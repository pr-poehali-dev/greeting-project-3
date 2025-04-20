import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, User, Swords, Gift, Settings, Crown, Zap, Heart, Shield } from "lucide-react";

const LobbyScreen = () => {
  const [gems, setGems] = useState(547);
  const [coins, setCoins] = useState(3280);
  const [currentCharacter, setCurrentCharacter] = useState(0);
  
  const characters = [
    { name: "Спайк", rarity: "легендарный", power: 8, trophies: 328, color: "from-green-500 to-green-700" },
    { name: "Шелли", rarity: "начальный", power: 10, trophies: 621, color: "from-purple-500 to-purple-700" },
    { name: "Ворон", rarity: "легендарный", power: 7, trophies: 245, color: "from-black to-gray-800" }
  ];
  
  const character = characters[currentCharacter];
  
  const changeCharacter = (direction: number) => {
    let newIndex = currentCharacter + direction;
    if (newIndex < 0) newIndex = characters.length - 1;
    if (newIndex >= characters.length) newIndex = 0;
    setCurrentCharacter(newIndex);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/90 to-primary p-4 flex flex-col">
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
              <span className="text-xs text-yellow-800">$</span>
            </div>
            <span className="text-white font-bold">{coins}</span>
          </div>
          
          <div className="flex items-center bg-black/20 px-3 py-1 rounded-full">
            <div className="w-5 h-5 rounded-full bg-red-400 mr-1 flex items-center justify-center">
              <span className="text-xs text-red-800">💎</span>
            </div>
            <span className="text-white font-bold">{gems}</span>
          </div>
          
          <button className="w-10 h-10 rounded-full bg-black/20 flex items-center justify-center">
            <Settings className="w-5 h-5 text-white" />
          </button>
        </div>
      </header>
      
      {/* Выбор персонажа */}
      <div className="w-full mb-6">
        <div className="character-card bg-gradient-to-b h-60 w-full rounded-3xl overflow-hidden relative border-4 border-accent shadow-xl" style={{background: `linear-gradient(to bottom, ${character.color.split(' ')[0].slice(5)}, ${character.color.split(' ')[2].slice(3)})`}}>
          <div className="absolute top-0 left-0 w-full p-3 flex justify-between items-start">
            <div className="bg-black/30 px-3 py-1 rounded-full">
              <span className="text-white font-bold">{character.name}</span>
            </div>
            <div className="flex flex-col items-end">
              <div className="bg-black/30 px-3 py-1 rounded-full mb-1">
                <div className="flex items-center">
                  <Crown className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" />
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
            <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
              <span className="text-5xl">{character.name === "Спайк" ? "🌵" : character.name === "Шелли" ? "🔫" : "🦅"}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Кнопки режимов */}
      <div className="flex flex-col gap-3 mb-auto">
        <button className="game-button bg-accent text-white text-xl flex justify-between items-center">
          <Swords className="w-6 h-6 mr-2" />
          ИГРАТЬ
          <div className="w-6 h-6" />
        </button>
        
        <div className="grid grid-cols-3 gap-3">
          <button className="game-button bg-secondary text-white">
            <span className="flex flex-col items-center justify-center">
              <Trophy className="w-5 h-5 mb-1" />
              Турниры
            </span>
          </button>
          
          <button className="game-button bg-green-500 text-white">
            <span className="flex flex-col items-center justify-center">
              <Gift className="w-5 h-5 mb-1" />
              Магазин
            </span>
          </button>
          
          <button className="game-button bg-purple-500 text-white">
            <span className="flex flex-col items-center justify-center">
              <Crown className="w-5 h-5 mb-1" />
              Клуб
            </span>
          </button>
        </div>
      </div>
      
      {/* Нижняя панель */}
      <div className="mt-4 bg-black/20 rounded-xl p-3">
        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col items-center">
            <Heart className="w-6 h-6 text-accent mb-1" />
            <span className="text-white text-xs">Бойцы</span>
          </div>
          
          <div className="flex flex-col items-center">
            <Swords className="w-6 h-6 text-accent mb-1" />
            <span className="text-white text-xs">Битвы</span>
          </div>
          
          <div className="flex flex-col items-center">
            <Shield className="w-6 h-6 text-accent mb-1" />
            <span className="text-white text-xs">Профиль</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LobbyScreen;
