
import React from 'react';
import { GameProvider } from '../components/GameContext';
import Header from '../components/Header';
import StatsPanel from '../components/StatsPanel';
import MiningButton from '../components/MiningButton';
import UpgradeShop from '../components/UpgradeShop';

const Index = () => {
  return (
    <GameProvider>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <Header />
          
          <StatsPanel />
          
          {/* Mining Section - Centered and Larger */}
          <div className="flex flex-col items-center space-y-12 mb-12">
            <div className="stats-card text-center w-full max-w-2xl">
              <h2 className="text-3xl font-bold text-neon-blue mb-8">Mining Operation</h2>
              <MiningButton />
              <div className="mt-6 text-lg text-muted-foreground">
                Click the mining button to earn coins!
              </div>
            </div>
          </div>
          
          {/* Upgrade Shop - Full Width Below Mining */}
          <div className="stats-card max-w-4xl mx-auto">
            <UpgradeShop />
          </div>
          
          {/* Footer */}
          <footer className="text-center mt-12 text-muted-foreground text-sm">
            <p>💡 Tip: Keep mining to unlock powerful upgrades!</p>
          </footer>
        </div>
      </div>
    </GameProvider>
  );
};

export default Index;
