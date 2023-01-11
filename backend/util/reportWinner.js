const TezosToolkit = require("@taquito/taquito");
const char2Bytes = require("@taquito/utils");
const InMemorySigner = require("@taquito/signer");

module.exports = async (
    gameID,
    winner,
    metadata
) => {

    try {
        const Tezos = new TezosToolkit.TezosToolkit("https://rpc.tzkt.io/ghostnet/");
        Tezos.setProvider({
            signer: new InMemorySigner.InMemorySigner('edskRyL3DyJr8HsJiVi9WSKtHfKPrbsSV7AMAoNYLV4ehMbWxRHYXCa6QmAfYAvL4x5BTBuYyLVBh1mJ9gC99dYbkMQXK4oup3'),
        });

        const teztrisInstance = await Tezos.contract.at("KT1KY1nnwawbqyXz2g2b9tS7qCaiEidnkZWb");

        let batch = Tezos.wallet
            .batch()
            .withContractCall(teztrisInstance.methods.reportWinner(gameID, { "": char2Bytes.char2Bytes("ipfs://" + metadata) }, winner));

        const batchOperation = await batch.send();

        console.log("final call");

        await batchOperation.confirmation().then(() => batchOperation.opHash);
        console.log("return hona chie");
        return {
            success: true,
            operationId: batchOperation.hash,
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            error,
        };
    }
};