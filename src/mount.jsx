import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/site.css';
import './styles/premium.css';

export function mount(Page) {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <Page />
    </StrictMode>
  );
}
