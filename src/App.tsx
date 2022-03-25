import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import './App.scss';
import { Start } from 'src/views/Start/Start';
import { MainSettings } from 'src/views/MainSettings/MainSettings';
import { About } from 'src/views/About/About';
import { GameSettings } from 'src/views/GameSettings/GameSettings';
import { Game } from 'src/views/Game/Game';
import { Statistics } from 'src/views/Statistics/Statistics';
import { Explanation } from 'src/views/Explanation/Explanation';
import { Header } from 'src/components/Header/Header';
import { Overview } from 'src/views/Overview/Overview';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/start" element={<Start />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/main-settings" element={<MainSettings />} />
        <Route path="/about" element={<About />} />
        <Route path="/game-settings" element={<GameSettings />} />
        <Route path="/game" element={<Game />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/explanation" element={<Explanation />} />
        <Route path="*" element={<Navigate to="/start" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
