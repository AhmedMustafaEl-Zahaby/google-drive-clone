import React, { useState } from "react";
import { Container, Description } from "./Components";
import LoginGoogle from "./LoginButton";
function Login() {
  const [error, setError] = useState("");
  return (
    <>
      {error !== "" && <ErrorDiv error={error} />}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
          backgroundColor: "#f8f9fa",
        }}
      >
        <Container>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Google_Drive_icon_%282020%29.svg/1200px-Google_Drive_icon_%282020%29.svg.png"
            alt="Google Drive"
          />
          <LoginGoogle setError={setError} />
          <Description>
            This is not an official Google Drive app, it's a clone made by
            <a
              href="https://www.linkedin.com/in/ahmed-el-zahaby-6199601b7/"
              target="_blank"
              rel="noreferrer"
            >
              {" "}
              Ahmed El-Zahaby
            </a>
          </Description>
        </Container>
      </div>
    </>
  );
}

export default Login;
