import React, { useEffect, useState } from "react";
import Rocket from "../img/NFT.webp";
import KnightBg from "../img/NFT.webp";
import pinkNft from "../img/NFT2.webp";
import blueNft from "../img/NFT1.webp";
import greenNft from "../img/NFT3.webp";
import redNft from "../img/NFT.webp";

import Polygon from "../img/NFT.webp";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";
import tezTris from '../img/tezTris.png';
import background from '../img/background.png';

import tezos from '../img/tezos.svg';


import Business from "../img/stake.webp";
import Winner from "../img/earn.webp";
import Gaming from "../img/play.webp";
import Joint from "../img/Joint1.png";
import { Link } from "react-router-dom";
import emojiBlast from "../img/emojiBlast.png";
import styled, { keyframes } from "styled-components";
import tetrisFull from "../img/tetrisFull.webp";
import scrollreveal from "scrollreveal";
import {ParallaxProvider , Parallax } from 'react-scroll-parallax';

const theme = createTheme({
  typography: {
    fontFamily: "poppin",
  },
  palette: {
    primary: {
      main: "rgb(255,255,255)",
    },
  },
});

const useStyles = makeStyles({
  poppin: {
    fontSize: 40,
    color: "rgb(255,255,255)",
  },
  card: {
    boxShadow: "inset -8px -8px 40px 5px rgba(0, 0, 0, 0.4);",
    background: " linear-gradient(180deg, #932C50 0%, #BD3F32 99.42%);",
    color: "rgb(255,255,255)",
    height: "27rem",
    fontSize: "1.5rem",
    fontWeight: "700",
    textAlign: "center",
    borderRadius: "1rem",
    zIndex: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "start",
  },
  image: {
    borderRadius: "1rem 1rem 0 0",
    height: "9rem",
    width: "12rem",
    marginTop: "1.5rem",
    marginBottom: "1.5rem",
    zIndex: 2,
    boxShadow: "inset 0px -8px 15px 3px rgba(0, 0, 0, 0.25)",
  },
  para: {
    fontFamily: "Archivo",
    fontWeight: "400",
    color: "rgb(255,255,255)",
    padding: "1rem",
    fontSize: "1.75rem",
  },
  join: {
    position: "relative",
    zIndex: 0,
    height: "2.25rem",
    width: "10rem",
    padding: "0",
    margin: "0",
    right: 8,
  },
});

const floatingAnimation = keyframes`

	0% {
        transform: translateY(0) rotate(-4deg);
	}
	50% {
		transform: translateY(-40px) rotate(5deg);
	}
	100% {
        transform: translateY(0) rotate(-4deg);
	}
`;

const floatUpDown = keyframes`
    0% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-25px);
    }
    100% {
        transform: translateY(0);
    }
`;
const floatDownUp = keyframes`
    0% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(25px);
    }
    100% {
        transform: translateY(0);
    }
`;

const FloaterUpDown = styled.div`
transform: translateY(0);
background: transparent;
animation-name: ${floatUpDown};
animation-duration: 5s;
animation-iteration-count: infinite;
`;

const FloaterDownUp = styled.div`
transform: translateY(0);
background: transparent;
animation-name: ${floatDownUp};
animation-duration: 5s;
animation-iteration-count: infinite;
`;
const Work = () => {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme} >
      <Box
        sx={{
          
          height: 800,
          position: "relative",
        }}
        className="zindex"
      >
        
        {/* <img
          alt="circles"
          className="zindex-img"
          src={tetrisFull}
          style={{
            zIndex: "-1 ",
            position: "absolute",
            top: "0",
            objectFit: "cover",
            height: "100%",
            width: "100%",
          }}
        /> */}
        <CardWrap>
     <div
        style={{
          zIndex: "2",
          padding: "1.8rem 1.8rem 1.8rem 1rem",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span className="mainText" style={{ fontSize: "3rem" , fontWeight: "700" }}>
          Do You Know?
        </span>
        <img
          alt="Mindblowing"
          src={emojiBlast}
          style={{ height: "3rem", width: "3rem", margin: "0rem 1rem" }}
        />
      </div>
      <div style={{ width: "100%"}}>
        <div
          className="secondText"
          style={{
            fontSize: "1.5rem",
            fontWeight: "400",
            padding: "2rem 10rem",
            textAlign: "center",
          }}
        >
          Tetris is the top-selling game of all time. It had sold over 425 million copies on mobile devices alone as of 2014.
        </div>
      </div>
     </CardWrap>
 
        <Footer>
          <img className="logo" src={tezTris}>
          </img>
          <img className="tezos" src={tezos}>
          </img>
          <p>
            Made for Tezos by DevsOnly
          </p>
        </Footer>
        
      </Box>
    </ThemeProvider>
  );
};

