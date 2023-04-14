import React, { useContext, useEffect, useState } from 'react'
import InputField from './InputField'
import pattern from '../../img/zigzag_small.png'

import { useSelector } from 'react-redux';
import {v4 as uuidv4} from 'uuid';
import { useNavigate } from 'react-router-dom';
import { manageFunc } from '../../App';



function CreateGame({swapFunc}) {

  
  const socket = useSelector((state) => state.socket.socket); 
  const {gameIdInput, setGameIdInput } = useContext(manageFunc);
  const [tokenIndex , setTokenIndex] = useState(0);
  const [tokenAmount , setTokenAmount] = useState(0);
  const [alias , setAlisa] = useState("");
  const [createGameEmit, setCreateGameEmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>{
    if(createGameEmit){
      alert("createGameEmit Done")
    }
  },[createGameEmit])

  const tokens = [{
    betToken: "KT1Uw1oio434UoWFuZTNKFgt5wTM9tfuf7m7",
    betTokenId: 0,
    betTokenType: "tez",
    betTokenDecimal: 6,
    betTokenName: "tez"
  },
  {
    betToken: "KT1Q4qRd8mKS7eWUgTfJzCN8RC6h9CzzjVJb",
    betTokenId: 0,
    betTokenType: "FA1.2",
    betTokenDecimal: 6,
    betTokenName: "ctez"
  },
  {
    betToken: "KT1Uw1oio434UoWFuZTNKFgt5wTM9tfuf7m7",
    betTokenId: 3,
    betTokenType: "FA2",
    betTokenDecimal: 6,
    betTokenName: "USDT"
  }
  ]
  const delay = ms => new Promise(res => setTimeout(res, ms));
  const createGameHandle = async() =>{
    if (createGameEmit){
      alert("Game already exisit")
      return
    }
    setLoading(true)
    let tuid = uuidv4();
    setGameIdInput(tuid);

    const createGameJson = {
      "uuid": tuid,
      "isPublic": true,
      "alias": alias,
      "obj": {
          "amount": tokenAmount,
          "betToken": tokens[tokenIndex].betToken,
          "betTokenType": tokens[tokenIndex].betTokenType,
          "betTokenId": tokens[tokenIndex].betTokenId,
          "betTokenName": tokens[tokenIndex].betTokenName
      }
    }
    console.log(createGameJson)
    await delay(2000)
    // call create game function
    // socket.emit("createNewGame", createGameJson);
    setCreateGameEmit(true);
    setLoading(false)
  }
  // navigate("/app", { replace: true });

  const handleAlisa = (event) =>{
    setAlisa(event.target.value);
  }
  
  return (
    <div className='createGame'>
            <div className='card'>
                <div className='center'>
                <h1>Create Game</h1>
                    <InputField placeholder="Bet token amount" setTokenIndex={setTokenIndex} setTokenAmount={setTokenAmount} tokenAmount={tokenAmount}/>
                    <input className='room-name-input' type="text" onChange={handleAlisa} placeholder='Room name'></input>
                    { createGameEmit ? 
                        <div className='game-details'>
                          <p>Game created,
                            <br />waiting for opponent to join</p>
                          <span>{gameIdInput}</span>
                       </div> : 
                       <img className = "join" src={pattern}></img>}
                    
                    <a href="#" onClick={()=>createGameHandle()} className="orange-btn">
                      {
                      loading ? "Loading..." : createGameEmit? "Please Wait" : "Create Game"
                      }
                    </a>
                </div>
                
            </div> 
            <div className='blue-btn' onClick={()=>swapFunc(true)}>
                Join Game
            </div>
    </div>
  )
}

export default CreateGame