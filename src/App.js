import React, { useState } from 'react';
import Tetris from './components/Tetris';
import Landing from './components/Landing';
import StartGame from './components/StartGame';
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import { createContext } from 'react';
const manageFunc = createContext(null);

function App() {

  
  const [gameOver, setGameOver] = useState(false);
  return(
  <HashRouter>
  <manageFunc.Provider value={{gameOver, setGameOver}}>
    <Routes>
      <Route path="/app" element={<Tetris />}/>
      <Route path="/start" element={<StartGame />}/>
      <Route path="/" element ={<Landing />}/>
    </Routes>
  </manageFunc.Provider>
  </HashRouter>
);}

export  {App,manageFunc};
