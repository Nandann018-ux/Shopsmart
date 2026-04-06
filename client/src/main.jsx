import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

console.log("UrbanGear: Initializing Neural Interface...");

const rootElement = document.getElementById('root');
if (!rootElement) {
    console.error("UrbanGear Critical Error: Root element not found in DOM.");
} else {
    ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}
