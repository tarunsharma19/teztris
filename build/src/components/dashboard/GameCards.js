import React, { useContext, useState } from 'react'
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import CreateGame from './JoinGame'
import JoinGame from './CreateGame'
import './scss/GameCards.scss'
import PublicRooms from './PublicRooms';
import { manageFunc } from '../../App';

function GameCards() {
    const [createJoinSwap, setCreateJoinSwap] = useState(false);
    const { userWallet } = useContext(manageFunc);

  
    return (
      
        userWallet ? 
        <div className="cardWrapper">
          <PublicRooms />
          <SwitchTransition>
            <CSSTransition
              key={createJoinSwap ? 'CreateGame' : 'JoinGame'}
              addEndListener={(node, done) => {
                node.addEventListener('transitionend', done, false);
              }}
              classNames="slide"
            >
              {createJoinSwap ? (
                <CreateGame swapFunc={setCreateJoinSwap} />
              ) : (
                <JoinGame swapFunc={setCreateJoinSwap} />
              )}
            </CSSTransition>
          </SwitchTransition>
        </div>
        :
        <div className='wallet-connect-message'>
              <h3>Don't be a square! 
                <br /> 
                Connect your wallet to play Teztile and see your name at the
                 top of the leaderboard!</h3>
        </div>
      
    );
  }
  

            
export default GameCards