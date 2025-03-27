
import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import App from './App';
import './app/globals.css';
import { getCountryCode } from '../lib/utils'; // Using relative path instead of alias

// Debug log to check if getCountryCode is properly imported
console.log("getCountryCode function:", getCountryCode);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <App />
    </AppRouterCacheProvider>
  </React.StrictMode>
);
