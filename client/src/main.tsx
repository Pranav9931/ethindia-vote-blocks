import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {ThirdwebProvider} from "@thirdweb-dev/react"
import { CeloAlfajoresTestnet } from "@thirdweb-dev/chains";

import { BrowserRouter } from "react-router-dom";

import { StateContextProvider } from './context/stateContextAPI';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThirdwebProvider
    activeChain={ CeloAlfajoresTestnet } 
    clientId={process.env.VITE_CLIENT_ID} // You can get a client id from dashboard settings
    >
    <StateContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StateContextProvider>
    </ThirdwebProvider>
  </React.StrictMode>
);
