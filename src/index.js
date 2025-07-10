import { createRoot } from 'react-dom/client';
import App from './app';
import Worker from "graphology-layout-forceatlas2/worker";
const domNode = document.getElementById('app');
const root = createRoot(domNode);
root.render(  <App />);