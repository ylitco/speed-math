import React  from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.scss';
import { StateProvider } from 'src/state';
import { Views } from './views/Views';

function App() {
  return (
    <StateProvider>
      <Router>
        <Views />
      </Router>
    </StateProvider>
  );
}

export default App;
