import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() =>
    typeof window !== 'undefined'
      ? localStorage.getItem('theme') || 'light'
      : 'light'
  );

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <button
      className="p-2 rounded-full bg-gray-200/70 dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700 transition shadow hover:bg-gray-300 dark:hover:bg-gray-700"
      onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <svg width="24" height="24" fill="none" stroke="gold" strokeWidth={2} viewBox="0 0 24 24" className="w-5 h-5"><path d="M17.657 16.657A8 8 0 018.343 7.343 8.001 8.001 0 0012 20a8.001 8.001 0 005.657-3.343z"></path></svg>
      ) : (
        <svg width="24" height="24" fill="none" stroke="orange" strokeWidth={2} viewBox="0 0 24 24" className="w-5 h-5"><circle cx="12" cy="12" r="5"/><path d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.24-6.24l-1.42 1.42m-9.9 9.9l-1.42 1.42m14.14 0l-1.42-1.42m-9.9-9.9l-1.42-1.42"/></svg>
      )}
    </button>
  );
};

export default ThemeToggle;
