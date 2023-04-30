import React, { useContext, useEffect, useState } from 'react'
import pattern from '../../img/zigzag_small.png'
import { manageFunc } from '../../App';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { joinGame } from '../../api/operations/teztris';




function JoinGame({ swapFunc }) {
  const socket = useSelector((state) => state.socket.socket); 
  const [uuid, setUuid] = useState('');
  const [response, setResponse] = useState(null);
  const [matchData, setMatchData] = useState(null);
  const [startGameID , setStartGameID] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {gameIdInput, setGameIdInput , createdGame } = useContext(manageFunc);
  
  const handleGameIdInput = (event) =>{
    setUuid(event.target.value);
    socket.emit("wantsToJoin",{"uuid":event.target.value})
    // console.log("socket emit done")
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
        setMatchData(null)
        setResponse(`Error: ${data}`)
      });
    }
  })

  const handleJoinGame = async () =>{
    setLoading(true)
    if (!matchData){
      alert("no match data found")
      return
    }
    if (createdGame){
      alert("cant join a game, end your created game first!")
      return
    }
    const joinGameApi = await joinGame(matchData.tokenData.amount,matchData.tokenData.betToken,matchData.tokenData.betTokenId,matchData.tokenData.betTokenType,6,uuid);
    if (joinGameApi.success === true) {
    socket.emit('playerJoins', {"gameId":uuid})
    setGameIdInput(uuid)
    }
    setLoading(false)
  }

  // console.log(gameIdInput,"gameId")
  
  useEffect(()=>{
    if(socket){
      socket.on('start-game',(data)=>{
        setStartGameID(data._id)
      })
    }
  },[])

  useEffect(()=>{
    if((startGameID && gameIdInput) && (startGameID == gameIdInput)){
         navigate("/app", { replace: true });
    }
  },[startGameID,gameIdInput])

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
                    <a href="#" class="orange-btn" onClick={handleJoinGame}> 
                    Join Game 
                    </a>
                </div>
                
            </div> 
            <div className='blue-btn' onClick={()=>swapFunc(false)}>
                {loading?"Joining..":"Create Game"}
            </div>
    </div>
  )
}

export default JoinGame