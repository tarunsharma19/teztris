import smartpy as sp 

class ContractLibrary(sp.Contract):
    """Provides utility functions 
    """

    def TransferFATwoTokens(sender,receiver,amount,tokenAddress,id):
        """Transfers FA2 tokens
        
        Args:
            sender: sender address
            receiver: receiver address
            amount: amount of tokens to be transferred
            tokenAddress: address of the FA2 contract
            id: id of token to be transferred
        """

        arg = [
            sp.record(
                from_ = sender,
                txs = [
                    sp.record(
                        to_         = receiver,
                        token_id    = id , 
                        amount      = amount 
                    )
                ]
            )
        ]

        transferHandle = sp.contract(
            sp.TList(sp.TRecord(from_=sp.TAddress, txs=sp.TList(sp.TRecord(amount=sp.TNat, to_=sp.TAddress, token_id=sp.TNat).layout(("to_", ("token_id", "amount")))))), 
            tokenAddress,
            entry_point='transfer').open_some()

        sp.transfer(arg, sp.mutez(0), transferHandle)


    def TransferFATokens(sender,reciever,amount,tokenAddress): 
        """Transfers FA1.2 tokens
        
        Args:
            sender: sender address
            reciever: reciever address
            amount: amount of tokens to be transferred
            tokenAddress: address of the FA1.2 contract
        """

        TransferParam = sp.record(
            from_ = sender, 
            to_ = reciever, 
            value = amount
        )

        transferHandle = sp.contract(
            sp.TRecord(from_ = sp.TAddress, to_ = sp.TAddress, value = sp.TNat).layout(("from_ as from", ("to_ as to", "value"))),
            tokenAddress,
            "transfer"
            ).open_some()

        sp.transfer(TransferParam, sp.mutez(0), transferHandle)

    def TransferToken(sender, receiver, amount, tokenAddress,id, faTwoFlag): 
        """Generic function to transfer any type of tokens
        
        Args:
            sender: sender address
            reciever: reciever address
            amount: amount of tokens to be transferred
            tokenAddress: address of the token contract
            id: id of token to be transfered (for FA2 tokens)
            faTwoFlag: boolean describing whether the token contract is FA2 or not
        """

        sp.verify(amount > 0 , "ZERO_TRANSFER")

        sp.if faTwoFlag: 

            ContractLibrary.TransferFATwoTokens(sender, receiver, amount , tokenAddress, id )

        sp.else: 

            ContractLibrary.TransferFATokens(sender, receiver, amount, tokenAddress)

