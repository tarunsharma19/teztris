import React, { useState } from 'react'
import InputField from './InputField'
import pattern from '../../img/zigzag_small.png'


function CreateGame({swapFunc}) {

  const [tokenIndex , setTokenIndex] = useState(0);
  const [tokenAmount , setTokenAmount] = useState(0);
  const [alias , setAlisa] = useState("");


  console.log(tokenIndex,tokenAmount)

  return (
    <div className='createGame'>
            <div className='card'>
                <h1>Create Game</h1>
                <div className='center'>
                    <InputField placeholder="Bet token amount" setTokenIndex={setTokenIndex} setTokenAmount={setTokenAmount} tokenAmount={tokenAmount}/>
                    <input type="text" placeholder='Room name'></input>
                    <img className = "join" src={pattern}></img>
                    <a href="#" className="orange-btn"> Create Game </a>
                </div>
                
            </div> 
            <div className='blue-btn' onClick={()=>swapFunc(true)}>
                Join Game
            </div>
    </div>
  )
}

export default CreateGame