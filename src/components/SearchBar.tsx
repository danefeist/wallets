import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  isFocused: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm, isFocused }) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        id="wallet-search"
        type="text"
        placeholder='Search wallets or folders... (Press "/" to focus)'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
          isFocused ? 'border-purple-500 ring-2 ring-purple-200' : 'border-gray-200'
        } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200`}
      />
      {!isFocused && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded">
            /
          </kbd>
        </div>
      )}
    </div>
  );
};