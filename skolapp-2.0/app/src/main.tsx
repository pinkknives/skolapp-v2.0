import React from 'react';
import { createRoot } from 'react-dom/client';
import { RootApp } from './App';
import './styles.css';
import './register-sw';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root element #root not found');
}

createRoot(container).render(<RootApp />);
