import styled, { keyframes } from "styled-components";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Typography } from "@mui/material";

export const Container = styled.div`
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

export const SidebarBtn = styled.div`
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

export const Options = styled.div`
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

export const Option = styled.div`
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

export const Overlay = styled.div`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

export const Modal = styled.div`
  display: ${(props) => (props.open ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100000;
`;

export const ModalPopup = styled.div`
  background-color: #fff;
  max-width: 500px;
  width: 80%;
  margin: 0 auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid lightgray;
  padding-bottom: 10px;
  margin-bottom: 20px;

  h3 {
    margin: 0;
    color: #333;
  }

  svg {
    cursor: pointer;
  }
`;

export const ModalBody = styled.div`
  input.modal-submit {
    width: 100%;
    background: #454545;
    padding: 10px 20px;
    color: #fff;
    text-transform: uppercase;
    font-size: 16px;
    border: none;
    outline: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px;
  }
  .drop-area {
    border: 2px dashed grey;
    border-radius: 5px;
    padding: 20px;
    text-align: center;
    margin-bottom: 20px;
    cursor: pointer;
  }
  .file-input {
    display: none;
  }
`;

export const spinAnimation = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const SpinnerIcon = styled.div`
  width: 24px;
  height: 24px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top-color: #333;
  border-radius: 50%;
  animation: ${spinAnimation} 0.8s linear infinite;
`;

export const Uploading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 15px 30px;
  background-color: #f0f0f0;
  border-radius: 8px;
  color: #555;
  font-size: 18px;
  margin-top: 30px;
  span {
    margin-right: 10px;
    font-weight: 600;
  }
`;

export const ErrorDiv = ({ error }) => {
  return (
    <div
      style={{
        backgroundColor: "rgb(255, 235, 238)",
        padding: "10px",
        borderRadius: "5px",
        display: "flex",
        alignItems: "center",
        color: "white",
        marginBottom: "20px",
      }}
    >
      <ErrorOutlineIcon
        style={{
          marginRight: "10px",
          color: "rgb(211, 47, 47)",
        }}
      />
      <Typography
        variant="body1"
        sx={{
          color: "rgb(95, 33, 32)",
        }}
      >
        {error}
      </Typography>
    </div>
  );
};
