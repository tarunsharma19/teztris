import { teztrisContract} from '../../common/constants'
import { tezos ,  wallet , CheckIfWalletConnected} from '../operations/wallet'
import {OpKind } from '@taquito/taquito'

export const createGame = async (
    betAmount,
    betToken,
    betTokenId,
    betTokenType,
    betTokenDecimal,
    gameID
  ) => {

    try{
    betAmount = betAmount * (10 ** betTokenDecimal);
    
      const WALLET_RESP = await CheckIfWalletConnected(wallet);
      if (!WALLET_RESP.success) {
        throw new Error('Wallet connection failed');
      }
     
      const teztrisInstance = await tezos.contract.at(teztrisContract);

      let batch = null;
      // Approve call for FA1.2 type token
      if (betTokenType === 'FA1.2') {
        batch = tezos.wallet
          .batch()
          .withContractCall(betToken.methods.approve(teztrisContract, betAmount))
          .withContractCall(
            teztrisInstance.methods.createGame(
              betAmount,
              betToken,
              0,
              1,
              gameID
            ),
          );
      }
      // add_operator for FA2 type token
      else if (betTokenType === 'FA2'){
        batch = tezos.wallet
          .batch()
          .withContractCall(
            tokenInInstance.methods.update_operators([
              {
                add_operator: {
                  owner: caller,
                  operator: teztrisContract,
                  token_id: betTokenId,
                },
              },
            ]),
          )
          .withContractCall(
            teztrisInstance.methods.createGame(
                betAmount,
                betToken,
                betTokenId,
                2,
                gameID
              ),
          )
          .withContractCall(
            tokenInInstance.methods.update_operators([
              {
                remove_operator: {
                  owner: caller,
                  operator: teztrisContract,
                  token_id: betTokenId,
                },
              },
            ]),
          );
      }
      else{
        //   TEZ
         batch = tezos.wallet.batch([
            {
              kind: OpKind.TRANSACTION,
              ...teztrisInstance.methods
                .createGame(
                    betAmount,
                    "KT1Q4qRd8mKS7eWUgTfJzCN8RC6h9CzzjVJb",
                    0,
                    0,
                    gameID
                  )
                .toTransferParams({ amount: Number(betAmount), mutez: true }),
            },
          ]);

      }
  
      const batchOperation = await batch.send();

  
      await batchOperation.confirmation().then(() => batchOperation.opHash);
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

  export const joinGame = async (
    betAmount,
    betToken,
    betTokenId,
    betTokenType,
    betTokenDecimal,
    gameID
  ) => {

    try{
    betAmount = betAmount * (10 ** betTokenDecimal);
    
      const WALLET_RESP = await CheckIfWalletConnected(wallet);
      if (!WALLET_RESP.success) {
        throw new Error('Wallet connection failed');
      }
     
      const teztrisInstance = await tezos.contract.at(teztrisContract);

      let batch = null;
      // Approve call for FA1.2 type token
      if (betTokenType === 'FA1.2') {
        batch = tezos.wallet
          .batch()
          .withContractCall(betToken.methods.approve(teztrisContract, betAmount))
          .withContractCall(
            teztrisInstance.methods.joinGame(
              betAmount,
              betToken,
              0,
              1,
              gameID
            ),
          );
      }
      // add_operator for FA2 type token
      else if (betTokenType === 'FA2'){
        batch = tezos.wallet
          .batch()
          .withContractCall(
            tokenInInstance.methods.update_operators([
              {
                add_operator: {
                  owner: caller,
                  operator: teztrisContract,
                  token_id: betTokenId,
                },
              },
            ]),
          )
          .withContractCall(
            teztrisInstance.methods.joinGame(
                betAmount,
                betToken,
                betTokenId,
                2,
                gameID
              ),
          )
          .withContractCall(
            tokenInInstance.methods.update_operators([
              {
                remove_operator: {
                  owner: caller,
                  operator: teztrisContract,
                  token_id: betTokenId,
                },
              },
            ]),
          );
      }
      else{
        //   TEZ
         batch = tezos.wallet.batch([
            {
              kind: OpKind.TRANSACTION,
              ...teztrisInstance.methods
                .joinGame(
                    betAmount,
                    "KT1Q4qRd8mKS7eWUgTfJzCN8RC6h9CzzjVJb",
                    0,
                    0,
                    gameID
                  )
                .toTransferParams({ amount: Number(betAmount), mutez: true }),
            },
          ]);

      }
  
      const batchOperation = await batch.send();

  
      await batchOperation.confirmation().then(() => batchOperation.opHash);
      return {
        success: true,
        operationId: batchOperation.opHash,
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        error,
      };
    }
  };

  export const removeGame = async (
    gameID
  ) => {

    try{
    
      const WALLET_RESP = await CheckIfWalletConnected(wallet, network.type);
      if (!WALLET_RESP.success) {
        throw new Error('Wallet connection failed');
      }
     
      const teztrisInstance = await tezos.contract.at(teztrisContract);

      let batch = tezos.wallet
          .batch()
          .withContractCall(teztrisInstance.methods.removeGame(gameID));
      
      const batchOperation = await batch.send();

  
      await batchOperation.confirmation().then(() => batchOperation.opHash);
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

