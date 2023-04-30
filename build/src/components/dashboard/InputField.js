import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import usdt from '../../img/usdt.png'
import usdc from '../../img/usdc.png'
import tez from '../../img/tez.png'

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 80px;
  padding: 0 16px;
`;

const Input = styled.input`
  flex: 1;
  height: 100%;
  border: none;
  outline: none;
  font-size: 16px;
  padding: 0 8px;
`;

const DropdownWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-left: 8px;
  border-radius: 50%;
  background-color: #f5f5f5;
  cursor: pointer;
`;

const DropdownImage = styled.img`
  width: 80% !important;
  margin: 5px 0 !important;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 120%;
  right: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 1px;
  z-index: 1;
`;

const DropdownMenuItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px;
  justify-content: center;
  cursor: pointer;
`;

const InputField = ({placeholder, setTokenIndex ,setTokenAmount, tokenAmount}) => {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(tez);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleMenuItemClick = (item,index) => {
    setTokenIndex(index)
    setSelectedItem(item);
    setIsDropdownOpen(false);
  };

  const handleAmountChange = (event) => {
    setTokenAmount(event.target.value);
  };


  return (
    <InputWrapper>
      <Input type="number" onChange={handleAmountChange} placeholder={placeholder} />
      <DropdownWrapper onClick={toggleDropdown}>
        <DropdownImage src={`${selectedItem}`} alt="Currency" />
        {isDropdownOpen && (
          <DropdownMenu>
            <DropdownMenuItem onClick={() => handleMenuItemClick(tez,0)}>
              
              <DropdownImage src={tez} alt="TEZ" />
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleMenuItemClick(usdc,1)}>
              
              <DropdownImage src={usdc} alt="USDC" />
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleMenuItemClick(usdt,2)}>
             
              <DropdownImage src={usdt} alt="USDT" />
            </DropdownMenuItem>
          </DropdownMenu>
        )}
      </DropdownWrapper>
    </InputWrapper>
  );
};
InputField.propTypes = {
placeholder: PropTypes.string,
};

export default InputField;
     
