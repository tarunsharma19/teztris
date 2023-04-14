import React, { useEffect, useState } from 'react'
import "./scss/Leaderboard.scss"
import axios from "axios";


// const LeaderboardStats = [
//     {
//         address : "tz1YvE7Sfo92ueEPEdZceNWd5MWNeMNSt16L",
//         wins: 10,
//         lose: 2,
//         highScore: 1200
//     },
//     {
//         address : "tz1YvE7Sfo92ueEPEdZceNWd5MWNeMNSt16L",
//         wins: 10,
//         lose: 2,
//         tezDomain : "tarunsh.tez"
//     },
//     {
//         address : "tz1YvE7Sfo92ueEPEdZceNWd5MWNeMNSt16L",
//         wins: 10,
//         lose: 2,
//         tezDomain : "tarunsh.tez"
//     },
//     {
//         address : "tz1YvE7Sfo92ueEPEdZceNWd5MWNeMNSt16L",
//         wins: 10,
//         lose: 2,
//         tezDomain : "tarunsh.tez"
//     },
//     {
//         address : "tz1YvE7Sfo92ueEPEdZceNWd5MWNeMNSt16L",
//         wins: 10,
//         lose: 2,
//         tezDomain : "tarunsh.tez"
//     },
//     {
//         address : "tz1YvE7Sfo92ueEPEdZceNWd5MWNeMNSt16L",
//         wins: 10,
//         lose: 2,
//         tezDomain : "tarunsh.tez"
//     },
// ]



function Leaderboard() {
    const [LeaderboardStats, setLeaderboard] = useState([]);
    const getLeaderboard = async () =>{
        const res = await axios.get(
            "http://localhost:8080/api/leaderboard"
          );
        const data = res.data.users; 
        const formattedResponse = data.map(player => ({
            address: player._id,
            wins: player.won,
            lose: player.lost,
            highScore: player.highScore,
          }))
        return formattedResponse;
    }
    
    useEffect(()=>{
        getLeaderboard().then((r)=>setLeaderboard(r))
    },[])


  return (
    <div className='card'>
        <h1>Leaderboard</h1>
        <div className="list">
            {
                LeaderboardStats.map((player,i)=>(
                    <div className="player">
                        {
                            (i>=3)?<div className="rank">#{i+1}</div>:<div className="rank top">#{i+1}</div>
                        }
                        {
                            (player.tezDomain)?
                            <div className="playerDetails">
                                <div className="tezDomain">{player.tezDomain}</div>
                                <div className="address">{player.address.slice(0,5)}...{player.address.slice(-4)}</div>
                            </div>
                            :
                            <div className="playerDetails">
                                <div className="address noDomain">{player.address.slice(0,5)}...{player.address.slice(-4)}</div>
                            </div>
                        }
                        <div className='score'> 
                            <p>{player.highScore}</p>
                        </div>
                        <div className="stats">
                            <div className="wins">{player.wins} won</div>
                            <div className="lose">{player.lose} lost</div>
                        </div>
                    </div>
            ))}
        </div>
    </div>
  )
}

export default Leaderboard