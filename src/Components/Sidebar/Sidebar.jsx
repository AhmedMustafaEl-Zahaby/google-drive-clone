import React, { useContext } from "react";
import styled from "styled-components";
import MobileScreenShareIcon from "@mui/icons-material/MobileScreenShare";
import DevicesIcon from "@mui/icons-material/Devices";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import QueryBuilderOutlinedIcon from "@mui/icons-material/QueryBuilderOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddIcon from "@mui/icons-material/Add";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import { DriveContext } from "../../Context/DriveContext";

const Container = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1000;

  @media (max-width: 504px) {
    display: ${(props) => (props.isOpen ? "block" : "none")};
    height: 100vh;
    background-color: white;
    padding-top: 15px;
    margin-top: 0;
    width: 50%;
    min-width: 200px;
  }
`;

const SidebarBtn = styled.div`
  button {
    display: flex;
    align-items: center;
    background-color: transparent;
    border: 1px solid lightgray;
    padding: 5px 10px;
    border-radius: 40px;
    cursor: pointer;
    margin-left: 20px;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);

    span {
      margin-left: 10px;
      margin-right: 20px;
      font-size: 16px;
    }
  }

  @media (max-width: 504px) {
    button {
      padding: 5px 10px;
    }

    span {
      display: none;
    }
  }
`;

const Options = styled.div`
  margin-top: 10px;

  .progress-bar {
    padding: 0px 20px;
  }

  .progress-bar span {
    display: block;
    color: #333;
    font-size: 13px;
  }
`;

const Option = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 20px;
  border-radius: 0 20px 20px 0;

  &:hover {
    background-color: whitesmoke;
    cursor: pointer;
  }

  svg {
    margin-right: 10px;
  }

  svg.MuiSvgIcon-root {
    color: rgb(78, 78, 78);
  }

  span {
    font-size: 16px;
    color: rgb(78, 78, 78);
  }
`;

const Overlay = styled.div`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

function Sidebar() {
  const { open, toggleSidebar, resetSidebar } = useContext(DriveContext);

  const handleToggleSidebar = () => {
    toggleSidebar();
  };

  return (
    <>
      <Container isOpen={open}>
        <SidebarBtn>
          <button>
            <AddIcon />
            <span>New</span>
          </button>
        </SidebarBtn>
        <Options>
          <Option onClick={resetSidebar}>
            <MobileScreenShareIcon />
            <span>My Drive</span>
          </Option>
          <Option onClick={resetSidebar}>
            <DevicesIcon />
            <span>Computers</span>
          </Option>
          <Option onClick={resetSidebar}>
            <PeopleAltOutlinedIcon />
            <span>Shared with me</span>
          </Option>
          <Option onClick={resetSidebar}>
            <QueryBuilderOutlinedIcon />
            <span>Recent</span>
          </Option>
          <Option onClick={resetSidebar}>
            <StarBorderOutlinedIcon />
            <span>Starred</span>
          </Option>
          <Option onClick={resetSidebar}>
            <DeleteOutlineOutlinedIcon />
            <span>Trash</span>
          </Option>
        </Options>
        <hr />
        <Options>
          <Option>
            <CloudQueueIcon />
            <span>Storage</span>
          </Option>
          <div className="progress-bar">
            <progress size="tiny" value="50" max="100" />
            <span
              style={{
                fontSize: "13px",
                color: "rgb(78, 78, 78)",
              }}
            >
              15 GB of 30 GB used
            </span>
          </div>
        </Options>
      </Container>
      <Overlay isOpen={open} onClick={handleToggleSidebar} />
    </>
  );
}

export default Sidebar;
