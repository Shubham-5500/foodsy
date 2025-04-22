import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() =>
    typeof window !== 'undefined'
      ? localStorage.getItem('theme') || 'light'
      : 'light'
  );

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (!localStorage.getItem('theme')) {
        setTheme(mediaQuery.matches ? 'dark' : 'light');
      }
    };

    if (!localStorage.getItem('theme')) {
      handleChange();
    }

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <Toggle
      pressed={theme === 'dark'}
      onPressedChange={(pressed) => setTheme(pressed ? 'dark' : 'light')}
      aria-label="Toggle theme"
      className="p-2 rounded-full bg-white/90 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200"
    >
      {theme === 'dark' ? (
        <Moon className="h-5 w-5 text-yellow-400" />
      ) : (
        <Sun className="h-5 w-5 text-orange-400" />
      )}
    </Toggle>
  );
};

export default ThemeToggle;
