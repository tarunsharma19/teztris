const axios = require("axios");
var FormData = require('form-data');
var fs = require('fs');

const jsonToPinata = async (json) =>  {

    console.log('inside JSON to pinata');
    try {

        const data = JSON.stringify(json);

        var config = {
            method: 'post',
            url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
            headers: { 
              'Content-Type': 'application/json', 
              pinata_api_key: 'b3498a79e38ad9976889',
              pinata_secret_api_key: '9a2f2023676072c70f96288aed2ada6ef8a676331362e308e02882521286e09f',
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
                    pinata_api_key: 'b3498a79e38ad9976889',
                    pinata_secret_api_key: '9a2f2023676072c70f96288aed2ada6ef8a676331362e308e02882521286e09f',
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

            data.name = "TezTris NFT";
            data.description = "This NFT certifies that you have won a game of TezTris! Have fun flexing it!";
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
              data.symbol = "TRIZ";
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
