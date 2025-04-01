import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

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

const NavBar2 = () => {
  const navigate = useNavigate();
    
  return (
    <NaviBar>
      <BackButton onClick={() => navigate(-1)}>
        <svg width="21" height="21" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.5833 11.7917H1M1 11.7917L11.7917 22.5833M1 11.7917L11.7917 1" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </BackButton>

      <Link to="/">
        <Icon>
          <svg width="21" height="21" viewBox="0 0 25 27" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 12.4262V26H16V19C16 17.8954 15.1046 17 14 17H11C9.89543 17 9 17.8954 9 19V26H1L0.999999 12.4262L0.498319 11.9036L1 12.4262L12.5 1.38622L13.1925 0.664831L12.5 1.38622L24 12.4262Z" stroke="black" strokeWidth="2"/>
          </svg>
        </Icon>
      </Link>
    </NaviBar>
  );
};

export default NavBar2;