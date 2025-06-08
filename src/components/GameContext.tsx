
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface GameState {
  coins: number;
  clickPower: number;
  coinsPerSecond: number;
  upgrades: {
    gpuLevel: number;
    coolingLevel: number;
    powerSupplyLevel: number;
    clickPowerLevel: number;
  };
  totalClicks: number;
  totalCoinsEarned: number;
}

interface GameContextType {
  gameState: GameState;
  clickMine: () => void;
  buyUpgrade: (upgradeType: keyof GameState['upgrades']) => boolean;
  getUpgradeCost: (upgradeType: keyof GameState['upgrades']) => number;
  formatNumber: (num: number) => string;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const initialGameState: GameState = {
  coins: 0,
  clickPower: 1,
  coinsPerSecond: 0,
  upgrades: {
    gpuLevel: 0,
    coolingLevel: 0,
    powerSupplyLevel: 0,
    clickPowerLevel: 0,
  },
  totalClicks: 0,
  totalCoinsEarned: 0,
};

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);

  // Load game state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('cryptoMiningGame');
    if (savedState) {
      setGameState(JSON.parse(savedState));
    }
  }, []);

  // Save game state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cryptoMiningGame', JSON.stringify(gameState));
  }, [gameState]);

  // Passive income generation
  useEffect(() => {
    if (gameState.coinsPerSecond > 0) {
      const interval = setInterval(() => {
        setGameState(prev => ({
          ...prev,
          coins: prev.coins + prev.coinsPerSecond,
          totalCoinsEarned: prev.totalCoinsEarned + prev.coinsPerSecond,
        }));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [gameState.coinsPerSecond]);

  const clickMine = () => {
    setGameState(prev => ({
      ...prev,
      coins: prev.coins + prev.clickPower,
      totalClicks: prev.totalClicks + 1,
      totalCoinsEarned: prev.totalCoinsEarned + prev.clickPower,
    }));
  };

  const getUpgradeCost = (upgradeType: keyof GameState['upgrades']): number => {
    const level = gameState.upgrades[upgradeType];
    const baseCosts = {
      gpuLevel: 50,
      coolingLevel: 200,
      powerSupplyLevel: 1000,
      clickPowerLevel: 100,
    };
    
    return Math.floor(baseCosts[upgradeType] * Math.pow(1.5, level));
  };

  const buyUpgrade = (upgradeType: keyof GameState['upgrades']): boolean => {
    const cost = getUpgradeCost(upgradeType);
    
    if (gameState.coins >= cost) {
      setGameState(prev => {
        const newUpgrades = { ...prev.upgrades };
        newUpgrades[upgradeType]++;
        
        let newClickPower = prev.clickPower;
        let newCoinsPerSecond = prev.coinsPerSecond;
        
        // Calculate new stats based on upgrade type
        switch (upgradeType) {
          case 'gpuLevel':
            newCoinsPerSecond = prev.coinsPerSecond + 2;
            break;
          case 'coolingLevel':
            newCoinsPerSecond = prev.coinsPerSecond + 8;
            break;
          case 'powerSupplyLevel':
            newCoinsPerSecond = prev.coinsPerSecond + 30;
            break;
          case 'clickPowerLevel':
            newClickPower = prev.clickPower + 1;
            break;
        }
        
        return {
          ...prev,
          coins: prev.coins - cost,
          clickPower: newClickPower,
          coinsPerSecond: newCoinsPerSecond,
          upgrades: newUpgrades,
        };
      });
      return true;
    }
    return false;
  };

  const formatNumber = (num: number): string => {
    if (num < 1000) return num.toFixed(0);
    if (num < 1000000) return (num / 1000).toFixed(1) + 'K';
    if (num < 1000000000) return (num / 1000000).toFixed(1) + 'M';
    return (num / 1000000000).toFixed(1) + 'B';
  };

  return (
    <GameContext.Provider value={{
      gameState,
      clickMine,
      buyUpgrade,
      getUpgradeCost,
      formatNumber,
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
