/* eslint-disable no-undef */
import React, { useContext } from "react";
import { Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { DriveContext } from "../../Context/DriveContext";
import { auth, provider } from "../../firebase";
function LoginGoogle({ setError }) {
  const { setUser } = useContext(DriveContext);
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((res) => {
        setUser(res.user);
        localStorage.setItem("user", JSON.stringify(res.user));
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <Button
      onClick={signIn}
      style={{
        color: "white",
        width: "80%",
        textTransform: "none",
        backgroundColor: "#1a73e8",
        padding: "8px",
        fontSize: "15px",
        fontWeight: "100",
      }}
    >
      <GoogleIcon
        sx={{
          borderRadius: "2px",
          marginRight: "5px",
          position: "absolute",
          left: "10px",
          padding: "0px",
          fontSize: "33px",
          color: "#1a73e8",
          backgroundColor: "white",
          width: "30px",
          marginLeft: "-6px",
        }}
        style={{
          fontFamily: `Roboto Condensed`,
        }}
      ></GoogleIcon>
      Continue with Google
    </Button>
  );
}

export default LoginGoogle;
