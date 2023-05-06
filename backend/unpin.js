const axios = require('axios');

export const pinataJWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIzYmZhZjkyZi0yOTEzLTQ3ZGEtOTYzMS1hNDQ4YzA0YWIwOWMiLCJlbWFpbCI6InRlenRyaXNlbWFpbEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiNzkzY2U2YWFhMzVkNTQzNjAzMzAiLCJzY29wZWRLZXlTZWNyZXQiOiIxYmIwMDUyODFhN2RmZWQxZTI3MzAxNTg3OWQxNTJhYjlmZWNmYmIwZGU1ZDhmZmQ1ZmE3NzFhOTkwNDMzODJhIiwiaWF0IjoxNjgzMzk3MzMxfQ.5DSWdsgezqcKIzvG_bczdvriTUsGPWMrhL3qpGOUmpc';

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
