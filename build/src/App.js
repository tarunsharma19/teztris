import React, { useState } from 'react';
import Tetris from './components/Tetris';
import Landing from './components/landing/Landing';
import StartGame from './components/StartGame';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { connectSocketThunk } from './api/socketSlice';
import Home from './components/dashboard/Home';
import Profile from './components/profile/Profile';
import { Provider } from 'react-redux';
import store from './api/store';

const manageFunc = React.createContext(null);

function App() {


  const [gameOver, setGameOver] = useState(false);
  const [gameIdInput, setGameIdInput] = useState('');
  const [userWallet, setUsetWallet] = useState(null);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <manageFunc.Provider value={{ gameOver, setGameOver, gameIdInput, setGameIdInput ,userWallet, setUsetWallet}}>
          <Routes>
            <Route path="/app" element={<Tetris />} />
            <Route path="/start" element={<StartGame />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/" element={<Landing />} />
          </Routes>
        </manageFunc.Provider>
      </BrowserRouter>
    </Provider>
  );
}

export { manageFunc, App };
