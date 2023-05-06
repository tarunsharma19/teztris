import React from 'react';
import styled from 'styled-components';
import rules from './../img/rules.png'

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: #fff;
  width: 800px;
  height: 500px;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  @media (max-width: 600px) {
    width: 90%;
    height: auto;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background-color: transparent;
  font-size: 30px;
  cursor: pointer;

  &:hover {
    color: #f00;
  }
`;

const ImageContainer = styled.img`
  width: 100%;
  height: 100%;
  @media only screen and (max-width: 600px) {
        height: auto;
    }
  /* background-image: ${rules}; */
  background-size: cover;
  background-position: center;
`;

function Instructions({ onClose }) {
  return (
    <Overlay>
      <ModalContent>
        <CloseButton onClick={onClose}>×</CloseButton>
        <ImageContainer src={rules}/>
      </ModalContent>
    </Overlay>
  );
}

export default Instructions;
