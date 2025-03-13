import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { store } from './store/store.js';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { StrictMode } from 'react';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="/BlogReact/">
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
