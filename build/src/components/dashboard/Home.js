import React, { useEffect } from 'react';
import "./scss/Home.scss"
import Navbar from './Navbar';
import Leaderboard from './Leaderboard';
import GameCards from './GameCards';
import styled from 'styled-components';
// import { enqueueSnackbar } from 'notistack'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Message = styled.p`
  font-size: 16px;
  text-align: center;
  margin-top: 20px;
`;

function Home() {
  const isMobile = window.innerWidth <= 768;
  useEffect(() => {
    const handleBeforeUnload = () => {
      // Perform any cleanup or reset actions here, such as resetting the socket connection
      window.location.reload(true); // Perform a hard refresh
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
  return (
    <div className="home">
      <Navbar />
      <Container>
        {isMobile ? (
          <div className="wrapper-mobile">
            <GameCards />
            <Leaderboard />

            {/* <Message>Mobile responsive version is under development. Stay tuned!</Message> */}
         </div>
        ) : (
          <div className="wrapper">
          <Leaderboard />
          <GameCards />
         </div>
        )}
    </Container>
    </div>
  )
}

export default Home