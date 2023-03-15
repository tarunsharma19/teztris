import React from 'react'
import './scss/GameCards.scss'
import pattern from '../../img/zigzag_small.png'

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
        <div className='createGame'>
            <div className='card'>
                <h1>Join Game</h1>
                <div className='center'>
                    <input type="text" placeholder='paste game ID here ...'></input>
                    <img src={pattern}></img>
                    <a href="#" class="orange-btn"> Join Game </a>
                </div>
                
            </div> 
            <div className='blue-btn'>
                Create Game
            </div>
        </div>
    </div>
  )
}

export default GameCards