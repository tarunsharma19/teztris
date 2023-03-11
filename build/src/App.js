import React, { useState } from 'react';
import Tetris from './components/Tetris';
import Landing from './components/landing/Landing';
import StartGame from './components/StartGame';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createContext } from 'react';
import Home from './components/homepage/Home';

const manageFunc = createContext(null);

function App() {

  
  const [gameOver, setGameOver] = useState(false);
  const [gameIdInput, setGameIdInput] = useState('');

  
  return(
  <BrowserRouter>
  <manageFunc.Provider value={{gameOver, setGameOver,gameIdInput, setGameIdInput}}>
    <Routes>
      <Route path="/app" element={<Tetris />}/>
      <Route path="/start" element={<StartGame />}/>
      <Route path="/home" element={<Home />}/>
      <Route path="/" element ={<Landing />}/>
    </Routes>
  </manageFunc.Provider>
  </BrowserRouter>
);}

export  {App,manageFunc};
