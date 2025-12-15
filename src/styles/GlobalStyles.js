import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    --bg-primary: #1a1d29;
    --bg-secondary: #282c3e;
    --text-primary: #e5e7eb;
    --text-secondary: #9ca3af;
    --accent-purple: #8b5cf6;
    --accent-purple-hover: #7c3aed;
  }
`;

export const theme = {
    colors: {
        bgPrimary: '#1a1d29',
        bgSecondary: '#282c3e',
        textPrimary: '#e5e7eb',
        textSecondary: '#9ca3af',
        accentPurple: '#8b5cf6',
        accentPurpleHover: '#7c3aed',
        success: '#10b981',
        danger: '#ef4444',
        warning: '#f59e0b',
    },
    spacing: {
        xs: '0.5rem',
        sm: '1rem',
        md: '1.5rem',
        lg: '2rem',
        xl: '3rem',
    },
    borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
    },
};