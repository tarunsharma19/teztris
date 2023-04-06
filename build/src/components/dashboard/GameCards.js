import React, { useState } from 'react'
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import CreateGame from './JoinGame'
import JoinGame from './CreateGame'
import './scss/GameCards.scss'
import PublicRooms from './PublicRooms';

function GameCards() {
    const [createJoinSwap, setCreateJoinSwap] = useState(false);
  
    return (
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
    );
  }
  

            
export default GameCards