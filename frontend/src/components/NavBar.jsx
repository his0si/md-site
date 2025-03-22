import React from "react";

import styled from "styled-components";

import myPage from "../assets/myPage.png";
import cart from "../assets/cart.png";
import ewhaianLogo from "../assets/ewhaianLogo.png";

const NaviBar = styled.div`
  display: flex;

  justify-content: space-between;
  align-items: center;

  padding: 10px;
  //   border-bottom: 1px solid #ddd;
`;

const Icon = styled.img`
  width: 30px;
  height: 30px;

  cursor: pointer;
`;
const NavBar = () => {
  return (
    <NaviBar>
      <Icon src={myPage} alt="My Page" />
      <Icon src={ewhaianLogo} alt="Ewhaian Logo" />
      <Icon src={cart} alt="Cart" />
    </NaviBar>
  );
};

export default NavBar;
