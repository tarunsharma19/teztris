import React from 'react';

const UserProfile = ({profileImage, userName, walletAddress, totalWinnings, wins, losses}) => {
  return (
    <div className="user-profile">
  <img src={profileImage} alt="Profile" className="profile-image" />
  <div className="user-details">
    <h1>{userName}</h1>
    <p>{walletAddress}</p>
    <p>Total winnings: {totalWinnings}</p>
  </div>
  <div className="wins-losses">
    <div className="wins">
      <span>{wins}</span>
      <span>Wins</span>
    </div>
    <div className="losses">
      <span>{losses}</span>
      <span>Losses</span>
    </div>
  </div>
</div>

  );
};

export default UserProfile;
