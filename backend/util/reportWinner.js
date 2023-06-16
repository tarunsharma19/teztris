const TezosToolkit = require("@taquito/taquito");
const char2Bytes = require("@taquito/utils");
const InMemorySigner = require("@taquito/signer");
require('dotenv').config();

module.exports = async (
    gameID,
    winner,
    metadata
) => {

    try {
        const Tezos = new TezosToolkit.TezosToolkit("https://rpc.tzkt.io/mainnet");
        Tezos.setProvider({
            signer: new InMemorySigner.InMemorySigner(process.env.PVT_KEY),
        });

        const teztrisInstance = await Tezos.contract.at("KT1TkkM9g5TB2sZ86aomf1tF2kEVC5Yec6jU");

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