import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components';
import bgImage from '../img/landingBg.jpg';
import tezLogo from '../img/tezlogo.png'
import tezTris from '../img/tezTris.png'
import { Input, TextField } from '@mui/material';

export default function Landing() {
const [gameIdInput, setGameIdInput] = useState("");
const handleGameIdInput = (event) => {
    setGameIdInput(event.target.value);
    console.log(event.target.value);
  };
    return (
      <>
      <WrapperHome>
        <Logo>
          <img src={tezLogo}></img>
        </Logo>
        <ContentWrapper>
          <h1>Let's start Playing!!</h1>
          <img src={tezTris} alt=''></img>
        <div style={{textAlign:"Right"}}> 
            <button>Create a game</button>
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
  