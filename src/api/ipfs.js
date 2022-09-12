import { NFTStorage, File } from 'nft.storage'
import {fs} from 'fs';
const client = new NFTStorage({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDUwZjMzQjRCNjkyQWYyN2U4Nzg2NUU2YzVjQTgwOTk3MGQ1NWFCRkQiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2MTYyODgyMDE1NiwibmFtZSI6InRlenRyaXMifQ.cngXS0iRdCZO3mWRsbQg2w8ESe68iQNtIfiNjDsrg8k' })

export const ipfsWrapper = async (wallet, imageCID ) =>  {

    try {

        let data = {};

            data.name = "TezTris Winner NFT";
            data.description = "This NFT signifies a win in the game of TezTris!";
            data.artifactUri = imageCID;
            data.displayUri = imageCID;
            data.thumbnailUri = imageCID;
            data.decimals = 0 ;

            data.attributes= [
                {
                  "name": "TezTris Winner",
                  "value": wallet
                },
                {
                  "name": "Position",
                  "value": "Winner"
                }
              ];

              data.creators =  [
                "tz1NaGu7EisUCyfJpB16ktNxgSqpuMo8aSEk"
              ];
              data.isBooleanAmount = false;
              data.symbol = "TEZTRIS";
              data.rights =  "All right reserved.";
              data.shouldPreferSymbol = true;


              const final = JSON.stringify(data);



              var config = {
                method: 'post',
                url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
                headers: { 
                  'Content-Type': 'application/json', 
                  pinata_api_key: 'c98008ccad0a8398468f',
                  pinata_secret_api_key: 'b925e8a94f1aa1dbb8bd85a376ac527847daa4d3bd3a37aaa2e84e83c905d19e',
                },
                data : final
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


export const uploadImageToIPFS = async (image) =>  {

    try {
        let metadata = await client.store(
            image
        );

        console.log(metadata);

        return{
            sucess : true,
            metadata
        };

    } catch (error) {
        console.log(error);
        return{
            sucess:false,
        };
        
    }

}