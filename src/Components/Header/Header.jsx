import React, { useContext, useState, useRef, useEffect } from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SettingsIcon from "@mui/icons-material/Settings";
import AppsIcon from "@mui/icons-material/Apps";
import Avatar from "@mui/material/Avatar";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { DriveContext } from "../../Context/DriveContext";
import {
  Container,
  Logo,
  SearchContainer,
  IconContainer,
  Menu,
  Dropdown,
  DropdownItem,
} from "./Components";

function Header() {
  const {
    open,
    toggleSidebar,
    user,
    showDropdown,
    setShowDropdown,
    setSearchName,
  } = useContext(DriveContext);
  const dropdownRef = useRef(null);
  const [search, setSearch] = useState("");
  const handleAvatarClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    setShowDropdown(false);
    localStorage.removeItem("user");
    window.location.reload();
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      console.log("clicked outside");
      setShowDropdown(false);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter") setSearchName(search);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
        <input
          type="text"
          placeholder="Search in Drive"
          onChange={handleSearch}
          onKeyPress={handleSearchSubmit}
        />
        <FormatAlignCenterIcon />
      </SearchContainer>
      <IconContainer>
        <HelpOutlineIcon
          sx={{
            "@media (max-width: 504px)": {
              display: "none",
            },
          }}
        />
        <SettingsIcon
          sx={{
            "@media (max-width: 504px)": {
              display: "none",
            },
          }}
        />
        <AppsIcon
          sx={{
            "@media (max-width: 504px)": {
              display: "none",
            },
          }}
        />
        <Avatar
          src={user?.photoURL}
          alt={user?.displayName}
          sx={{ cursor: "pointer" }}
          onClick={handleAvatarClick}
        />
        {showDropdown && (
          <Dropdown ref={dropdownRef}>
            <div
              onClick={handleLogout}
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <LogoutIcon />
              <DropdownItem>Logout</DropdownItem>
            </div>
          </Dropdown>
        )}
      </IconContainer>
    </Container>
  );
}

export default Header;
