import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, Copy, ExternalLink } from 'lucide-react';
import type { Wallet as WalletType } from '../types/wallet';

interface WalletCardProps {
  wallet: WalletType;
}

export const WalletCard: React.FC<WalletCardProps> = ({ wallet }) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Wallet className="w-6 h-6 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-800">Wallet</h3>
        </div>
        <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-medium">
          {wallet.balance} SOL
        </span>
      </div>

      <div className="space-y-3">
        <div className="space-y-1">
          <label className="text-sm text-gray-500 font-medium">Public Key</label>
          <div className="flex items-center space-x-2">
            <code className="text-sm bg-gray-50 p-2 rounded flex-1 overflow-hidden overflow-ellipsis">
              {wallet.publicKey}
            </code>
            <button
              onClick={() => copyToClipboard(wallet.publicKey)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Copy className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm text-gray-500 font-medium">Private Key</label>
          <div className="flex items-center space-x-2">
            <code className="text-sm bg-gray-50 p-2 rounded flex-1 overflow-hidden overflow-ellipsis">
              {wallet.privateKey.substring(0, 20)}...
            </code>
            <button
              onClick={() => copyToClipboard(wallet.privateKey)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Copy className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="pt-2">
          <a
            href={`https://explorer.solana.com/address/${wallet.publicKey}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 text-sm font-medium"
          >
            <ExternalLink className="w-4 h-4" />
            <span>View on Explorer</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
};