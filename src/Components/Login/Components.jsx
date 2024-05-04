import styled from "styled-components";

export const Container = styled.div`
  background-color: #f8f9fa;
  padding: 40px;
  width: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 120px;
    margin-bottom: 20px;
  }
`;

export const Description = styled.div`
  margin-top: 10px;
  text-align: center;
  font-size: 16px;
  color: grey;
  margin-bottom: 20px;
  font-weight: 300;
  font-family: "Roboto Condensed", sans-serif;
  a {
    color: #333;
    text-decoration: none;
    font-weight: 600;
  }
`;
