import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

console.log("ShopSmart: Initializing Neural Interface...");

const rootElement = document.getElementById('root');
if (!rootElement) {
    console.error("ShopSmart Critical Error: Root element not found in DOM.");
} else {
    ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}
