import styled from "styled-components";

export const Container = styled.div`
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

export const Logo = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 40px;
  }
  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
  @media (max-width: 504px) {
    span {
      display: none;
    }
  }
`;

export const SearchContainer = styled.div`
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

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Menu = styled.div`
  display: none;
  @media (max-width: 504px) {
    display: block;
  }
`;

export const Dropdown = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  padding: 5px;
  top: 50px;
  right: 10px;
  z-index: 1000;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  svg {
    margin-right: 8px;
  }
`;

export const DropdownItem = styled.div`
  cursor: pointer;
`;
