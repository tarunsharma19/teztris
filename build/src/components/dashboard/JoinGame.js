import React, { useContext } from 'react'
import pattern from '../../img/zigzag_small.png'
import { manageFunc } from '../../App';



function JoinGame({ swapFunc }) {

  const {gameIdInput, setGameIdInput } = useContext(manageFunc);
  
  const handleGameIdInput = (event) =>{
    setGameIdInput(event.target.value);
  }
  
  return (
    <div className='createGame'>
            <div className='card'>
                <h1>Join Game</h1>
                <div className='center'>
                    <input type="text" onChange={handleGameIdInput} placeholder='paste game ID here ...'></input>
                    <img src={pattern}></img>
                    <a href="#" class="orange-btn"> Join Game </a>
                </div>
                
            </div> 
            <div className='blue-btn' onClick={()=>swapFunc(false)}>
                Create Game
            </div>
    </div>
  )
}

export default JoinGame