const Footer = styled.div`
background: #00000075;
width: 100%;
min-height: 20vh;
display:flex;
position: Absolute;
bottom: 0;
justify-content: space-between;
flex-wrap: nowrap;
flex-direction: row;
align-items: center;
.logo{
  width:20%;
  margin: 0 0 0 60px;
}
p{
  margin: 0 60px 0 0;

}
@media (max-width: 768px) {
flex-direction: column;
.logo{
  width:45%;
  margin:20px 0;
}
p{
  margin:20px 0;
}

}
`;

const GridWrap = styled.div`

width: 100%;
overflow-x: auto;
overflow-y: hidden;

&::-webkit-scrollbar{
 display: none;
}
.MuiGrid-container {
  width: fit-content;
  flex-wrap : nowrap;
 
}
.MuiGrid-item {
  margin: 0 0 0 20px;
}

@media (max-width: 768px) {

  .MuiGrid-container {
    margin-left: -120px;
    overflow-y: hidden;
  }

}
`;

const CardWrap = styled.div`
  z-index: 2;
  width: 60%;
  margin: 80px auto;
  background: #ff8139;
  border-radius: 25px;
  color: #000;

  @media (max-width: 768px) {
  width: 80%;

    .mainText{
      font-size:1.8rem !important;
      font-weight:700;
    }
    .secondText{
      font-size:1.5rem !important;
      font-weight:500;
      padding 20px !important; 
    }
    img{
      height:30px !important;
      width:30px !important;
    }
  }
`;

const HowItWorks = () => {
  const classes = useStyles();

  return (
    <div
      style={{ width: "100%", marginBottom:"10rem"}}
      className="dyk"
    >
      <div
            className="mainText"
            style={{ textAlign:"center",fontSize: "5rem",fontWeight:"700", margin: "0 0 2rem 0", zIndex: "1" ,padding:"2rem 0 0 2rem"}}
          >
            How It Works?
          </div>
     <div
      >
    <GridWrap>
        <Grid container justifyContent="center" alignItems="center" spacing="0">
          <Grid item xs={2} className={classes.card}>
            <div className="work-div">
              <Container className={classes.card}>
                <img alt="business" src={Business} className={classes.image} />
                <div style={{ fontSize: "1.25rem" }}>
                  Stake your crypto coins
                </div>
                <Typography className={classes.para} style={{lineHeight:"1.1rem"}}>
                  Before matchmaking, user has to stake crypto coins and wait
                  for the rival to accept the challenge.
                </Typography>
              </Container>
            </div>
          </Grid>
          <Grid item xs={1} className={classes.join}>
            <img alt="Joint" src={Joint} className={classes.join}></img>
          </Grid>

          <Grid item xs={2} className={classes.card}>
            <div className="work-div">
              <Container className={classes.card} style={{}}>
                <img alt="Gaming" src={Gaming} className={classes.image} />

                <Container style={{ fontSize: "1.25rem" }}>
                  Play tetris till you win 
                </Container>
                <Typography className={classes.para } style={{lineHeight:"1.1rem"}}>
                  After staking coins for the match, user will be directed to a
                  Tetris table where user will play his best to beat the opponent.
                </Typography>
              </Container>
            </div>
          </Grid>
          <Grid item xs={1}>
            <img
              alt="Joint"
              src={Joint}
              className={classes.join}
              style={{ right: 16 }}
            ></img>
          </Grid>
          <Grid item xs={2} className={classes.card}>
            <div className="work-div">
              <Container className={classes.card}>
                <img alt="Winner" src={Winner} className={classes.image} />
                <Container style={{ fontSize: "1.25rem" }}>
                  Winner takes it all
                </Container>
                <Typography className={classes.para} style={{lineHeight:"1.1rem"}}>
                  After the match is over, the winner will win the opponent’s
                  stake coins and both can mint any position/whole game as an
                  NFT.
                </Typography>
              </Container>
            </div>
          </Grid>
        </Grid>
        </GridWrap>
      </div>

    </div>
  );
};

