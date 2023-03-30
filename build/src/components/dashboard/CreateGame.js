import React from 'react'
import pattern from '../../img/zigzag_small.png'


function CreateGame() {
  return (
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
  )
}

export default CreateGame