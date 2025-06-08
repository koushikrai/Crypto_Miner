
import React from 'react';

const Header = () => {
  return (
    <header className="text-center mb-8">
      <div className="flex items-center justify-center gap-4 mb-4">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-neon-blue via-neon-green to-gold bg-clip-text text-transparent">
          CRYPTO MINER
        </h1>
      </div>
      <p className="text-muted-foreground text-lg">
        Click to mine • Upgrade your rig • Earn coins passively
      </p>
    </header>
  );
};

export default Header;
