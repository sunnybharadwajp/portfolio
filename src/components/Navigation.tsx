'use client';

import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';

export default function Navigation() {
  const { theme, toggleTheme } = useTheme();

  function handleThemeToggle() {
    toggleTheme();
  }

  return (
    <nav>
      <div className="left">
        <div className="slot-machine"></div>
      </div>
      <div className="right">
        <button onClick={handleThemeToggle}>
          <div className="nav-button">
            {theme === 'dark' ? <Sun /> : <Moon />}
          </div>
        </button>
      </div>
    </nav>
  );
}
