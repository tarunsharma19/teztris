import styled from 'styled-components';
// BG Image
import bgImage from '../../img/back.jpg';

export const StyledTetrisWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: url(${bgImage}) #000;
  background-size: cover;
  overflow: hidden;
  @media (max-width: 768px) {
    background-position-x: -650px;
  }
`;

export const StyledTetris = styled.div`
  @media (max-width: 768px) {
    flex-direction: column;

    aside {
      padding : 0;
    }
  }

  display: flex;
  align-items: flex-start;
  padding: 40px;
  margin: 0 auto;
  max-width: 900px;
  justify-content : center;

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
