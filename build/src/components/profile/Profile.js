import React, { useContext, useEffect, useState } from 'react';
import './scss/Profile.scss';
import UserProfile from './UserProfile';
import NFTs from './NFTs';
import MatchHistory from './MatchHistory';
import Navbar from '../dashboard/Navbar';
import axios from "axios";
import {manageFunc} from '../../App'

const Profile = () => {
  const { userWallet } = useContext(manageFunc);

  // Add your data for each component here

  const demoProfile = {
      "status": 200,
      "message": "Fetched leaderboard successfully",
      "me": {
          "_id": "loading..",
          "highScore": 0,
          "won": 0,
          "lost": 0,
          "createdAt": "2023-04-18T11:36:58.847Z"
      },
      "myGames": [
          {
              "tokenData": {
                  "amount": null,
                  "betToken": "KT1Q4qRd8mKS7eWUgTfJzCN8RC6h9CzzjVJb",
                  "betTokenId": 0,
                  "betTokenType": "FA1.2",
                  "betTokenName": ""
              },
              "_id": "123e4567-e89b-12d3-a456-426614174000",
              "alias": "test1",
              "isPublic": true,
              "me": "tz1PZmgQj6fmaucqpavsvoZEjyagmJqbumyn",
              "meFinished": false,
              "opponentFinished": false,
              "scoreMe": null,
              "scoreOpponent": null,
              "opponent": "",
              "status": "refund",
              "createdAt": "",
              "updatedAt": "2023-04-18T11:38:10.448Z",
              "__v": 0,
              "refundReason": "User ordered the refund"
          }
      ],
      "winnings": [
          {
              "_id": {
                  "betToken": "KT1Q4qRd8mKS7eWUgTfJzCN8RC6h9CzzjVJb",
                  "betTokenId": 0
              },
              "totalAmountWon": 0
          }
      ],
      "loosings": [
          {
              "_id": {
                  "betToken": "KT1Q4qRd8mKS7eWUgTfJzCN8RC6h9CzzjVJb",
                  "betTokenId": 0
              },
              "totalAmountLost": 0
          }
      ]
  }

  const[profile,setProfile] = useState(demoProfile);


  const getProfile = async () =>{
      if(userWallet){
        console.log("inside profile")
        const res = await axios.get(
            // `http://localhost:8080/api/profile?id=${userWallet}`
            `http://localhost:8080/api/profile?id=tz1PZmgQj6fmaucqpavsvoZEjyagmJqbumyn`
          );
        const data = res.data; 
        console.log("data",data)
        setProfile(data)
      }
      // const formattedResponse = data.map(player => ({
      //     address: player._id,
      //     wins: player.won,
      //     lose: player.lost,
      //     highScore: player.highScore,
      //   }))
      // return formattedResponse;
  }

  useEffect(()=>{
    getProfile()
  },[userWallet])

  const userProfileData = {
    profileImage: 'https://placehold.jp/800x800.png',
    userName: 'John Doe',
    walletAddress: profile.me._id || '0xAbCdEfG123456789',
    totalWinnings: profile.me.highScore || 0,
    wins: profile.me.won,
    losses: profile.me.lost
  };

  function checkResult(a,b){
    if(a>b){
      return "won"
    }
    else{
      return "lost"
    }
  }
  const matchHistoryData = profile.myGames.map(data => ({
    opponent: data.opponent,
    dateTime: data.createdAt,
    result: checkResult(data.scoreMe , data.scoreOpponent),
    amount: data.tokenData.amount + " " + data.tokenData.betTokenName,
  }))

  console.log(profile.myGames)

  const nftGalleryData = [
    {
      image: 'https://placehold.jp/800x800.png',
      name: 'NFT One'
    },
    {
      image: 'https://placehold.jp/800x800.png',
      name: 'NFT Two'
    },
    {
      image: 'https://placehold.jp/800x800.png',
      name: 'NFT Three'
    },
    {
      image: 'https://placehold.jp/800x800.png',
      name: 'NFT Four'
    }
  ];

  const matchHistoryDataa = [
    {
      opponent: 'Player 1',
      dateTime: '2023-03-29 15:30',
      result: 'Win',
      amount: 100
    },
    {
      opponent: 'Player 1',
      dateTime: '2023-03-29 15:30',
      result: 'Win',
      amount: 100
    },
    {
      opponent: 'Player 1',
      dateTime: '2023-03-29 15:30',
      result: 'Win',
      amount: 100
    },
    {
      opponent: 'Player 1',
      dateTime: '2023-03-29 15:30',
      result: 'Win',
      amount: 100
    },
    {
      opponent: 'Player 2',
      dateTime: '2023-03-28 18:45',
      result: 'Lose',
      amount: -50
    },
    {
      opponent: 'Player 3',
      dateTime: '2023-03-27 21:15',
      result: 'Win',
      amount: 150
    }
  ];

  return (
    <div className="app">
        <Navbar />
        {
          profile ? 
          <>
          <UserProfile {...userProfileData} />
          <NFTs nfts={nftGalleryData} />
          <MatchHistory matches={matchHistoryData} />
          </>:
          <></>
        }
    </div>
  );
}

export default Profile;
