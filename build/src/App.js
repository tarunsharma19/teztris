import React from 'react';
import Tetris from './components/Tetris';
import Landing from './components/Landing';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/app" element={<Tetris />}/>
      <Route path="/" element ={<Landing />}/>
    </Routes>
  </BrowserRouter>
);

export default App;
