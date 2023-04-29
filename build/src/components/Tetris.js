import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { manageFunc } from "../App";
import { createStage, checkCollision } from "../gameHelpers";
import { StyledTetrisWrapper, StyledTetris } from "./styles/StyledTetris";

// Custom Hooks
import { useInterval } from "../hooks/useInterval";
import { usePlayer } from "../hooks/usePlayer";
import { useStage } from "../hooks/useStage";
import { useGameStatus } from "../hooks/useGameStatus";

// Components
import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";
import { FetchWalletAPI } from "../api/operations/wallet";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import Loader from "./Loader";
import winnerLottie from "../img/winner.json";
import looserLottie from "../img/looser.json";
import { useNavigate } from "react-router-dom";
import SoundPlay from "./SoundPlay";
import { useSelector } from 'react-redux';
import { connectSocket } from "../api/socket";
import { enqueueSnackbar } from "notistack";
import ResultModal from './Modal';

// const socket = require("../api/socket").socket;

const Tetris = () => {
  const socket = useSelector((state) => state.socket.socket); // get the socket object from the store
  // const socket = connectSocket("asdf")
  const [opponentScore, setOpponentScore] = useState(Number.MAX_SAFE_INTEGER);
  const { gameOver, setGameOver, gameIdInput } = useContext(manageFunc);
  const [dropTime, setDropTime] = useState(null)
  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] =
    useGameStatus(rowsCleared);
  const navigate = useNavigate();
  const [winnerDeclare, setWinnerDeclare] = useState(false)
  const [winnerNoti, setWinnerNoti] = useState(false)
  const [address, setAddress] = useState("");
  const [gameResult, setGameResult] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [opponentEnded, setOpponentEnded] = useState(false);
  const [ winNotif , setwinNotif] = useState(false);


  const getAddress = async () => {
    const wal = await FetchWalletAPI();
    console.log("fetched wallet", wal);
    setAddress(wal.wallet);
  };

  useEffect(() => {
    getAddress();
  }, [setGameOver]);

  useEffect(() => {
    socket.on("opponent-ended", (s) => {
      // console.log("opponent-ended score", s);
      setOpponentScore(parseInt(s));
      setOpponentEnded(true);
      enqueueSnackbar(`Opponent Ended game.`, {anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'right'
      }, variant: 'info' })
    });
  }, []);

  useEffect(() => {
    if (gameOver) {
      const endGameParams = {
        "gameId": gameIdInput,
         "score": score
      }
      socket.emit("endGame", endGameParams);
      console.log("gameover emit done");
      setIsModalOpen(true);
    }
  }, [gameOver]);

  const [winnerId, setWinnerId] = useState("");
  const [gotWinner, setGotWinner] = useState(false);

  useEffect(() => {
    socket.once("game-over", (obj) => {
      setGotWinner(true);
      console.log("game-over object", obj);
    });
    socket.on("issue", (status) => {
      alert(status);
    });
  });
  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  // const [resultString, setResultString] = useState(false);
  // const winnerCheck = () => {
  //   if (address == winnerId) {
  //     setResultString(true);
  //   } else {
  //     setResultString(false);
  //   }
  // };
  useEffect(()=>{
    if((score>opponentScore) && !(winNotif)){
      setWinnerDeclare(true)
      enqueueSnackbar(`Congrats, you surpassed your opponent's score.`, {anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'right'
      }, variant: 'success' })
      enqueueSnackbar(`You can end the game and claim your winnings.`, {anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'right'
      }, variant: 'info' })
      enqueueSnackbar(`You can continue the game to make a highscore.`, {anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'right'
      }, variant: 'info' })
      setGameResult("win")
      setwinNotif(true)
      console.log("winner selected")
    }
  })

  useEffect(()=>{
    if(gameOver){
        if(opponentEnded){
          if(score<opponentScore){
            setGameResult("lose")
          }
        }
        else{
          setGameResult("pending")
        }
    }
  },[gameOver,opponentEnded])

  useEffect(()=>{
    if(gameResult==="lose"){
      handleModalClose();
      setIsModalOpen(true);
    }
    if(gameResult==="win"){
      handleModalClose();
      setIsModalOpen(true);
    }
  },[gameResult])
  
  // const playAgain = () => {
  //   navigate('/start', {replace: true});
  // }

  window.onload = function () {
    navigate("/home", { replace: true });
  };

  useEffect(()=>{
    socket.emit('scoreEmitted',{"score":score})
  })
  // useEffect(() => {
  //   winnerCheck();
  // }, [winnerId]);

  //
  // GAME MACHANICS FUNCTOINS BELOW
  //

  // useEffect(() => {
  //   if (score >= opponentScore) {
  //     // setGameOver(true);
  //     // setDropTime(null);
  //   }
  // }, [score]);

  const movePlayer = (dir) => {
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

  const [startFlag, setStartFlag] = useState(true);
  const startGame = () => {
    // Reset everything
    if (startFlag) {
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
      setLevel((prev) => prev + 1);
      // Also increase speed
      setDropTime(1000 / (level + 1) + 200);
    }

    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      // Game over!
      if (player.pos.y < 1) {
        console.log("GAME OVER!!!");
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

  useInterval(() => {
    drop();
  }, dropTime);

  const move = ({ keyCode }) => {
    console.log(typeof keyCode, "+++++++++++++++++++++++", keyCode);
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

  const temp = () => {
    dropPlayer();
    if (!gameOver) {
      // Activate the interval again when user releases down arrow.
      setDropTime(1000 / (level + 1));
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    color: "#fff !important",
    bgcolor: "#001e3c",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: "25px",
  };

  return (
    <StyledTetrisWrapper
      role="button"
      tabIndex="0"
      onKeyDown={(e) => move(e)}
      onKeyUp={keyUp}
    >
      <ResultModal isOpen={isModalOpen} result={gameResult} onClose={handleModalClose} />
      {/* <SoundPlay /> */}
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <>
              <Display gameOver={gameOver} text="Game Over" />
              <Display text={`Score: ${score}`} />
            </>
          ) : (
            <ScoreCard>
              <Display text={`Score: ${score}`} />
              <Display text={`rows: ${rows}`} />
              <Display text={`Level: ${level}`} />
            </ScoreCard>
          )}
          <StyledStartButton onClick={() => startGame()}>
            Start Game
          </StyledStartButton>
         
          {/* <Controller /> */}
        </aside>
        <>
          <div
            style={{
              position: "absolute",
              right: "10px",
              bottom: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "24px 12px",
            }}
          >
            <div
              style={{
                padding: "18px",
                border: "1px solid #DDD",
                borderRadius: "72px",
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

  @media (max-width: 768px) {
    width: auto;
  }
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
