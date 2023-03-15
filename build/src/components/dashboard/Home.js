import React from 'react';
import "./scss/Home.scss"
import Navbar from './Navbar';
import Leaderboard from './Leaderboard';
import GameCards from './GameCards';

function Home() {
  return (
    <div 
      className="home"
    >
    <Navbar />
    <div className="wrapper">
      <Leaderboard />
      <GameCards />
    </div>
    {/* <Leaderboard />
    <GameCards /> */}
    </div>
  )
}

export default Home