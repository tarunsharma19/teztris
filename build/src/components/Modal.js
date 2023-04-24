import React from 'react';
import Modal from 'react-modal';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";


Modal.setAppElement('#root');

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 20px;
  padding: 20px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  font-size: 30px;
  color: #fff;
  opacity: ${props => props.disabled ? 0.5 : 1};
`;

const Title = styled.h2`
  font-size: 40px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 20px;
`;

const Message = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 20px;
`;

const WarningText = styled.p`
  font-size: 14px;
  color: #fff;
  margin-top: 20px;
`;

const customModalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 999,
  },
  content: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    border: 'none',
    borderRadius: '20px',
    padding: '0',
    background: 'none',
    width: '80%',
    maxWidth: '500px',
    height: 'auto',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
};

function ResultModal(props) {
    const navigate = useNavigate();

  const handleModalClose = () => {
    props.onClose();
    navigate("/home", { replace: true });
  };

  return (
    <Modal isOpen={props.isOpen} onRequestClose={handleModalClose}  style={customModalStyles}>
      <ModalWrapper>
        <CloseButton disabled={props.result === 'pending'} onClick={handleModalClose}>
          <AiOutlineCloseCircle />
        </CloseButton>
        <Title>
          {props.result === 'win' ? 'Congratulations!' :
          props.result === 'lose' ? 'Better luck next time!' :
          'Game in progress...'}
        </Title>
        {props.result === 'pending' ? (
          <>
            <Message>Waiting for the opponent to finish the game.</Message>
            <WarningText>Do not close the modal or switch tabs.</WarningText>
          </>
        ) : (
          <Message>
            {props.result === 'win' ? 'You won the game! Keep up the good work.' :
            'You lost the game. Try again and beat your high score!'}
          </Message>
        )}
        <img src="https://www.example.com/game-icon.png" alt="Game icon" />
      </ModalWrapper>
    </Modal>
  );
}

export default ResultModal;