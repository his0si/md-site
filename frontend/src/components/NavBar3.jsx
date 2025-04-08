import React from "react";

import styled from "styled-components";

import cart from "../assets/cart.png";
import ewhaianLogo from "../assets/ewhaianLogo.png";
import { useNavigate } from "react-router-dom";

const NaviBar = styled.div`
  display: flex;

  justify-content: space-between;
  align-items: center;
  max-width:500px;
  margin:auto;

  padding: 10px;
`;

const Icon = styled.img`
  width: 25px;
  height: 25px;

  cursor: pointer;
`;
const NavBar3 = () => {
  const navigate = useNavigate();
  return (
    <NaviBar>
            <div style={{cursor:"pointer"}} onClick={()=> navigate(-1)}>
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
            <path d="M22.5833 11.7917H1M1 11.7917L11.7917 22.5833M1 11.7917L11.7917 1" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            </div>
      <Icon src={ewhaianLogo} alt="Ewhaian Logo" onClick={()=> navigate("/")}/>
      <Icon src={cart} alt="Cart" onClick={
        ()=> navigate("/cart")
        }/>
    </NaviBar>
  );
};

export default NavBar3;