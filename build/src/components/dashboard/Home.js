import React from 'react';
import "./scss/Home.scss"
import Navbar from './Navbar';
import Leaderboard from './Leaderboard';
import GameCards from './GameCards';
import { SnackbarProvider, enqueueSnackbar } from 'notistack'

function Home() {
  return (
    <div className="home">
      <SnackbarProvider />
      <Navbar />
      <button onClick={() => enqueueSnackbar('That was easy!', {anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'right'
  }})}>Show snackbar</button>
      <div className="wrapper">
        <Leaderboard />
        <GameCards />
      </div>
    </div>
  )
}

export default Home