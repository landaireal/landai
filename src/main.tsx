import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { UserDataProvider } from './context/UserDataContext';
import { AuthProvider } from './context/AuthContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <LanguageProvider>
          <UserDataProvider>
            <App />
          </UserDataProvider>
        </LanguageProvider>
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
);