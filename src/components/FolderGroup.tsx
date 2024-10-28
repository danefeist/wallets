import React from 'react';
import { motion } from 'framer-motion';
import { Folder } from 'lucide-react';
import { WalletCard } from './WalletCard';
import type { Wallet } from '../types/wallet';

interface FolderGroupProps {
  name: string;
  wallets: Wallet[];
}

export const FolderGroup: React.FC<FolderGroupProps> = ({ name, wallets }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Folder className="w-5 h-5 text-purple-600" />
        <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
        <span className="text-sm text-gray-500">({wallets.length} wallets)</span>
      </div>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
      >
        {wallets.map((wallet) => (
          <WalletCard key={wallet.publicKey} wallet={wallet} />
        ))}
      </motion.div>
    </div>
  );
};