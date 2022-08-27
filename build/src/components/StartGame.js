import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components';
import bgImage from '../img/landingBg.jpg';
import tezLogo from '../img/tezlogo.png'
import tezTris from '../img/tezTris.png'
import { Input, TextField } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function Landing() {
const [gameIdInput, setGameIdInput] = useState("");
const [open, setOpen] = React.useState(false);
const [token, setToken] = React.useState('');
const [amount, setAmount] = React.useState(0);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);

console.log(token,amount);
const handleTokenChange = (event) => {
    setToken(event.target.value);
};
const handleAmountChange = (event) => {
    setAmount(event.target.value);
};
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  color: "#000",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const handleGameIdInput = (event) => {
    setGameIdInput(event.target.value);
  };
    return (
      <>
      <WrapperHome>
        <Logo>
          <img src={tezLogo}></img>
        </Logo>
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
            <div>
            <FormControl variant="filled" fullWidth  sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-filled-label">Token</InputLabel>
                <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={token}
                onChange={handleTokenChange}
                >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem value={0}>XTZ</MenuItem>
                <MenuItem value={1}>USDT</MenuItem>
                <MenuItem value={2}>Ctez</MenuItem>
                </Select>
                <br />
                <TextField id="filled-basic" label="Amount" value={amount} onChange={handleAmountChange} variant="filled" />
                <br />
                <Button variant="outlined">Start Game</Button>
            </FormControl>
            </div>
          </Box>
        </Fade>
      </Modal>
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
                        color: "#fff",
                      fontSize: "1.2rem",
                      margin: "10px",
                      background: "rgba(26, 28, 32, 0.75)",
                      height: "2.5rem",
                      borderRadius: "0.5rem",
                    }}
                    placeholder="Game Id"
                    value={gameIdInput}
                    onChange={handleGameIdInput}
                  />
                  <br />
          <button>Join a game</button>
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
  `;
  
  const ContentWrapper = styled.div `
  text-align: right;
  color:#fff;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  div{
    margin: 40px 50px 0 0;
  }
  h1 {
    font-size:52px;
    margin: 24px 60px 0 0 ;
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
  
  `;
  
  const WrapperHome = styled.div`
    width: 100vw;
    height: 100vh;
    background: url(${bgImage}) #000;
    background-size: cover;
    overflow: hidden;
  `;
  