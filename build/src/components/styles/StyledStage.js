import styled from 'styled-components';

export const StyledStage = styled.div`

@media (max-width: 768px) {
  grid-template-rows: repeat( 18, calc(3*22vw / 10) );
  max-width: 100%;
  width: 100%;
  height: auto;
}

  display: grid;
  grid-template-columns: repeat(${props => props.width}, 1fr);
  grid-gap: 1px;
  border: 2px solid #333;
  width: 50%;
  height: 100%;
  background: #111;

 
`;
