import React from "react";
<<<<<<< HEAD

import styled from "styled-components";

import myPage from "../assets/myPage.png";
=======
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

>>>>>>> 47da32d39e9bb3267e3acf68a1ae2cc37ac95dd8
import cart from "../assets/cart.png";
import ewhaianLogo from "../assets/ewhaianLogo.png";

const NaviBar = styled.div`
<<<<<<< HEAD
  display: flex;

  justify-content: space-between;
  align-items: center;
=======
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  
  display: flex;
  justify-content: space-between;
  align-items: center;

>>>>>>> 47da32d39e9bb3267e3acf68a1ae2cc37ac95dd8
  max-width:500px;
  margin:auto;

  padding: 10px;
<<<<<<< HEAD
=======
  background-color: white;
>>>>>>> 47da32d39e9bb3267e3acf68a1ae2cc37ac95dd8
`;

const Icon = styled.img`
  width: 25px;
  height: 25px;
<<<<<<< HEAD

  cursor: pointer;
`;
const NavBar3 = () => {
  return (
    <NaviBar>
            <div style={{cursor:"pointer"}}>
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
            <path d="M22.5833 11.7917H1M1 11.7917L11.7917 22.5833M1 11.7917L11.7917 1" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            </div>
      <Icon src={ewhaianLogo} alt="Ewhaian Logo" />
      <Icon src={cart} alt="Cart" />
=======
  cursor: pointer;
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

const NavBar3 = () => {
  const navigate = useNavigate();

  return (
    <NaviBar>
      <BackButton onClick={() => navigate(-1)}>
        <svg width="21" height="21" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.5833 11.7917H1M1 11.7917L11.7917 22.5833M1 11.7917L11.7917 1" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </BackButton>
      <Link to="/">
        <Icon src={ewhaianLogo} alt="Ewhaian Logo" />
      </Link>
      <Link to="/cart">
        <Icon src={cart} alt="Cart" />
      </Link>
>>>>>>> 47da32d39e9bb3267e3acf68a1ae2cc37ac95dd8
    </NaviBar>
  );
};

<<<<<<< HEAD
export default NavBar3;
=======
export default NavBar3;
>>>>>>> 47da32d39e9bb3267e3acf68a1ae2cc37ac95dd8
