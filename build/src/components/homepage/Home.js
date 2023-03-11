import React from 'react';
import "./scss/Home.scss"
import Navbar from './Navbar';

function Home() {
  return (
    <div 
      className="home"
    >
    <Navbar />
    {/* <Leaderboard />
    <GameCards /> */}
    </div>
  )
}

export default Home