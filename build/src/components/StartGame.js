import React, { useContext, useState , useEffect, useCallback} from 'react'
import styled from 'styled-components';
import bgImage from '../img/landingBg.webp';
import tezLogo from '../img/tezlogo.png'
import tezTris from '../img/tezTris.png'
import {TextField } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select  from '@mui/material/Select';
import { createGame ,joinGame, removeGame} from '../api/operations/teztris';
import {v4 as uuidv4} from 'uuid';
import {useNavigate} from 'react-router-dom';
import { manageFunc } from '../App';
import Loader from './Loader'


const socket = require("../api/socket").socket;

export default function Landing() {
  const [open, setOpen] = React.useState(false);
  const [token, setToken] = React.useState(0);
  const [amount, setAmount] = React.useState(0);
  const [openJoinGame, setopenJoinGame] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [maskedLoader, setMaskedLoader] = useState(false);
  const [game, setGame] = useState({});
  const [startFlag, setStartFlag] = useState(false);
  const [obj, setObj] = useState({});
  const [emitFlag, setEmitflag] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  
  const {gameIdInput, setGameIdInput } = useContext(manageFunc);
  
  const handleTokenChange = (event) => {
    setToken(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    maxWidth: "80%",
    color: "#fff !important",
    bgcolor: "#001e3c",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: "25px",
  };

  useEffect(() => {
    socket.on("status", (status) => {
      alert(status);
    });
  }, []);

  useEffect(() => {
    if (emitFlag) {
      // console.log("finding match");
      socket.once("match found", (e) => {
        // console.log("inside game id", e);
        if (e != {}) {
          setObj(e);
        }
      });
    }
  });
  
  useEffect(() => {
    if (game.success) {
      socket.emit("playerJoinsGame", {
        gameId: gameIdInput,
      });
    }
  }, [game]);
  
  useEffect(() => {
    socket.once("start game", () => {
      navigate("/app", { replace: true });
    });
  });
  
  const handleGameIdInput = (event) => {
    setGameIdInput(event.target.value);
  };
  
  const ctez = {
    betToken: "KT1Q4qRd8mKS7eWUgTfJzCN8RC6h9CzzjVJb",
    betTokenId: 0,
    betTokenType: "FA1.2",
    betTokenDecimal: 6,
  };
  const usdt = {
    betToken: "KT1Uw1oio434UoWFuZTNKFgt5wTM9tfuf7m7",
    betTokenId: 3,
    betTokenType: "FA2",
    betTokenDecimal: 6,
  };
  
  const tez = {
    betToken: "KT1Uw1oio434UoWFuZTNKFgt5wTM9tfuf7m7",
    betTokenId: 0,
    betTokenType: "tez",
    betTokenDecimal: 6,
  };
  
  const sendConfig = async (token) => {
    handleClose();
    setMaskedLoader(true);
    setOpenDialog(true);
    // console.log(maskedLoader, openDialog);
  
    let tuid = uuidv4();
    // setuid(tuid);
    // console.log(token, uid, tuid);
    setGameIdInput(tuid);
    let create;
    let obj = {};
    if (token === 1) {
      create = await createGame(
        Number(amount),
        tez.betToken,
        tez.betTokenId,
        tez.betTokenType,
        tez.betTokenDecimal,
        tuid
      );
      obj = {
        amount: amount,
        betToken: tez.betToken,
        betTokenType: tez.betTokenType,
        betTokenId: tez.betTokenId,
        betTokenName: "XTZ",
      };
    } else if (token === 2) {
      create = await createGame(
        Number(amount),
        usdt.betToken,
        usdt.betTokenId,
        usdt.betTokenType,
        usdt.betTokenDecimal,
        tuid
      );
      obj = {
        amount: amount,
        betToken: usdt.betToken,
        betTokenType: usdt.betTokenType,
        betTokenId: usdt.betTokenId,
        betTokenName: "USDt",
      };
    } else if (token === 3) {
      create = await createGame(
        Number(amount),
        ctez.betToken,
        ctez.betTokenId,
        ctez.betTokenType,
        ctez.betTokenDecimal,
        tuid
      );
      obj = {
        amount: amount,
        betToken: ctez.betToken,
        betTokenType: ctez.betTokenType,
        betTokenId: ctez.betTokenId,
        betTokenName: "ctez",
      };
    } else {
      // setuid(null);
      // console.log(typeof token, token, token.value);
    }
  
    // console.log(create);
    if (create.success === true) {
      // console.log("inside success");
      setMaskedLoader(false);
  
      socket.emit("createNewGame", tuid, obj);
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };
  
  
  const handleJoinGameClose = () => {
    setopenJoinGame(false);
  };
  
  const handleJoinGameOpen = () => {
    setopenJoinGame(true);
    handleJoinGame();
  };

  const startGame = async () => {
    setStartFlag(true);
    joinGame(
      Number(obj.amount),
      obj.betToken,
      obj.betTokenId,
      obj.betTokenType,
      6,
      gameIdInput
    ).then((game) => setGame(game));
  };
  
  
  const handleJoinGame = async () => {
    socket.emit("wantsToJoin", gameIdInput);
    // console.log("emit done", gameIdInput);
    setEmitflag(true);
  };
  
  const cancelGame = async () => {
    setGameIdInput("Cancelling Game! wait..");
    const remove = await removeGame(gameIdInput);
    if (remove.success === true) {
      socket.emit("removeGame", gameIdInput);
      setOpenDialog(false);
      setGameIdInput("");
      // console.log("cancel game emit done");
    }
  };
  

    return (
      <>
      {/* waiting for player modal */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openDialog}
        onClose={handleDialogClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openDialog}>  
          <Box sx={style}>
            <h2>Your Game ID</h2>
            <ModalWrapper>
            {
            maskedLoader?<>
              <br />
                <p style={{textAlign:"center", fontSize:"1rem"}}>
                your game id is being generated.
                </p>
    
              <Loader />
              
              </>:
              gameIdInput?
              <>
               <p> Share this with your friend : </p>
               <p className='gameIdText'>
                <>
                {gameIdInput}
                </>
               </p>
               <br />
               <p style={{textAlign:"center", fontSize:"0.8rem"}}> Waiting for other player to join</p>
               <Loader />
               <br />
               <Button variant="outlined" onClick={()=>cancelGame()}>Cancel Game</Button>
              </>:<>
              </>
            }
            </ModalWrapper>
          </Box>
        </Fade>
      </Modal>
      {/* join game modal */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openJoinGame}
        onClose={handleJoinGameClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openJoinGame}>  
          <Box sx={style}>
            <h2>Joining Game</h2>
            <ModalWrapper>
            {
              startFlag?<>
              <br />
              <p style={{textAlign:"center", fontSize:"1.5rem"}}>
               <p style={{textAlign:"center", fontSize:"0.8rem"}}> Joining game please wait.</p>
               <Loader />
               </p>
              </>:
              obj.amount?<>
            <br />
              <p style={{textAlign:"center", fontSize:"1.5rem"}}>
               Game bet Amount : {obj.amount} {obj.betTokenName}
               <br /><br />
               <p style={{textAlign:"center", fontSize:"0.8rem"}}> This tx is irreversible, you'll lose if you quit game.</p>
               <Button variant="outlined" onClick={()=>startGame()}>Start Game</Button>
               </p>
              </>:<>
              <br />
              <Loader />
              </>
            }
            </ModalWrapper>
          </Box>
        </Fade>
      </Modal>
      {/* create game modal */}
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>  
          <Box sx={style}>
            <h2>Set Betting Amount</h2>
            <ModalWrapper>
            <FormControl variant="filled" fullWidth  sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-filled-label" style={{color:"#b0b1b2"}}>Token</InputLabel>
                <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={token}
                onChange={handleTokenChange}
                >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem value={1}>XTZ</MenuItem>
                <MenuItem value={2}>USDT</MenuItem>
                <MenuItem value={3}>Ctez</MenuItem>
                </Select>
                <br />
                <TextField id="filled-basic" label="Amount"  style={{color:"#b0b1b2"}} value={amount} onChange={handleAmountChange} variant="filled" />
                <br />
                <Button variant="outlined" onClick={()=>sendConfig(token)}>Start Game</Button>
            </FormControl>
            </ModalWrapper>
          </Box>
        </Fade>
      </Modal>
      <WrapperHome>
        <Logo>
          <img src={tezLogo}></img>
        </Logo>
        <ContentWrapper>
          <h1>Let's start Playing!!</h1>
          <img src={tezTris} alt=''></img>
        <div style={{textAlign:"Right"}}> 
            <button onClick={handleOpen}>Create a game</button>
          <p
          style={{margin:"10px 50px"}}
          >OR</p>
          <input
                    type="text"
                    style={{
                        width: "400px",
                        maxWidth: "80%",
                        color: "#fff",
                      fontSize: "1.2rem",
                      margin: "10px 0",
                      background: "rgba(26, 28, 32, 0.75)",
                      height: "2.5rem",
                      borderRadius: "0.5rem",
                    }}
                    placeholder="Game Id"
                    value={gameIdInput}
                    onChange={handleGameIdInput}
                  />
                  <br />
          <button onClick={handleJoinGameOpen}>Join a game</button>
          {/* <button onClick={handleWinner}>Join a game</button> */}
        </div>

        </ContentWrapper>
      </WrapperHome>
      </>
    )
  }
  ;
  
  
  
  const Logo = styled.div `
   text-align:right;
   margin: 40px 60px 0 0 ;

   @media (max-width: 768px) {
   margin: 40px 10px 0 0 ;

    img{
     width:40%;
    }
  `;
  

  const ModalWrapper = styled.div `
  text-align: center;
  svg{
    color:#ffffff;
  }
  label{
    color: #b0b1b2;

  }
  #filled-basic{
    color: #ffffff;
  }
  #demo-simple-select-filled{
    color:#ffffff;
  }
  .gameIdText:hover{
    cursor: Pointer;
  }
  .css-19mk8g1-MuiInputBase-root-MuiFilledInput-root:hover:not(.Mui-disabled):before {
    border-bottom: 1px solid white;
  }
  .css-19mk8g1-MuiInputBase-root-MuiFilledInput-root:not(.Mui-disabled):before {
    border-bottom: 1px solid #b0b0b0;
  }
  .css-67qocj-MuiInputBase-root-MuiFilledInput-root-MuiSelect-root:hover:not(.Mui-disabled):before {
    border-bottom: 1px solid white;
  }
  .css-67qocj-MuiInputBase-root-MuiFilledInput-root-MuiSelect-root:not(.Mui-disabled):before {
    border-bottom: 1px solid #b0b0b0;
  }

  `;
  const ContentWrapper = styled.div `
  text-align: right;
  color:#fff;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  div{
    margin: 40px 60px 0 0;
  }
  h1 {
    font-size:52px;
    margin: 24px 50px 0 0 ;
  }
  img {
    width: 260px;
    margin: 20px 50px 0 0 ;
  }
  button {
    width: 240px;
    height: 68px;
    font-size: 32px;
    font-weight: 700;
    background-color: #0D61FF;
    color:#fff;
    border-radius:20px;

  }

  button:hover {
    cursor:pointer;
  }
@media (max-width: 768px) {
    button {
      font-size: 26px;
    }
    div{
      margin: 40px 10px 0 0;
    }
    h1 {
      margin: 24px 10px 0 0 ;
    }
    img {
      margin: 20px 10px 0 0 ;
    }
  }  
  `;
  
  const WrapperHome = styled.div`
    width: 100vw;
    height: 100vh;
    background: url(${bgImage}) #000;
    background-size: cover;
    overflow: hidden;

    @media (max-width: 768px) {
      background-position-x: -650px;
      h1{
        font-size:38px;
      }
    }
  `;
  