
import React from 'react';
import { useGame } from './GameContext';

const UpgradeShop = () => {
  const { gameState, buyUpgrade, getUpgradeCost, formatNumber } = useGame();

  const upgrades = [
    {
      id: 'gpuLevel' as const,
      name: 'Graphics Card',
      description: '+2 coins/sec',
      icon: '🖥️',
      level: gameState.upgrades.gpuLevel,
      cost: getUpgradeCost('gpuLevel'),
      canAfford: gameState.coins >= getUpgradeCost('gpuLevel'),
    },
    {
      id: 'coolingLevel' as const,
      name: 'Cooling System',
      description: '+8 coins/sec',
      icon: '❄️',
      level: gameState.upgrades.coolingLevel,
      cost: getUpgradeCost('coolingLevel'),
      canAfford: gameState.coins >= getUpgradeCost('coolingLevel'),
    },
    {
      id: 'powerSupplyLevel' as const,
      name: 'Power Supply',
      description: '+30 coins/sec',
      icon: '🔋',
      level: gameState.upgrades.powerSupplyLevel,
      cost: getUpgradeCost('powerSupplyLevel'),
      canAfford: gameState.coins >= getUpgradeCost('powerSupplyLevel'),
    },
    {
      id: 'clickPowerLevel' as const,
      name: 'Mining Software',
      description: '+1 click power',
      icon: '💻',
      level: gameState.upgrades.clickPowerLevel,
      cost: getUpgradeCost('clickPowerLevel'),
      canAfford: gameState.coins >= getUpgradeCost('clickPowerLevel'),
    },
  ];

  const handleUpgrade = (upgradeId: typeof upgrades[0]['id']) => {
    buyUpgrade(upgradeId);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-neon-blue mb-6 flex items-center gap-2">
        <span>🛒</span>
        Mining Equipment Shop
      </h2>
      
      <div className="grid gap-4">
        {upgrades.map((upgrade) => (
          <div
            key={upgrade.id}
            className={`upgrade-card ${upgrade.canAfford ? 'animate-upgrade-glow' : 'opacity-60'}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-3xl">{upgrade.icon}</div>
                <div>
                  <h3 className="font-bold text-lg">{upgrade.name}</h3>
                  <p className="text-sm text-muted-foreground">{upgrade.description}</p>
                  <p className="text-xs text-neon-green">Level: {upgrade.level}</p>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-lg font-bold text-gold mb-2">
                  {formatNumber(upgrade.cost)} 🪙
                </div>
                <button
                  onClick={() => handleUpgrade(upgrade.id)}
                  disabled={!upgrade.canAfford}
                  className={`px-4 py-2 rounded-lg font-bold transition-all ${
                    upgrade.canAfford
                      ? 'bg-neon-green text-black hover:bg-green-400 hover:scale-105'
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {upgrade.canAfford ? 'UPGRADE' : 'NEED MORE'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpgradeShop;
