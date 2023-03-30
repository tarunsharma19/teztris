import React from 'react';
const NFTs = ({nfts}) => {
  return (
    <div className="nft-gallery">
      <h2>NFT Gallery</h2>
      <div className="nft-container">
        {nfts.map((nft, index) => (
          <div key={index} className="nft">
            <img src={nft.image} alt={nft.name} />
            <p>{nft.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NFTs;
