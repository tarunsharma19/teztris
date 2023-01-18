import smartpy as sp 

# For IDE , with the contracts in previous directory uploaded 
FA2 = sp.io.import_stored_contract("modifiedNFT")
FA12 = sp.io.import_stored_contract("FA12")

# For Running in CLI
# FA2 = sp.io.import_script_from_url("file:modifiedNFT.py")
# FA12 = sp.io.import_script_from_url("file:FA12.py")

class coin(FA12.FA12):
    pass

class NFT(FA2.FA2):
    pass


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
    def __init__(self , _admin , _sos , _treasury):
        self.init(
            admin = _admin,
            sos = _sos,
            treasury = _treasury,
            fee = sp.nat(20),
            rewardNFTAddress = sp.none,
            tokenId = sp.nat(0),

            game = sp.big_map(
                tkey = sp.TString,
                tvalue = sp.TRecord(
                    player1 = sp.TAddress,
                    p1amt = sp.TNat,
                    player2 = sp.TOption(sp.TAddress),
                    p2amt = sp.TNat,

                    betToken = sp.TAddress,
                    betTokenType = sp.TNat,  #0 = tez #1 = fa1.2 , #2 fa2 
                    betTokenId = sp.TNat,

                    winner = sp.TOption(sp.TAddress),
                    
                    isAvail = sp.TBool,
                    end = sp.TBool
                )
            ),

            #add extra storage here
        
        )

    def checkAdmin(self):
        sp.verify(sp.sender == self.data.admin, message = "Not Admin")

    @sp.entry_point
    def registerFA2(self, fa2):
        self.checkAdmin()
        self.data.rewardNFTAddress = sp.some(fa2)

    @sp.entry_point
    def updateAdmin(self , address):
        self.checkAdmin()
        self.data.admin = address

    @sp.entry_point
    def updateSOS(self , sos):
        sp.verify(sp.sender == self.data.sos, message = "Not SOS address")
        self.data.sos = sos

    @sp.entry_point
    def updateTreasury(self , address):
        sp.verify(sp.sender == self.data.treasury, message = "Not Treasury address")
        self.data.treasury = address

    @sp.entry_point
    def updateFee(self , newFee):
        sp.verify(sp.sender == self.data.treasury, message = "Not Treasury address")
        self.data.fee = newFee  


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
                ContractLibrary.TransferToken(sp.sender, sp.self_address, params.betAmount, params.betToken , params.betTokenId , False)
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
            sp.verify(params.betAmount == sp.utils.mutez_to_nat(sp.amount) , "SENT_AMOUNT_MISMATCH")
            amt.value = sp.utils.mutez_to_nat(sp.amount)
            #handle tez
        sp.else:
            sp.if params.betTokenType == sp.nat(1):
                #handle fa1.2
                ContractLibrary.TransferToken(sp.sender, sp.self_address, params.betAmount, params.betToken , params.betTokenId , False)
                amt.value = params.betAmount

            sp.else:
                #handle fa2
                ContractLibrary.TransferToken(sp.sender, sp.self_address, params.betAmount, params.betToken , params.betTokenId , True)
                amt.value = params.betAmount

        #update game details

        self.data.game[params.gameID].player2 = sp.some(sp.sender)
        self.data.game[params.gameID].p2amt = amt.value
        self.data.game[params.gameID].isAvail = False

    @sp.entry_point
    def reportWinner(self , params):
        # sp.set_type(params, sp.TRecord(gameID = sp.TString, winner = sp.TAddress , metadata = sp.TBytes))

        sp.verify(self.data.admin == sp.sender , "NOT_ADMIN")
        sp.verify(self.data.game.contains(params.gameID) , message = "GAME_DOESNT_EXIST")
        sp.verify( self.data.game[params.gameID].isAvail == False  , "GAME_NOT_IN_SESSION_OR_ENDED" )
        sp.verify( self.data.game[params.gameID].end == False  , "GAME_ALREADY_ENDED" )

        sp.verify((self.data.game[params.gameID].player1 == params.winner) | (self.data.game[params.gameID].player2 == sp.some(params.winner)), "WINNER_NOT_PLAYER")
        #all checks pass

        amt = self.data.game[params.gameID].p1amt + self.data.game[params.gameID].p2amt

        treasuryShare = amt // self.data.fee
        userShare = sp.as_nat(amt - treasuryShare)
        

        sp.if self.data.game[params.gameID].betTokenType == sp.nat(0):
            #handle tez
            sp.send(params.winner , sp.utils.nat_to_mutez(userShare))
            sp.send(self.data.treasury , sp.utils.nat_to_mutez(treasuryShare))
        sp.else:
            sp.if self.data.game[params.gameID].betTokenType == sp.nat(1):
                #handle fa1.2
                ContractLibrary.TransferToken(sp.self_address, params.winner , userShare , self.data.game[params.gameID].betToken , self.data.game[params.gameID].betTokenId , False)
                ContractLibrary.TransferToken(sp.self_address, self.data.treasury , treasuryShare , self.data.game[params.gameID].betToken , self.data.game[params.gameID].betTokenId , False)
        
            sp.else:
                #handle fa2
                ContractLibrary.TransferToken(sp.self_address, params.winner , userShare , self.data.game[params.gameID].betToken , self.data.game[params.gameID].betTokenId , True)
                ContractLibrary.TransferToken(sp.self_address, self.data.treasury , treasuryShare , self.data.game[params.gameID].betToken , self.data.game[params.gameID].betTokenId , True)

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

        self.data.tokenId +=1

        #Update Game Data
        self.data.game[params.gameID].p1amt = sp.nat(0)
        self.data.game[params.gameID].p2amt = sp.nat(0)

        self.data.game[params.gameID].winner = sp.some(params.winner)
        self.data.game[params.gameID].isAvail = False
        self.data.game[params.gameID].end = True

    @sp.entry_point
    def removeGame(self , params):
        sp.verify(self.data.game.contains(params.gameID) , message = "GAME_DOESNT_EXIST")
        sp.verify( self.data.game[params.gameID].isAvail == True  , "GAME_IN_SESSION_OR_ENDED" )
        sp.verify( self.data.game[params.gameID].end == False  , "GAME_ALREADY_ENDED" )
        sp.verify( self.data.game[params.gameID].p2amt == sp.nat(0)  , "P2_HAS_STAKE" )
        sp.verify( self.data.game[params.gameID].player1 == sp.sender  , "NOT_PLAYER1" )


        #returning stake to p1
        amt = self.data.game[params.gameID].p1amt

        sp.if self.data.game[params.gameID].betTokenType == sp.nat(0):
            #handle tez
            sp.send(self.data.game[params.gameID].player1 , sp.utils.nat_to_mutez(amt))
        sp.else:
            sp.if self.data.game[params.gameID].betTokenType == sp.nat(1):
                #handle fa1.2
                ContractLibrary.TransferToken(sp.self_address, self.data.game[params.gameID].player1 , amt , self.data.game[params.gameID].betToken , self.data.game[params.gameID].betTokenId , False)

            sp.else:
                #handle fa2
                ContractLibrary.TransferToken(sp.self_address, self.data.game[params.gameID].player1 , amt , self.data.game[params.gameID].betToken , self.data.game[params.gameID].betTokenId , True)

        
        del self.data.game[params.gameID]

    @sp.entry_point
    def SOS(self , gameID):
        # Only to be executed in dire circumstances when game is BLOCKED DUE TO SERVER ISSUES
        # Addy to be stored safely by owners , moves staked token only to stakers 
        #  can be called regardless of game state
        sp.verify(sp.sender == self.data.sos , "ONLY_CALLABLE_BY_SOS")
        sp.verify(self.data.game.contains(gameID) , message = "GAME_DOESNT_EXIST")
        sp.verify(self.data.game[gameID].p1amt > sp.nat(0), "NO_P1_STAKE_FOUND")
        sp.verify(self.data.game[gameID].p2amt > sp.nat(0) , "NO_P2_STAKE_FOUND")

        # Sanity checks passed now just send the amount to owners
        #returning stake
        amt = self.data.game[gameID].p1amt
        amt2 = self.data.game[gameID].p2amt

        sp.if self.data.game[gameID].betTokenType == sp.nat(0):
            #handle tez
            sp.send(self.data.game[gameID].player1 , sp.utils.nat_to_mutez(amt))
            sp.send(self.data.game[gameID].player2.open_some() , sp.utils.nat_to_mutez(amt2))
        
        sp.else:
            sp.if self.data.game[gameID].betTokenType == sp.nat(1):
                #handle fa1.2
                ContractLibrary.TransferToken(sp.self_address, self.data.game[gameID].player1 , amt , self.data.game[gameID].betToken , self.data.game[gameID].betTokenId , False)
                ContractLibrary.TransferToken(sp.self_address, self.data.game[gameID].player2.open_some() , amt2 , self.data.game[gameID].betToken , self.data.game[gameID].betTokenId , False)

            sp.else:
                #handle fa2
                ContractLibrary.TransferToken(sp.self_address, self.data.game[gameID].player1 , amt , self.data.game[gameID].betToken , self.data.game[gameID].betTokenId , True)
                ContractLibrary.TransferToken(sp.self_address, self.data.game[gameID].player2.open_some() , amt2 , self.data.game[gameID].betToken , self.data.game[gameID].betTokenId , True)
        
        del self.data.game[gameID]

        
        
        
        





        


