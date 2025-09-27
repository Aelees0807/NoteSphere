import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export default function Layout({ children }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -z-10 background-animate"></div>
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-black/10 dark:bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-black/20 dark:hover:bg-white/20 transition-all duration-300"
        >
          {theme === 'light' ? <Moon size={20} className="text-charcoal-blue" /> : <Sun size={20} className="text-yellow-300" />}
        </button>
      </div>
      <main className="relative z-10">
        {children}
      </main>
    </div>
  );
}