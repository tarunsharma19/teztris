import React from 'react'
import "./scss/Leaderboard.scss"

const LeaderboardStats = [
    {
        address : "tz1YvE7Sfo92ueEPEdZceNWd5MWNeMNSt16L",
        wins: 10,
        lose: 2,
    },
    {
        address : "tz1YvE7Sfo92ueEPEdZceNWd5MWNeMNSt16L",
        wins: 10,
        lose: 2,
        tezDomain : "tarunsh.tez"
    },
    {
        address : "tz1YvE7Sfo92ueEPEdZceNWd5MWNeMNSt16L",
        wins: 10,
        lose: 2,
        tezDomain : "tarunsh.tez"
    },
    {
        address : "tz1YvE7Sfo92ueEPEdZceNWd5MWNeMNSt16L",
        wins: 10,
        lose: 2,
        tezDomain : "tarunsh.tez"
    },
    {
        address : "tz1YvE7Sfo92ueEPEdZceNWd5MWNeMNSt16L",
        wins: 10,
        lose: 2,
        tezDomain : "tarunsh.tez"
    },
    {
        address : "tz1YvE7Sfo92ueEPEdZceNWd5MWNeMNSt16L",
        wins: 10,
        lose: 2,
        tezDomain : "tarunsh.tez"
    },
]

function Leaderboard() {
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
                                <div className="address">{player.address}</div>
                            </div>
                            :
                            <div className="playerDetails">
                                <div className="address noDomain">{player.address}</div>
                            </div>
                        }
                        
                        <div className="stats">
                            <div className="wins">{player.wins}</div>
                            <div className="lose">{player.lose}</div>
                        </div>
                    </div>
            ))}
        </div>
    </div>
  )
}

export default Leaderboard