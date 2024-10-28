import { useEffect, useCallback } from 'react';
import hotkeys from 'hotkeys-js';

export const useSearch = (setSearchFocused: (focused: boolean) => void) => {
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.key === '/' && !event.ctrlKey && !event.metaKey) {
      event.preventDefault();
      const searchInput = document.getElementById('wallet-search');
      if (searchInput) {
        searchInput.focus();
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    
    hotkeys('/', function(event) {
      event.preventDefault();
      setSearchFocused(true);
    });

    hotkeys('esc', function() {
      setSearchFocused(false);
      const searchInput = document.getElementById('wallet-search');
      if (searchInput) {
        searchInput.blur();
      }
    });

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      hotkeys.unbind('/');
      hotkeys.unbind('esc');
    };
  }, [handleKeyPress, setSearchFocused]);
};