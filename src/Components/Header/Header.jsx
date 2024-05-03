import React, { useContext } from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SettingsIcon from "@mui/icons-material/Settings";
import AppsIcon from "@mui/icons-material/Apps";
import Avatar from "@mui/material/Avatar";
import MenuIcon from '@mui/icons-material/Menu';
import {DriveContext} from "../../Context/DriveContext";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 20px;
  background-color: white;
  gap: 10px;
  @media (max-width: 504px) {
    padding: 5px 5px;
    gap: 5px;
    z-index: ${(props) => (props.isOpen ? "1000" : "0")};
    position: ${(props) => (props.isOpen ? "sticky" : "relative")};
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 40px;
  }
  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
  @media (max-width: 504px){
    span {
      display: none;
    }
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  max-width: 700px;
  background-color: whitesmoke;
  padding: 12px;
  border-radius: 10px;
  input {
    flex: 1;
    background-color: transparent;
    border: none;
    outline: none;
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  @media (max-width: 504px) {
    display: none;
  }
`;
const HiddenIcon = styled.div`
  display: none;
  @media (max-width: 504px) {
    display: block;
  }
`;

const Menu = styled.div`
  display: none;
  @media (max-width: 504px) {
    display: block;
  }
`;

function Header() {
  const {open , toggleSidebar} = useContext(DriveContext);
  return (
    <Container isOpen = {open}>
      <Menu>
          <MenuIcon onClick = {toggleSidebar}/>
      </Menu> 
      <Logo>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/d/da/Google_Drive_logo.png"
          alt="Drive Logo"
        />
        <span>Drive</span>
      </Logo>
      <SearchContainer>
        <SearchIcon />
        <input type="text" placeholder="Search in Drive" />
        <FormatAlignCenterIcon />
      </SearchContainer>
      <IconContainer>
        <HelpOutlineIcon />
        <SettingsIcon />
        <AppsIcon />
        <Avatar />
      </IconContainer>
      <HiddenIcon>
        <AppsIcon />
      </HiddenIcon>
    </Container>
  );
}

export default Header;
