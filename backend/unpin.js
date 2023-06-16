const axios = require('axios');
require('dotenv').config();

export const pinataJWT = process.env.PINATA_JWT;

async function unpinAllFiles() {
  try {
    // Get a list of pinned files
    const response = await axios.get('https://api.pinata.cloud/data/pinList?status=pinned', {
      headers: {
        'Authorization': `Bearer ${pinataJWT}`
      }
    });

    const pinList = response.data.rows;
    
    // Unpin each file
    for (const pin of pinList) {
      await axios.delete(`https://api.pinata.cloud/pinning/unpin/${pin.ipfs_pin_hash}`, {
        headers: {
          'Authorization': `Bearer ${pinataJWT}`
        }
      });
      
      console.log(`Unpinned file: ${pin.ipfs_pin_hash}`);
    }

    console.log('All files unpinned successfully.');
  } catch (error) {
    console.error('Error occurred while unpinning files:', error.response.data);
  }
}

unpinAllFiles();
