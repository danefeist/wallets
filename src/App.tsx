import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet as WalletIcon } from 'lucide-react';
import { FolderGroup } from './components/FolderGroup';
import { SearchBar } from './components/SearchBar';
import { useSearch } from './hooks/useSearch';
import type { Wallet } from './types/wallet';

const FOLDERS = ['Personal', 'Business', 'Trading', 'DeFi', 'Gaming'];

function App() {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalBalance, setTotalBalance] = useState(0);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useSearch(setIsSearchFocused);

  useEffect(() => {
    const loadWallets = async () => {
      try {
        const response = await fetch('/src/data/wallets.json');
        const data = await response.json();
        setWallets(data);
        setTotalBalance(data.reduce((sum: number, wallet: Wallet) => sum + wallet.balance, 0));
      } catch (error) {
        console.error('Error loading wallets:', error);
      }
    };

    loadWallets();
  }, []);

  const filteredWallets = wallets.filter(wallet => 
    wallet.publicKey.toLowerCase().includes(searchTerm.toLowerCase()) ||
    wallet.folder.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const walletsByFolder = FOLDERS.reduce((acc, folder) => {
    acc[folder] = filteredWallets.filter(w => w.folder === folder);
    return acc;
  }, {} as Record<string, Wallet[]>);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <WalletIcon className="w-8 h-8 text-purple-600" />
              <h1 className="text-3xl font-bold text-gray-900">Solana Wallet Manager</h1>
            </div>
            <div className="bg-purple-100 px-4 py-2 rounded-lg">
              <span className="text-purple-600 font-semibold">
                Total Balance: {totalBalance.toFixed(2)} SOL
              </span>
            </div>
          </div>

          <SearchBar 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            isFocused={isSearchFocused}
          />
        </motion.div>

        <div className="space-y-8">
          {FOLDERS.map(folder => (
            walletsByFolder[folder].length > 0 && (
              <FolderGroup
                key={folder}
                name={folder}
                wallets={walletsByFolder[folder]}
              />
            )
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;