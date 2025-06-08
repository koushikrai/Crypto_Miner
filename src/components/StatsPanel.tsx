
import React from 'react';
import { useGame } from './GameContext';

const StatsPanel = () => {
  const { gameState, formatNumber } = useGame();

  const stats = [
    {
      label: 'Total Coins',
      value: formatNumber(gameState.coins),
      icon: '🪙',
      color: 'text-gold',
    },
    {
      label: 'Coins Per Second',
      value: formatNumber(gameState.coinsPerSecond),
      icon: '⚡',
      color: 'text-neon-blue',
    },
    {
      label: 'Click Power',
      value: formatNumber(gameState.clickPower),
      icon: '💪',
      color: 'text-neon-green',
    },
    {
      label: 'Total Clicks',
      value: formatNumber(gameState.totalClicks),
      icon: '👆',
      color: 'text-purple-400',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <div key={stat.label} className="stats-card group hover:scale-105 transition-transform">
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl">{stat.icon}</span>
            <div className={`text-2xl font-bold ${stat.color} group-hover:neon-glow transition-all`}>
              {stat.value}
            </div>
          </div>
          <div className="text-sm text-muted-foreground font-medium">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsPanel;
