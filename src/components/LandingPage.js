import React, { useEffect, useState } from "react";
import Rocket from "../img/NFT.png";
import KnightBg from "../img/NFT.png";
import pinkNft from "../img/NFT2.png";
import blueNft from "../img/NFT1.png";
import greenNft from "../img/NFT3.png";
import redNft from "../img/NFT.png";

import Polygon from "../img/NFT.png";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";

import Business from "../img/stake.webp";
import Winner from "../img/earn.webp";
import Gaming from "../img/play.webp";
import Joint from "../img/Joint1.png";
import { Link } from "react-router-dom";
import emojiBlast from "../img/emojiBlast.png";
import styled, { keyframes } from "styled-components";
import tetrisFull from "../img/tetrisFull.jpg";
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
    // margin: "4rem 0",
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

    // padding: "0 1rem 0 2rem",
  },
  image: {
    borderRadius: "1rem 1rem 0 0",
    height: "9rem",
    width: "12rem",
    marginTop: "1.5rem",
    marginBottom: "1.5rem",
    zIndex: 2,
    // padding: "0.5rem",
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

const Home = () => {
  return (
    <>
      <div className="home-bg">
        <div className="top-left"></div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "50vh",
            position: "relative",
            bottom: "10rem",
          }}
        >
          <section
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img src={Rocket} alt="rocket" className="rimg" />
          </section>
          <section className="text">
            <div className="blur-container">
              <div className="blur-bg"></div>
              <div className="tagline">
                Your <span className="tagline-bold">Position</span> <br />
                Your <span className="tagline-bold">Ownership</span>
              </div>
            </div>

            <ul className="tag-points">
              <li>• Stake crypto, Winners takes it all.</li>
              <li>• Mint chess positions as NFTs from your games. </li>
              <li>• Mint your match as an Animated GIF NFT. </li>
              <li>• Purely Decentralised. #Web3.0</li>
            </ul>
            <Link to="/app">
              <button className="enter-btn">
                Enter Dapp
                <span className="triangle"></span>
              </button>
            </Link>
          </section>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            alignContent: "center",
            position: "relative",
            float: "right",
            marginRight: "20rem",
            bottom: "10rem",
            left: "10rem",
          }}
        >
          <div>
            <img
              className="mainKnight"
              alt="chess knight"
              src={KnightBg}
              style={{
                width: "20",
                height: "38rem",
                position: "relative",
                bottom: "10rem",
              }}
            />
            <a href="https://polygon.technology/" target="_blank">
              <img alt="Powered by polygon" src={Polygon} className="polygon" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

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
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          bgcolor: "rgb(25, 28, 32)",
          height: 800,
          paddingTop: "6rem",
          position: "relative",
        }}
        className="zindex"
      >
        {/* <Typography
          sx={{
            color: "primary.main",
            fontSize: "5rem",
            textAlign: "center",
            fontWeight: "700",
            marginBottom: "8rem",
          }}
        >
          How it works?
        </Typography> */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="mainText"
            style={{ fontSize: "5rem", margin: "-3rem 0 2rem 0", zIndex: "1" }}
          >
            How It Works?
          </div>
        </div>

        <img
          alt="circles"
          className="zindex-img"
          src={tetrisFull}
          style={{
            position: "absolute",
            top: "0",
            // left: "1rem",
            height: "100%",
            width: "100%",
            zIndex: "0",
          }}
        />

        <Grid container justifyContent="center" alignItems="center" spacing="0">
          <Grid item xs={2} className={classes.card}>
            <div className="work-div">
              <Container className={classes.card}>
                <img alt="business" src={Business} className={classes.image} />
                <div style={{ fontSize: "1.25rem" }}>
                  Stake your crypto coins
                </div>
                <Typography className={classes.para}>
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
                  Play tetris 
                </Container>
                <Typography className={classes.para}>
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
                <Typography className={classes.para}>
                  After the match is over, the winner will win the opponent’s
                  stake coins and both can mint any position/whole game as an
                  NFT.
                </Typography>
              </Container>
            </div>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

const DoYouKnow = () => {
  return (
    <div
      style={{ width: "100%", height: "60vh", background: "#000" }}
    >
      <div
        style={{
          height: "20vh",
          width: "100%",

          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span className="mainText" style={{ fontSize: "5rem" }}>
          Do You Know?
        </span>
        <img
          alt="Mindblowing"
          src={emojiBlast}
          style={{ height: "5rem", width: "5rem", margin: "0rem 1rem" }}
        />
      </div>
      <div style={{ width: "100%", height: "30vh" }}>
        <div
          className="mainText"
          style={{
            fontSize: "2.5rem",
            fontWeight: "400",
            padding: "2rem 10rem",
            textAlign: "center",
          }}
        >
          Tetris is the top-selling game of all time. It had sold over 425 million copies on mobile devices alone as of 2014.
        </div>
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
      <div className="home-bg" style={{background:"#141414"}}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              height: "100vh",
              width: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingBottom: "25rem",
            }}
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
            style={{
              height: "80vh",
              width: "50%",

              float: "right",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              justifyContent: "center",
              paddingLeft: "5rem",
              paddingRight: "5rem",
            }}
          >
            <span className="explainMain" style={{ fontSize: "5rem" }}>
              Play Smart
            </span>
            <span className="explainMain" style={{ fontSize: "3rem" }}>
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
        </div>
      </div>
      <div className="home-bg2">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              height: "80vh",
              width: "50%",

              float: "right",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              justifyContent: "center",
              paddingLeft: "5rem",
            }}
          >
            <span className="explainMain">Being Unique</span>
            <span className="explainMain" style={{ fontSize: "3rem" }}>
              is the KEY
            </span>
            <br />

            <br />
            <span className="explainDet" style={{ fontWeight: "500" }}>
              Your NFT will include:-
            </span>
            <ul>
              <li className="explainDet">
                • The details of the your opponent.
              </li>
              <li className="explainDet">• The position that you chose.</li>
              <li className="explainDet">• No. of staked tokens.</li>
              <li className="explainDet">
                • A description box to describe the significance of your NFT.
              </li>
              <li className="explainDet">
                • You can even choose the color for your NFT.
              </li>
            </ul>
          </div>
          <div
            style={{
              height: "100vh",
              width: "50%",

              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: "8rem",
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
        </div>
      </div>
    </>
  );
};


function LandingPage() {
  return (
    <div>

      <DoYouKnow />
      <Functioning />
      <Work />
    </div>
  );
}

export default LandingPage;