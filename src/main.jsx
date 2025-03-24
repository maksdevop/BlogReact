import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { store } from './store/store.js';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { StrictMode } from 'react';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </StrictMode>
);
