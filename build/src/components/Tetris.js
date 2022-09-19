import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { manageFunc } from "../App"; 
import { createStage, checkCollision } from '../gameHelpers';
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';

// Custom Hooks
import { useInterval } from '../hooks/useInterval';
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';
import { useGameStatus } from '../hooks/useGameStatus';

// Components
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';
import { FetchWalletAPI } from '../api/operations/wallet';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import Loader from './Loader'
import Lottie from 'react-lottie';
import winnerLottie from '../img/winner.json';
import looserLottie from '../img/looser.json';
import {Button} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import SoundPlay from './SoundPlay';



const socket = require("../api/socket").socket;


const Tetris = () => {

  const [pScore, setpScore] = useState(Number.MAX_SAFE_INTEGER)
  const { gameOver, setGameOver, gameIdInput} = useContext(manageFunc);
  const [dropTime, setDropTime] = useState(null);

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(
    rowsCleared
  );
  const navigate = useNavigate();

  const [address, setAddress] = useState('');
  const getAddress = async() =>{
    const wal = await FetchWalletAPI();
    console.log("fetched wallet",wal);
    setAddress(wal.wallet);
  }

  const winnerOptions = {
    loop: true,
    autoplay: true,
    animationData: winnerLottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  
  
  const looserOptions = {
    loop: true,
    autoplay: true,
    animationData: looserLottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  const ModalWrapper = styled.div `
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
  useEffect(()=>{
    getAddress();
  },[setGameOver]);

  useEffect(()=>{
    socket.on("p1 ended", (s) => {
    console.log("P1 ended score",s);
    setpScore(parseInt(s));
    });
  },[])

  useEffect(()=>{
    if (score >= pScore){
      setOpenDialog(true);
        setGameOver(true);
        setDropTime(null);
    }
  },[score]);

  useEffect(()=>{
    if(gameOver){
      socket.emit("end", gameIdInput , address, score);
      console.log("gameover emit done");
    }
  },[gameOver]);

  const [winnerId,setWinnerId]= useState("");
  const [gotWinner, setGotWinner] = useState(false);

  

  useEffect(() => {
    socket.once("game over", (obj) => {
      setWinnerId(obj);
      setGotWinner(true);
      console.log("game over",obj);
    });
    socket.on("issue", (status) => {
      alert(status);
    });
  });

  const [resultString,setResultString] = useState(false);
  const winnerCheck = () =>{
    if(address==winnerId){
      setResultString(true);
    }
    else{
      setResultString(false);
    }
  }
  const playAgain = () => {
    navigate('/start', {replace: true});

  }

  window.onload = function () {
    navigate('/start', {replace: true});
  };

  useEffect(() => {
    winnerCheck();
  }, [winnerId])


const [openDialog, setOpenDialog] = useState(false);

const handleDialogClose = () => {
  setOpenDialog(false);
};

// console.log(gameOver)
  const movePlayer = dir => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };

  const keyUp = ({ keyCode }) => {
    if (!gameOver) {
      // Activate the interval again when user releases down arrow.
      if (keyCode === 40) {
        setDropTime(1000 / (level + 1));
      }
    }
  };

  const [startFlag,setStartFlag] = useState(true);
  const startGame = () => {
    // Reset everything
    if(startFlag){
      setStartFlag(false);
      setStage(createStage());
      setDropTime(1000);
      resetPlayer();
      setScore(0);
      setLevel(0);
      setRows(0);
      setGameOver(false);
    }
  };

  const drop = () => {
    // Increase level when player has cleared 10 rows
    if (rows > (level + 1) * 10) {
      setLevel(prev => prev + 1);
      // Also increase speed
      setDropTime(1000 / (level + 1) + 200);
    }

    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      // Game over!
      if (player.pos.y < 1) {
        console.log('GAME OVER!!!');
        setOpenDialog(true);
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  const dropPlayer = () => {
    // We don't need to run the interval when we use the arrow down to
    // move the tetromino downwards. So deactivate it for now.
    setDropTime(null);
    drop();
  };

  // This one starts the game
  // Custom hook by Dan Abramov
  useInterval(() => {
    drop();
  }, dropTime);

  const move = ({ keyCode }) => {
    console.log(typeof(keyCode),"+++++++++++++++++++++++",keyCode)
    if (!gameOver) {
      if (keyCode === 37) {
        movePlayer(-1);
      } else if (keyCode === 39) {
        movePlayer(1);
      } else if (keyCode === 40) {
        dropPlayer();
        if (!gameOver) {
          // Activate the interval again when user releases down arrow.
            setDropTime(1000 / (level + 1));
        }
      } else if (keyCode === 38) {
        playerRotate(stage, 1);
      }
    }
  };
  const temp =()=>{
    dropPlayer();
        if (!gameOver) {
          // Activate the interval again when user releases down arrow.
            setDropTime(1000 / (level + 1));
        }
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    color: "#fff !important",
    bgcolor: '#001e3c',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '25px',
  };

  return (
    <StyledTetrisWrapper
      role="button"
      tabIndex="0"
      onKeyDown={e => move(e)}
      onKeyUp={keyUp}
    >
      <SoundPlay />

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
            {
              gotWinner?<>
              <h2>Results</h2>
              </>:
              <>
              <h2>Waiting for results</h2></>
            }
            <ModalWrapper>
            {
            gotWinner?<>
              <br />
                <p style={{textAlign:"center", fontSize:"1rem"}}>
                  {
                    resultString?<div>
                      <p style={{textAlign:"center",fontSize:"1.2rem"}}>Congrats you won !! </p>
                      <br />
                    <Lottie
                    options={winnerOptions}
                    height={300}
                    width={300}
                    />
                    <br /> 
                    <p style={{textAlign:"center",fontSize:"0.9rem"}}>You will recieve the winning amount  and a Reward NFT soon.</p>
                    <br />
                     <Button variant="outlined" onClick={()=>playAgain()}>Play Again</Button>

                    </div>
                    
                    :<div>
                    <p style={{fontSize:"1.2rem"}}>Oops, you lost !! </p>
                      <br />
                    <Lottie
                    options={looserOptions}
                    height={300}
                    width={300}
                    />
                    <p>Better luck next time..</p>
                    <br />
                     <Button variant="outlined" onClick={()=>playAgain()}>Play Again</Button>

                    </div>
                  }

                </p>
              
              </>:
              <>
                <p style={{textAlign:"center", fontSize:"1rem"}}>
                <br />

                <br />

                <Loader />
                </p>
              </>
            }
            </ModalWrapper>
          </Box>
        </Fade>
      </Modal>
      <StyledTetris>
        <Stage stage={stage} />
        <aside>

          {gameOver ? (
            <>
            <Display gameOver={gameOver} text="Game Over" />
            <Display text={`Score: ${score}`}  />
            </>
          ) : (
            <ScoreCard>
              <Display text={`Score: ${score}`}  />
              <Display text={`rows: ${rows}`}  />
              <Display text={`Level: ${level}`}  />
            </ScoreCard>
          )}
          <StyledStartButton onClick={()=>startGame()}>Start Game</StyledStartButton>

         {/* <Controller /> */}
         
        </aside>
        <>
          <div
      style={{
        position: 'absolute',
        right: '10px',
        bottom: '10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '24px 12px'
      }}
    >
      <div
        style={{
          padding: '18px',
          border: '1px solid #DDD',
          borderRadius: '72px'
        }}
      >
        <DpadRow>
          <UpDown onClick={() => playerRotate(stage, 1)} />
        </DpadRow>
        <DpadMidRow>
          <LeftRight onClick={() => movePlayer(-1)} />
          <LeftRight onClick={() => movePlayer(1)} />
        </DpadMidRow>
        <DpadRow>
          <UpDown onClick={() => temp()} />
        </DpadRow>
      </div>
          </div>
          </>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

const dpadSize = 36;

const DpadRow = styled.div`
  display: flex;
  justify-content: center;
  height: ${dpadSize}px;
  width: ${dpadSize * 3}px;
`;

const DpadMidRow = styled(DpadRow)`
  align-items: center;
  justify-content: space-between;
`;

const LeftRight = styled.button`
  width: ${dpadSize}px;
  height: ${dpadSize}px;
  border: 2px solid #ddd;
  &:hover {
    cursor: pointer;
  }
`;
const StyledStartButton = styled.button`
  box-sizing: border-box;

  margin: 0 0 20px 0;
  padding: 20px;
  min-height: 30px;
  width: 100%;
  border-radius: 20px;
  border: none;
  color: white;
  background: #333;
  font-family: Pixel, Arial, Helvetica, sans-serif;
  font-size: 1rem;
  outline: none;
  cursor: pointer;
`;


const UpDown = styled.button`
  width: ${dpadSize}px;
  height: ${dpadSize}px;
  border: 2px solid #ddd;
  &:hover {
    cursor: pointer;
  }
`;

const ScoreCard = styled.div`
@media (max-width: 768px) {
  display:flex;
  margin: 20px 0 10px 0;
}

`;





export default Tetris;
