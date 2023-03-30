import React from 'react';
import './scss/Profile.scss';
import UserProfile from './UserProfile';
import NFTs from './NFTs';
import MatchHistory from './MatchHistory';
import Navbar from '../dashboard/Navbar';

const Profile = () => {
  // Add your data for each component here
  const userProfileData = {
    profileImage: 'https://placehold.jp/800x800.png',
    userName: 'John Doe',
    walletAddress: '0xAbCdEfG123456789',
    totalWinnings: 1000,
    wins: 10,
    losses: 5
  };

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

  const matchHistoryData = [
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
      <UserProfile {...userProfileData} />
      <NFTs nfts={nftGalleryData} />
      <MatchHistory matches={matchHistoryData} />
    </div>
  );
}

export default Profile;
