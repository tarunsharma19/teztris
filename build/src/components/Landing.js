import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components';
import bgImage from '../img/landingBg.webp';
import tezLogo from '../img/tezlogo.png'
import tezTris from '../img/tezTris.png'
import LandingPage from './LandingPage';


export default function Landing() {
  return (
    <>
    <WrapperHome>
      <Logo>
        <img src={tezLogo}></img>
      </Logo>
      <ContentWrapper>
        <h1> The first video game to<br /> make it into space,<br />is now on tezos.</h1>
        <img src={tezTris} alt=''></img>
        <Link to={"/start"}><button>Play now</button></Link>
      </ContentWrapper>
    </WrapperHome>
    <LandingPage />
    </>
  )
}
;



const Logo = styled.div `
 text-align:right;
 margin: 40px 60px 0 0 ;

 @media (max-width: 768px) {
   img{
    width:40%;
   }
}
`;

const ContentWrapper = styled.div `
text-align: right;
color:#fff;
display: flex;
flex-direction: column;
align-items: flex-end;
h1 {
  font-size:52px;
  margin: 24px 60px 0 0 ;
}
img {
  width: 280px;
  margin: 20px 50px 0 0 ;
}
button {
  width: 240px;
  height: 72px;
  font-size: 32px;
  font-weight: 700;
  background-color: #0D61FF;
  color:#fff;
  border-radius:20px;
  margin: 40px 50px 0 0 ;
}
button:hover {
  cursor:pointer;
}
@media (max-width: 768px) {
  button {
    font-size: 26px;
  }
  div{
    margin: 40px 20px 0 0;
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
