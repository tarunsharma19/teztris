import React, { useState } from 'react'
import InputField from './InputField'
import pattern from '../../img/zigzag_small.png'

import { useSelector } from 'react-redux';
import {v4 as uuidv4} from 'uuid';



function CreateGame({swapFunc}) {

  
  const socket = useSelector((state) => state.socket.socket); // get the socket object from the store

  const [tokenIndex , setTokenIndex] = useState(0);
  const [tokenAmount , setTokenAmount] = useState(0);
  const [alias , setAlisa] = useState("");
  const [gameID, setGameID] = useState("");
  
  
  const createGameHandle = async() =>{
    let tuid = uuidv4();
    setGameID(tuid);

    const createGameJson = {
      "uuid": tuid,
      "isPublic": true,
      "alias": alias,
      "obj": {
          "amount": tokenAmount,
          "betToken": "KT1Q4qRd8mKS7eWUgTfJzCN8RC6h9CzzjVJb",
          "betTokenType": "FA1.2",
          "betTokenId": tokenIndex,
          "betTokenName": "ctez"
      }
    }
    console.log(createGameJson)
    socket.emit("createNewGame", createGameJson);

  }

  const handleAlisa = (event) =>{
    setAlisa(event.target.value);
  }
  
  return (
    <div className='createGame'>
            <div className='card'>
                <h1>Create Game</h1>
                <div className='center'>
                    <InputField placeholder="Bet token amount" setTokenIndex={setTokenIndex} setTokenAmount={setTokenAmount} tokenAmount={tokenAmount}/>
                    <input type="text" onChange={handleAlisa} placeholder='Room name'></input>
                    <img className = "join" src={pattern}></img>
                    <a href="#" onClick={()=>createGameHandle()} className="orange-btn"> Create Game </a>
                </div>
                
            </div> 
            <div className='blue-btn' onClick={()=>swapFunc(true)}>
                Join Game
            </div>
    </div>
  )
}

export default CreateGame