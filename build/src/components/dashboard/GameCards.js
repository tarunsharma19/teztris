import React, { useState } from 'react'
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import CreateGame from './JoinGame'
import JoinGame from './CreateGame'
import './scss/GameCards.scss'

function GameCards() {
    const [createJoinSwap, setCreateJoinSwap] = useState(false);
  
    return (
      <div className="cardWrapper">
        <div className='card'>
                <h1>Public Room</h1>
                <div className='roomsTable'>
                <table>
                    <tr>
                        <th>Room Name</th>
                        <th>Bet Amount</th>
                    </tr>
                    <tr className='row'>
                        <td>room one </td>
                        <td className='amount'>12 tez </td>
                        <td className='button'>
                            <button>Join</button>
                        </td>
                    </tr>
                    <tr className='row'>
                        <td>room one </td>
                        <td className='amount'>12 tez </td>
                        <td className='button'>
                            <button>Join</button>
                        </td>
                    </tr>
                    <tr className='row'>
                        <td>room one </td>
                        <td className='amount'>12 tez </td>
                        <td className='button'>
                            <button>Join</button>
                        </td>
                    </tr>
                
                    </table>
                </div>

            </div>
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