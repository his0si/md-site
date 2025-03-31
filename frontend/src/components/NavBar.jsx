import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import myPage from "../assets/myPage.png";
import cart from "../assets/cart.png";
import ewhaianLogo from "../assets/ewhaianLogo.png";

const NaviBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  
  display: flex;
  justify-content: space-between;
  align-items: center;

  max-width:500px;
  margin:auto;

  padding: 10px;
  background-color: white;

`;

const Icon = styled.img`
  width: 25px;
  height: 25px;

  cursor: pointer;
`;
const NavBar = () => {
  return (
    <NaviBar>
      <Link to="/my-page">
        <Icon src={myPage} alt="My Page" />
      </Link>
      <Link to="/">
        <Icon src={ewhaianLogo} alt="Ewhaian Logo" />
      </Link>
      <Link to="/cart">
        <Icon src={cart} alt="Cart" />
      </Link>
    </NaviBar>
  );
};

export default NavBar;
