import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { UiProvider } from './context/contexts/UiContext';
import { UserProvider } from './context/contexts/UserContext';
import { JournalProvider } from './context/contexts/JournalContext';
import { FiltersProvider } from './context/contexts/FiltersContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UiProvider>
      <UserProvider>
        <JournalProvider>
          <FiltersProvider>
            <App />
          </FiltersProvider>
        </JournalProvider>
      </UserProvider>
    </UiProvider>
  </React.StrictMode>
);
