import React from 'react';
import "./scss/Home.scss"
import Navbar from './Navbar';
import Leaderboard from './Leaderboard';

function Home() {
  return (
    <div 
      className="home"
    >
    <Navbar />
    <div className="wrapper">
      <Leaderboard />
    </div>
    {/* <Leaderboard />
    <GameCards /> */}
    </div>
  )
}

export default Home