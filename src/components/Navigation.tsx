'use client';

import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { useEffect, useState } from 'react';

export default function Navigation() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  function handleThemeToggle() {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  if (!mounted) {
    return null;
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
