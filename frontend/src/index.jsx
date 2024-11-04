import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; 
// import AppRoutes from './router';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import AppProvider from './context/_AppProvider';
import { CartProvider } from './context/CartContext'; 
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <CartProvider>
            <App />
        </CartProvider>
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);
