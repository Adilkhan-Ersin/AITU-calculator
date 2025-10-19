import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
// Importing the main App component and global styles
createRoot(document.getElementById('root')!).render(
    <App />
)