class TezTris(ContractLibrary):
    FA2MintParam = sp.TRecord(
        address = sp.TAddress,
        amount = sp.TNat,
        metadata = sp.TMap(sp.TString, sp.TBytes),
        token_id = sp.TNat,
    )
    def __init__(self , _admin , _rewardNFT):
        self.init(
            admin = _admin,
            rewardNFTAddress = _rewardNFT,
            tokenId = sp.nat(0),

            game = sp.big_map(
                tkey = sp.TString,
                tvalue = sp.TRecord(
                    player1 = sp.TAddress,
                    p1amt = sp.TNat,
                    player2 = sp.TAddress,
                    p2amt = sp.TNat,

                    betToken = sp.TAddress,
                    betTokenType = sp.TNat,  #0 = tez #1 = fa1.2 , #2 fa2 
                    betTokenId = sp.TNat,

                    winner = sp.TAddress,
                    
                    isAvail = sp.TBool,
                    end = sp.TBool
                )
            ),

            #add extra storage here
        
        )


    @sp.entry_point
    def createGame(self , params):
        sp.set_type(params, sp.TRecord(gameID = sp.TString, betTokenType = sp.TNat, betAmount = sp.TNat, betToken = sp.TAddress, betTokenId = sp.TNat))
        sp.verify((self.data.game.contains(params.gameID))==False , message = "GAME_ALREADY_EXISTS")

        #handle bet
        amt = sp.local("amt" , 0)

        sp.if params.betTokenType == sp.nat(0):
            sp.verify(params.betAmount == sp.utils.mutez_to_nat(sp.amount) , "SENT_AMOUNT_MISMATCH")
            amt.value = sp.utils.mutez_to_nat(sp.amount)
            #handle tez
        sp.else:
            sp.if params.betTokenType == sp.nat(1):
                #handle fa1.2
                ContractLibrary.TransferToken(sp.sender, sp.self_address, params.betAmount, params.betToken , sp.nat(0) , False)
                amt.value = params.betAmount

            sp.else:
                #handle fa2
                ContractLibrary.TransferToken(sp.sender, sp.self_address, params.betAmount, params.betToken , params.betTokenId , True)
                amt.value = params.betAmount



        # Add new game 
        self.data.game[params.gameID] = sp.record(
            player1 = sp.sender,
            p1amt = amt.value,
            player2 = sp.none,
            p2amt = sp.nat(0),

            betToken = params.betToken,
            betTokenType = params.betTokenType,
            betTokenId = params.betTokenId,

            winner = sp.none,

            isAvail = True,
            end = False
        )

    @sp.entry_point
    def joinGame(self , params):
        sp.set_type(params, sp.TRecord(gameID = sp.TString, betTokenType = sp.TNat, betAmount = sp.TNat, betToken = sp.TAddress, betTokenId = sp.TNat))

        sp.verify(self.data.game.contains(params.gameID) , message = "GAME_DOESNT_EXIST")
        sp.verify( self.data.game[params.gameID].isAvail == True  , "GAME_IN_SESSION_OR_ENDED" )
        sp.verify( self.data.game[params.gameID].end == False  , "GAME_IN_SESSION_OR_ENDED" )
        sp.verify( self.data.game[params.gameID].betTokenType == params.betTokenType  , "INVALIS_BET_TOKEN_TYPE" )
        sp.verify( self.data.game[params.gameID].betToken == params.betToken  , "INVALIS_BET_TOKEN" )
        sp.verify( self.data.game[params.gameID].betTokenId == params.betTokenId  , "INVALIS_BET_TOKEN_ID" )
    

        #all checks pass

        #handle bet
        amt = sp.local("amt" , 0)

        sp.if params.betTokenType == sp.nat(0):
            sp.verify(params.betAmount == sp.amount , "SENT_AMOUNT_MISMATCH")
            amt.value = sp.as_nat(sp.amount)
            #handle tez
        sp.else:
            sp.if params.betTokenType == sp.nat(1):
                #handle fa1.2
                ContractLibrary.TransferToken(sp.sender, sp.self_address, params.betAmount, params.betToken , sp.nat(0) , False)
                amt.value = params.betAmount

            sp.else:
                #handle fa2
                ContractLibrary.TransferToken(sp.sender, sp.self_address, params.betAmount, params.betToken , params.betTokenId , True)
                amt.value = params.betAmount

        #update game details

        self.data.game[params.gameID].player2 = sp.sender
        self.data.game[params.gameID].p2amt = amt.value
        self.data.game[params.gameID].isAvail = False

    @sp.entry_point
    def reportWinner(self , params):
        sp.set_type(params, sp.TRecord(gameID = sp.TString, winner = sp.TAdrress , metadata = sp.TBytes))

        sp.verify(self.data.admin == sp.sender , "NOT_ADMIN")
        sp.verify(self.data.game.contains(params.gameID) , message = "GAME_DOESNT_EXIST")
        sp.verify( self.data.game[params.gameID].isAvail == False  , "GAME_NOT_IN_SESSION_OR_ENDED" )
        sp.verify( self.data.game[params.gameID].end == False  , "GAME_ALREADY_ENDED" )

        sp.verify((self.data.game[params.gameID].player1 == params.winner | self.data.game[params.gameID].player2 == params.winner), "WINNER_NOT_PLAYER")
        #all checks pass

        amt = self.data.game[params.gameID].p1amt + self.data.game[params.gameID].p2amt

        sp.if self.data.game[params.gameID].betTokenType == sp.nat(0):
            #handle tez
            sp.send(params.winner , amt)
        sp.else:
            sp.if self.data.game[params.gameID].betTokenType == sp.nat(1):
                #handle fa1.2
                ContractLibrary.TransferToken(sp.self_address, params.winner , amt , self.data.game[params.gameID].betToken , sp.nat(0) , False)

            sp.else:
                #handle fa2
                ContractLibrary.TransferToken(sp.self_address, params.winner , amt , self.data.game[params.gameID].betToken , self.data.game[params.gameID].betTokenId , True)


        #mintNFT
        mintData = sp.record(
            address = params.winner,
            amount = sp.nat(1),
            metadata = params.metadata,
            token_id = self.data.tokenId,
        )
        contract = sp.contract(
            self.FA2MintParam,
            self.data.rewardNFTAddress.open_some("NOT_A_VALID_FA2_CONTRACT"),
            'mint'
        ).open_some("WRONG_FA2_CONTRACT")

        sp.transfer(mintData, sp.mutez(0), contract)

        #Update Game Data
        self.data.game[params.gameID].winner = params.winner
        self.data.game[params.gameID].isAvail = False
        self.data.game[params.gameID].end = True

        
        
            
        

        





    
        

