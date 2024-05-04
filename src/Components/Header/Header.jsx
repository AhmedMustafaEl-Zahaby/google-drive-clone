import React, { useContext } from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SettingsIcon from "@mui/icons-material/Settings";
import AppsIcon from "@mui/icons-material/Apps";
import Avatar from "@mui/material/Avatar";
import MenuIcon from "@mui/icons-material/Menu";
import { DriveContext } from "../../Context/DriveContext";
import {
  Container,
  Logo,
  SearchContainer,
  IconContainer,
  HiddenIcon,
  Menu,
} from "./Components";

function Header() {
  const { open, toggleSidebar, user } = useContext(DriveContext);
  return (
    <Container isOpen={open}>
      <Menu>
        <MenuIcon onClick={toggleSidebar} />
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
        <Avatar
          src={user?.photoURL}
          alt={user?.displayName}
          sx={{ cursor: "pointer" }}
        />
      </IconContainer>
      <HiddenIcon>
        <AppsIcon />
      </HiddenIcon>
    </Container>
  );
}

export default Header;
