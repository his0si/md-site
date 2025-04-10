import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import ewhaianLogo from "../assets/ewhaianLogo.png";
import cart from "../assets/cart.png";

const NaviBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  
  display: flex;
  justify-content: space-between;
  align-items: center;

  max-width: 500px;
  margin: auto;

  padding: 10px;
  background-color: white;
`;

const Icon = styled.div`
  width: 25px;
  height: 25px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BackButton = styled.div`
  cursor: pointer;
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
`;

const CenterIcon = styled.img`
  width: 25px;
  height: 25px;
  cursor: pointer;
`;

const NavBar3 = () => {
  const navigate = useNavigate();
  return (
    <NaviBar>
      <BackButton onClick={() => navigate(-1)}>
        <svg width="21" height="21" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.5833 11.7917H1M1 11.7917L11.7917 22.5833M1 11.7917L11.7917 1" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </BackButton>
      <CenterIcon src={ewhaianLogo} alt="Ewhaian Logo" onClick={() => navigate("/")} />
      <Icon onClick={() => navigate("/cart")}>
        <img src={cart} alt="Cart" style={{ width: "25px", height: "25px" }} />
      </Icon>
    </NaviBar>
  );
};

export default NavBar3;