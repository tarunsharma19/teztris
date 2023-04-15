import React, { useContext, useEffect, useState } from 'react'
import pattern from '../../img/zigzag_small.png'
import { manageFunc } from '../../App';
import { useSelector } from 'react-redux';



function JoinGame({ swapFunc }) {
  const socket = useSelector((state) => state.socket.socket); 
  const [uuid, setUuid] = useState('');
  const [response, setResponse] = useState(null);
  const [matchData, setMatchData] = useState(null);

  const {gameIdInput, setGameIdInput } = useContext(manageFunc);
  
  const handleGameIdInput = (event) =>{
    setUuid(event.target.value);
    socket.emit("wantsToJoin",{"uuid":event.target.value})
    console.log("socket emit done")
  }

  useEffect(()=>{
    if(socket){
      socket.on('match-found', (data)=>{
        setMatchData(data)
        setResponse(null)
      })
    }
  },[uuid])

  useEffect(()=>{
    if(socket){
      socket.on('status', (data) => {
        setResponse(`Error: ${data}`)
      });
    }
  })
  
  return (
    <div className='createGame'>
            <div className='card'>
                <div className='center'>
                <h1>Join Game</h1>
                    <input type="text" onChange={handleGameIdInput} placeholder='paste game ID here ...'></input>
                    
                    {
                      response ? response : matchData ? 
                      <div className='match-data'>
                      <p>
                        Room Name : {matchData.alias}
                        </p>
                      <span>
                      Amount : {matchData.tokenData.amount} {matchData.tokenData.betTokenName}
                      </span>
                      </div>: <img src={pattern}></img>
                    }
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