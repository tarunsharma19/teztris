import styled from 'styled-components';
// BG Image
import bgImage from '../../img/back.webp';

export const StyledTetrisWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: url(${bgImage}) #000;
  background-size: cover;
  overflow: hidden;
  @media (max-width: 768px) {
    background-position-x: -650px;
  }
  .instructions-btn{
    float: right;
    margin: 10px;
    font-size: 20px;
    width: 30px;
    height: 30px;
    border-radius: 15px;
  }
`;

export const StyledTetris = styled.div`
  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: flex-start;
    
    aside {
      padding : 0;
    }
  }

  display: flex;
  height: 100vh;
  box-sizing: border-box;
  align-items: flex-start;
  padding: 40px;
  margin: 0 auto;
  max-width: 900px;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: space-between;
  flex-direction: row;

  aside {
    width: 100%;
    max-width: 200px;
    display: block;
    padding: 0 20px;
    @media (max-width: 768px) {
      padding: 0;
    }
  }
  
`;
