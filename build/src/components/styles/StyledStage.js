import styled from 'styled-components';

export const StyledStage = styled.div`

@media (max-width: 768px) {
  grid-template-rows: repeat(
    ${props => props.height},
    calc(3*22vw / ${props => props.width})
  );
  max-width: 100%;
}

  display: grid;
  grid-template-rows: repeat(
    ${props => props.height},
    calc(22vw / ${props => props.width})
  );
  grid-template-columns: repeat(${props => props.width}, 1fr);
  grid-gap: 1px;
  border: 2px solid #333;
  width: 100%;
  max-width: 22vw;
  background: #111;

 
`;
