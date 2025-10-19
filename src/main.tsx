import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Define the variable name for your Google Tag ID
// Vite uses 'VITE_' prefix for public environment variables
const GA_ID = import.meta.env.VITE_GA_ID; 

// Only inject the Google Tag if the ID exists (i.e., when deployed)
if (GA_ID) {
  // 1. Inject the main gtag script source
  const scriptSrc = document.createElement('script');
  scriptSrc.async = true;
  scriptSrc.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(scriptSrc);

  // 2. Inject the gtag initialization script
  const scriptInit = document.createElement('script');
  scriptInit.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_ID}');
  `;
  document.head.appendChild(scriptInit);
}

// ... rest of your main.tsx code (e.g., ReactDOM.createRoot, rendering your app)

// Importing the main App component and global styles
createRoot(document.getElementById('root')!).render(
    <App />
)
