const axios = require("axios");
var FormData = require('form-data');
var fs = require('fs');

const pinataJWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIzYmZhZjkyZi0yOTEzLTQ3ZGEtOTYzMS1hNDQ4YzA0YWIwOWMiLCJlbWFpbCI6InRlenRyaXNlbWFpbEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiNzkzY2U2YWFhMzVkNTQzNjAzMzAiLCJzY29wZWRLZXlTZWNyZXQiOiIxYmIwMDUyODFhN2RmZWQxZTI3MzAxNTg3OWQxNTJhYjlmZWNmYmIwZGU1ZDhmZmQ1ZmE3NzFhOTkwNDMzODJhIiwiaWF0IjoxNjgzMzk3MzMxfQ.5DSWdsgezqcKIzvG_bczdvriTUsGPWMrhL3qpGOUmpc';

const jsonToPinata = async (json) =>  {

    console.log('inside JSON to pinata');
    try {

        const data = JSON.stringify(json);

        var config = {
            method: 'post',
            url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
            headers: { 
              'Content-Type': 'application/json', 
              'Authorization': `Bearer ${pinataJWT}`
            },
            data : data
          };
          
          const res = await axios(config);
        return{
            sucess : true,
            Ipfs : res.data.IpfsHash,
        };

    } catch (error) {
        console.log(error);
        return{
            sucess:false,
            Ipfs : "",
        };
        
    }

}

const sendFileToIPFS = async () => {

    console.log('inside send file');

        try {

            const fileImg = fs.createReadStream('./trial-0.png');

            const formData = new FormData();
            formData.append("file", fileImg);

            const resFile = await axios({
                method: "post",
                url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                data: formData,
                headers: {
                    'Authorization': `Bearer ${pinataJWT}`,
                    "Content-Type": "multipart/form-data"
                },
            });

            const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
         console.log(ImgHash); 

         return{
            sucess : true,
            Ipfs : ImgHash,
        };

        } catch (error) {
            console.log("Error sending File to IPFS: ")
            console.log(error)
            return{
                sucess : false,
                Ipfs : "",
            };
        }
    }

const pinataWrapper = async (player1 , player2 , amount, image) =>  {

    console.log('inside pinata wrapper');

    try {
        let data = {};

            data.name = "TezTile NFT";
            data.description = "This NFT certifies that you have won a game of TezTile! Have fun flexing it!";
            data.artifactUri = image;
            data.displayUri = image;
            data.thumbnailUri = image;
            data.decimals = 0 ;

            data.attributes = [
              {
                "name": "Winner",
                "value": player1,
              },
              {
                "name": "Loser",
                "value": player2,
              }
              ,
              {
                "name": "Amount",
                "value": amount,
              }
            ];
            
            data.creators =  [
                "tz1NaGu7EisUCyfJpB16ktNxgSqpuMo8aSEk"
              ];
            data.isBooleanAmount = false;
              data.symbol = "TILE";
              data.rights =  "All right reserved.";
              data.shouldPreferSymbol = true;

        const res = await jsonToPinata(data);
        return{
            sucess : true,
            Ipfs : res.Ipfs,
        };

    } catch (error) {
        console.log(error);
        return{
            sucess:false,
            Ipfs : "",
        };
        
    }

}

module.exports = {sendFileToIPFS , pinataWrapper};
