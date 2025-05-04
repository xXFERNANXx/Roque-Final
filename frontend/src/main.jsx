import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Router } from 'wouter';
import './index.css';
import App from './App';
import Navbar from './navbar';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router base='/MundoAnime'>
        <div>
          <Navbar />
          <App />
        </div>
      </Router>
    </QueryClientProvider>
  </StrictMode>
);