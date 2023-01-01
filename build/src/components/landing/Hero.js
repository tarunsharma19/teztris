import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components';
import bgImage from '../../img/landingBg.webp';
import tezTile from '../../img/tezTile.png'

export default function Hero() {
  const scrollToTop = () =>{
    window.scrollTo({
      top: window.innerHeight, 
      behavior: 'smooth'
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };
  return (
    <>
    <WrapperHome>
      <Logo>
        <img src={tezTile}></img>
      </Logo>
      <ContentWrapper >
        <h1> The first video game to<br /> make it into space,<br />is now on tezos.</h1>
        <Link to={"/start"}><button>Play now</button></Link>
      </ContentWrapper>
      <a onClick={scrollToTop} class="scroll"><span></span></a>
    </WrapperHome>
    </>
  )
}
;



const Logo = styled.div `
 text-align:right;
 margin: 4rem 4rem 0 0 ;

 @media (max-width: 768px) {
 margin: 40px 2rem 0 0 ;

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
  margin: 6rem 4rem 0 0 ;
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
  margin: 40px 4rem 0 0 ;
}
button:hover {
  cursor:pointer;
}
@media (max-width: 768px) {
  button {
    font-size: 26px;
  }
  div{
    margin: 40px 2rem 0 0;
  }
  h1 {
    font-size: 2.5rem !important;
    margin: 4rem 2rem 0 0 ;
    font-weight: 500;
  }
  img {
    margin: 20px 2rem 0 0 ;
  }
  button {
    margin: 0 2rem 0 0 ;

  }
}  
`;

const WrapperHome = styled.div`
  width: 100vw;
  height: 100vh;
  background: url(${bgImage}) #000;
  background-attachment: fixed;
  background-size: cover;
  overflow: hidden;

  &&after{
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 100%;
  transform-origin: 0 100%;
  transform: translateZ(8px);
  pointer-events: none;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.013) 8%, rgba(0, 0, 0, 0.049) 14.8%, rgba(0, 0, 0, 0.104) 20.8%, rgba(0, 0, 0, 0.175) 26%, rgba(0, 0, 0, 0.259) 30.8%, rgba(0, 0, 0, 0.352) 35.3%, rgba(0, 0, 0, 0.45) 39.8%, rgba(0, 0, 0, 0.55) 44.5%, rgba(0, 0, 0, 0.648) 49.5%, rgba(0, 0, 0, 0.741) 55.2%, rgba(0, 0, 0, 0.825) 61.7%, rgba(0, 0, 0, 0.896) 69.2%, rgba(0, 0, 0, 0.951) 77.9%, rgba(0, 0, 0, 0.987) 88.1%, black 100%);
  z-index: 3;
}
.scroll {
  content: "";
  cursor: pointer;
  position: absolute;
  bottom: 10px; left: 50%;
  transform: translatex(-50%);
  z-index: 2;
  display: inline-block;
  color: #fff;
  transition: opacity .3s;
}

.scroll:hover {
  opacity:.5;
}
a {

  padding-top: 60px;
}
 a span {

  position: absolute;
  bottom: 5%;
  left: 50%;
  width: 30px;
  height: 50px;
  margin-left: -15px;
  border: 2px solid #fff;
  border-radius: 50px;
  box-sizing: border-box;
}
 a span::before {
  position: absolute;
  top: 10px;
  left: 50%;
  content: '';
  width: 6px;
  height: 6px;
  margin-left: -3px;
  background-color: #fff;
  border-radius: 100%;
  animation: sdb9 2s infinite;
  box-sizing: border-box;
}
@keyframes sdb9 {
  0% {transform: translate(0, 20px); opacity: 0;}
  40% {opacity: 1;}
  80% {transform: translate(0, 0); opacity: 0;}
  100% {opacity: 0;}
}

  @media (max-width: 768px) {
    background-position-x: -650px;
    h1{
      font-size:38px;
    }
  }
`;
