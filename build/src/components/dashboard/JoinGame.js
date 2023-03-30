import React from 'react'
import InputField from './InputField'
import pattern from '../../img/zigzag_small.png'


function JoinGame() {
  return (
    <div className='createGame'>
            <div className='card'>
                <h1>Create Game</h1>
                <div className='center'>
                    <InputField placeholder={"Bet token amount"}/>
                    <input type="text" placeholder='Room name'></input>
                    <img src={pattern}></img>
                    <a href="#" class="orange-btn"> Create Game </a>
                </div>
                
            </div> 
            <div className='blue-btn'>
                Join Game
            </div>
    </div>
  )
}

export default JoinGame