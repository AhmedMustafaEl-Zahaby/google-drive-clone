import styled from "styled-components";

export const DataContainer = styled.div`
  flex: 1 1;
  padding: 10px 0px 0px 20px;
  position: relative;

  @media (max-width: 504px) {
    padding: 5px;
  }
`;

export const DataHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid lightgray;
  height: 40px;
  .headerleft {
    display: flex;
    align-items: center;
  }
  .headerright svg {
    margin: 0px 10px;
  }
`;

export const DataGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 30px;

  @media (max-width: 813px) {
    justify-content: space-around;
  }
`;

export const DataFile = styled.div`
  text-align: center;
  border: 1px solid rgb(204 204 204 / 46%);
  margin: 10px;
  min-width: 200px;
  padding: 0px;
  padding-top: 10px;
  border-raduis: 5px;
  cursor: pointer;
  width: 25%;
  svg {
    font-size: 60px;
    color: gray;
  }
  p {
    border-top: 1px solid #ccc;
    margin: 0px;
    margin-top: 5px;
    font-size: 12px;
    background: whitesmoke;
    padding: 10px 0px;
  }
`;

export const DataListRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  p {
    display: flex;
    align-items: center;
    font-size: 13px;
    b {
      display: flex;
      align-items: center;
    }
    svg {
      font-size: 22px;
      margin: 10px;
    }
  }
`;
