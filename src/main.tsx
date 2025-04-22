import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const getInitialTheme = () => {
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
    
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
};

const applyTheme = (theme: string) => {
  document.documentElement.classList.toggle('dark', theme === 'dark');
};

applyTheme(getInitialTheme());

createRoot(document.getElementById("root")!).render(<App />);