const Floater = styled.div`
    animation-name: ${floatingAnimation};
    animation-duration: 5s;
    animation-iteration-count: infinite;
`;
const Functioning = () => {
  return (
    <>
      <div className="home-bg func" >
        <FuncWrap
        >
          <div className="wrap"
          ><Floater>
            <img
              alt="pink NFT"
              src={pinkNft}
              className="imgAnimPink"
              style={{
                  height: "220px",
                  position: "relative",
                  left: "15rem",
                  bottom: "1rem",
                }}
                />
            </Floater>
            <Floater>

            <img
              alt="blue NFT"
              src={blueNft}
              className="imgAnimBlue"
              style={{
                  transform: "rotate(10deg)",
                  height: "180px",
                  position: "relative",
                  right: "10rem",
                  top: "15rem",
                }}
                />
            </Floater>
            <Floater>
            <img
              alt="green NFT"
              src={greenNft}
              className="imgAnimGreen"
              style={{
                transform: "rotate(-25deg)",
                height: "320px",
                position: "relative",
                right: "5rem",
                top: "22rem",
              }}
            />
            </Floater>
          </div>
          <div
          className="content"
            style={{
              height: "80vh",
              float: "right",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              justifyContent: "center",
            }}
          >
            <span className="explainMain" style={{ fontSize: "5rem" , fontWeight: "700" }}>
              Play Smart
            </span>
            <span className="explainMain" style={{ fontSize: "3rem" , fontWeight: "700"  }}>
              Make money smartly
            </span>
            <br />
            <span className="explainDet">
              So all you have to do is, put a amount to stake and play a Tetris game, and when the game is
              finished, you can choose any position from any of your gameyour gameplay to be
              minted as an NFT and{" "}
              <b style={{ fontWeight: "700" }}>will be forever cherished</b>{" "}
              even after your life by the{" "}
              <b style={{ fontWeight: "700" }}>nature of the Blockchain.</b>
            </span>
          </div>
        </FuncWrap>
      </div>
        <UniqueWrap className="home-bg2"
        >
          <div className="content"
            style={{
              height: "80vh",
              float: "right",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              justifyContent: "center",
            }}
          >
            <span className="explainMain" style={{fontSize:"4rem" , fontWeight:"700"}}>Being Unique</span>
            <span className="explainMain" style={{ fontSize: "3rem", fontWeight:"700" }}>
              is the KEY
            </span>
            <br />

            <br />
            <span className="explainDet" style={{ fontWeight: "500" }}>
              Your NFT will include:-
            </span>
            <ul>
              <li className="explainDet">
                The details of the your opponent.
              </li>
              <li className="explainDet">The position that you chose.</li>
              <li className="explainDet">No. of staked tokens.</li>
              <li className="explainDet">
                A description box to describe the significance of your NFT.
              </li>
              <li className="explainDet">
                You can even choose the color for your NFT.
              </li>
            </ul>
          </div>
          <div className="content"
            style={{
              height: "100vh",

              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FloaterUpDown>

            <img
              alt="red NFT"
              src={redNft}
              className="imgAnimR"
              style={{
                  height: "400px",
                position: "relative",
                left: "8rem",
                top: "2rem",
                zIndex: "4",
                opacity: "1",
              }}
              />
              </FloaterUpDown>
            <FloaterDownUp>

            <img
              alt="green NFT"
              src={greenNft}
              className="imgAnimG"
              style={{
                height: "320px",
                position: "relative",

                top: "1.5rem",
                left: "-4rem",
                zIndex: "3",
                opacity: "0.75",
              }}
            />
            </FloaterDownUp>
            <FloaterUpDown>

            <img
              alt="pink NFT"
              src={pinkNft}
              className="imgAnimP"
              style={{
                height: "220px",
                position: "relative",

                top: "1rem",
                left: "-12.5rem",
                zIndex: "2",
                opacity: "0.5",
              }}
            />
            </FloaterUpDown>
            <FloaterDownUp>

            <img
              alt="blue NFT"
              src={blueNft}
              className="imgAnimB"
              style={{
                height: "180px",
                position: "relative",

                top: "0.75rem",
                left: "-19.25rem",
                zIndex: "1",
                opacity: "0.25",
              }}
            />
            </FloaterDownUp>
          </div>
        </UniqueWrap>
    </>
  );
};
const FuncWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around center;
  align-items: stretch;

  .wrap {      
    width: 50%;
    display: flex;
    alignI-items: center;
    justify-content: center;
    padding-bottom: 25rem;
  }

  .content {
    box-sizing: border-box;
    width: 50%;
    padding: 0 5rem;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    .wrap{
      width:100%;
      height:100%;
      margin-bottom:5rem;
    }
    .content {
      width: 100%;
      padding: 0 2rem;
    }
  }

`;
const UniqueWrap = styled.div `
  display: flex;
  flex-direction: row;
  justify-content: space-around center;
  align-items: center;

  .content {
    box-sizing: border-box;
    width: 50%;
    padding: 0 0 0 5rem;
  }

  @media (max-width: 768px) {

    flex-direction: column-reverse;

    .content {
      width: 100%;
      padding: 0 2rem;
    }
  }

`;
function LandingPage() {

  useEffect(() => {
    const registerAnimations = () => {
      const sr = scrollreveal({
        origin: "top",
        distance: "80px",
        duration: 2000,
        reset: true,
      });
      sr.reveal(
        `
        .dyk,
        .func,
        .work
    `,
        {
          interval: 500,
        }
      );
    };
    registerAnimations();
  }, []);

  return (
    <div>
      <ParallaxProvider>
      <Parallax style={{ background: `url(${background})` , objectFit:"cover" }}>

      <HowItWorks />
      <Functioning />
      <Work />

      </Parallax>
      </ParallaxProvider>
      
    </div>
  );
}

export default LandingPage;