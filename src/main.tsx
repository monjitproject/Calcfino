import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { RegionalSettingsProvider } from './context/RegionalSettingsContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RegionalSettingsProvider>
      <App />
    </RegionalSettingsProvider>
  </StrictMode>,
);
