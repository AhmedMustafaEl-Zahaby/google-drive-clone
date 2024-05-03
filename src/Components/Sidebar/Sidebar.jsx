import React, { useContext , useState } from "react";
import styled , {keyframes}from "styled-components";
import MobileScreenShareIcon from "@mui/icons-material/MobileScreenShare";
import DevicesIcon from "@mui/icons-material/Devices";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import QueryBuilderOutlinedIcon from "@mui/icons-material/QueryBuilderOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddIcon from "@mui/icons-material/Add";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import CloseIcon from "@mui/icons-material/Close";
import firebase from "firebase/compat/app"
import {db , storage} from "../../firebase";
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

const Modal = styled.div`
  display: ${(props) => (props.open ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100000;
`;

const ModalPopup = styled.div`
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

const ModalHeader = styled.div`
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

const ModalBody = styled.div`
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

const spinAnimation = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const SpinnerIcon = styled.div`
  width: 24px;
  height: 24px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top-color: #333;
  border-radius: 50%;
  animation: ${spinAnimation} 0.8s linear infinite;
`;

const Uploading = styled.div`
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

function Sidebar() {
  const { open, toggleSidebar, resetSidebar } = useContext(DriveContext);
  const [openModal , setOpenModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);
  const handleToggleSidebar = () => {
    toggleSidebar();
  };
  const handelFile = (e) => {
    if(e.target.files[0]){
      setFile(e.target.files[0]);
    }
  }
  const handleModalClose = () => {
    setOpenModal(false);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  const handleFileUpload = (e) => {
    // e.preventDefault();
    setUploading(true);
    storage.ref(`files/${file.name}`).put(file).then((snapshot) => {
      console.log(snapshot);
      storage.ref("files").child(file.name).getDownloadURL().then(url => {
        db.collection("myFiles").add({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          caption: file.name,
          fileUrl: url,
          size: snapshot._delegate.bytesTransferred,
        });
        setUploading(false);
        setOpenModal(false);
        setFile(null);
      });
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  
  const handleDragEnter = (e) => {
    e.preventDefault();
  };
  
  const handleDragLeave = (e) => {
    e.preventDefault();
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setFile(files[0]);
    }
  };

  return (
    <>
      <Modal open={openModal} onClose={handleModalClose}>
        <ModalPopup>
          <form onSubmit={handleFormSubmit}>
            <ModalHeader>
              <h3>Upload File</h3>
              <CloseIcon onClick={handleModalClose} />
            </ModalHeader>
            <ModalBody>
              {!uploading ?
              <>
              <div
                className="drop-area"
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => document.getElementById("fileInput").click()}
              >
                <CloudQueueIcon style={{ fontSize: "50px", color: "#333" }} />
                <p>Drop files here or click to upload</p>
              </div>
              <p style={{
                textAlign: "center",
                color: "#555",
                fontSize: "14px",
                marginBottom: "20px",
              }}>
                <strong>File:</strong> {file ? file.name : "No file selected"}
              </p>
              <input
                type="file"
                className="file-input"
                id="fileInput"
                onChange={handelFile}
              />
              <input type="submit" value="Upload" className="modal-submit" onClick={handleFileUpload}/>
              </>
              :
              <Uploading>
                <SpinnerIcon />
                <span>Uploading ...</span>
              </Uploading>
              }
            </ModalBody>
          </form>
        </ModalPopup>
      </Modal>
      <Container isOpen={open}>
        <SidebarBtn>
          <button onClick = {() => setOpenModal(true)}>
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
