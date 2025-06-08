
import React, { useState } from 'react';
import { useGame } from './GameContext';

const MiningButton = () => {
  const { clickMine, gameState } = useGame();
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    clickMine();
    
    // Create particle effect
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newParticle = {
      id: Date.now() + Math.random(),
      x,
      y,
    };
    
    setParticles(prev => [...prev, newParticle]);
    
    // Remove particle after animation
    setTimeout(() => {
      setParticles(prev => prev.filter(p => p.id !== newParticle.id));
    }, 1000);
  };

  return (
    <div className="relative flex justify-center">
      <button
        onClick={handleClick}
        className="mining-button animate-mining-pulse relative overflow-hidden group w-80 h-80"
      >
        <div className="relative z-10 flex flex-col items-center justify-center h-full">
          <div className="text-8xl mb-4">⛏️</div>
          <div className="text-3xl font-bold mb-2">MINE</div>
          <div className="text-lg opacity-80">+{gameState.clickPower} coins</div>
        </div>
        
        {/* Particles */}
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute text-gold font-bold text-2xl pointer-events-none animate-bounce"
            style={{
              left: particle.x,
              top: particle.y,
              animation: 'coinFloat 1s ease-out forwards',
            }}
          >
            +{gameState.clickPower}
          </div>
        ))}
      </button>
    </div>
  );
};

export default MiningButton;
