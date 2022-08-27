import { NFTStorage, File } from 'nft.storage'
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

        let metadata = await client.store(
            data
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