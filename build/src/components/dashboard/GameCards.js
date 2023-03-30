import React from 'react'
import CreateGame from './CreateGame'
import JoinGame from './JoinGame'
import './scss/GameCards.scss'

function GameCards() {
  return (
    <div className='cardWrapper'>
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
        <JoinGame />
    </div>
  )
}

export default GameCards