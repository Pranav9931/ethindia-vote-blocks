import React from 'react';
import './App.css';

import { Routes, Route } from "react-router-dom"
import { HomePage, PollVotePage } from './pages';
import { Footer, NavbarComponent } from './components';

function App() {
  return (
    
    <div className="App">
      <Routes>
        <Route path="/poll/vote" element={<>
          <NavbarComponent />
          <HomePage />
          <Footer />
        </>} />
        <Route path="/" element={<PollVotePage />} />
        <Route path="/poll" element={<PollVotePage />} />
        {/* <Route path="/poll/vote" element={<VotingPage />} /> */}
      </Routes>

    </div>
  );
}

export default App;