@sp.add_test("Teztris")
def test():
    
    scenario = sp.test_scenario()
    scenario.h1("Teztris")
    scenario.table_of_contents()

    alice = sp.test_account("alice")
    bob = sp.test_account("bob")
    admin = sp.test_account("admin")
    sos = sp.test_account("sos")
    treasury = sp.test_account("treasury")


    coin = FA12.FA12(
            admin   = admin.address,
            config  = FA12.FA12_config(
                support_upgradable_metadata         = True,
                use_token_metadata_offchain_view    = True
            ),
            token_metadata = {
                "decimals"    : "6",             # Mandatory by the spec
                "name"        : "NCU Coin", # Recommended
                "symbol"      : "NCU",            # Recommended
                # Extra fields
                "icon"        : 'https://raw.githubusercontent.com/Udit-Kapoor/CollegeNetwork/main/NCUCoin.jpeg'
            },
            contract_metadata = {
                "" : "ipfs://QmdpUPMMX8RLuE2WJxxNqwgU9ELsg7iYPZKSuCWJvfQnVM",
            }
        )

    scenario+= coin


    c = TezTris(admin.address , sos.address , treasury.address)

    scenario += c

    token = NFT(
        config = FA2.FA2_config(
            non_fungible=False,
            assume_consecutive_token_ids = True
        ),
        admin = admin.address,
        crowdsale = c.address,
        metadata = sp.big_map({
            "": sp.utils.bytes_of_string("tezos-storage:content"),
            "content": sp.utils.bytes_of_string("""{"name": "Teztris NFT Contract", "description": "NFT contract for the Teztris Games"}"""),
        })
    )
    
    scenario += token

    # TEZ SCENE

    scenario.h2("Registering FA2 contract for our crowdsale.")
    c.registerFA2(token.address).run(sender=admin)

    c.SOS("FirstGame").run(sender = sos , valid = False)

    params = sp.record(gameID = "FirstGame" , betTokenType = sp.nat(0) , betAmount = sp.nat(1000000), betToken = sp.address("KT1AefyQpVfjupNFKBoKqrVHtHnCSZ7AKBtX") , betTokenId = sp.nat(0))
    c.createGame(params).run(sender = alice , amount = sp.tez(1))

    c.SOS("FirstGame").run(sender = sos , valid = False)

    params2= sp.record(gameID = "FirstGame" , betTokenType = sp.nat(0) , betAmount = sp.nat(1000000), betToken = sp.address("KT1AefyQpVfjupNFKBoKqrVHtHnCSZ7AKBtX") , betTokenId = sp.nat(0))
    c.joinGame(params).run(sender = bob , amount = sp.tez(1))

    c.removeGame(sp.record(gameID = "FirstGame")).run(sender=alice , valid = False)

    # c.SOS("FirstGame").run(sender = sos)

    params3 = sp.record(gameID = "FirstGame" , winner = alice.address , metadata = sp.map({"" : sp.utils.bytes_of_string("ipfs://QmSscmKnfMkYFKjrubbmrPUdkhATC4gZHktRRamCGyNN3G/2.json")}))
    c.reportWinner(params3).run(sender = admin)


    # Coin scene

    coin.mint(address = alice.address , value =  1000000).run(sender=admin)
    coin.mint(address = bob.address , value = 1000000).run(sender=admin)

    coin.approve(spender = c.address , value = 1000000).run(sender = alice)
    coin.approve(spender = c.address , value=1000000).run(sender = bob)


    params = sp.record(gameID = "SecondGame" , betTokenType = sp.nat(1) , betAmount = sp.nat(1000000), betToken = coin.address , betTokenId = sp.nat(0))
    c.createGame(params).run(sender = alice)

    params2= sp.record(gameID = "SecondGame" , betTokenType = sp.nat(1) , betAmount = sp.nat(1000000), betToken = coin.address , betTokenId = sp.nat(0))
    c.joinGame(params).run(sender = bob )

    c.removeGame(sp.record(gameID = "SecondGame")).run(sender=alice , valid = False)

    params3 = sp.record(gameID = "SecondGame" , winner = alice.address , metadata = sp.map({"" : sp.utils.bytes_of_string("ipfs://QmSscmKnfMkYFKjrubbmrPUdkhATC4gZHktRRamCGyNN3G/2.json")}))
    c.reportWinner(params3).run(sender = admin)


    c.updateFee(50).run(sender = treasury)
    c.updateTreasury(admin.address).run(sender = treasury)

    c.updateSOS(admin.address).run(sender=sos)

    

