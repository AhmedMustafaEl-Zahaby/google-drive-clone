import React, { useContext, useState } from "react";
import MobileScreenShareIcon from "@mui/icons-material/MobileScreenShare";
import DevicesIcon from "@mui/icons-material/Devices";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import QueryBuilderOutlinedIcon from "@mui/icons-material/QueryBuilderOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddIcon from "@mui/icons-material/Add";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import CloseIcon from "@mui/icons-material/Close";
import firebase from "firebase/compat/app";
import { db, storage } from "../../firebase";
import { DriveContext } from "../../Context/DriveContext";
import {
  Container,
  SidebarBtn,
  Options,
  Option,
  Overlay,
  Modal,
  ModalPopup,
  ModalHeader,
  ModalBody,
  Uploading,
  SpinnerIcon,
  ErrorDiv,
} from "./Components";

function Sidebar() {
  const { open, toggleSidebar, resetSidebar, totalStorage } =
    useContext(DriveContext);
  const [openModal, setOpenModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);
  const [error, setError] = useState(false);

  const handleToggleSidebar = () => {
    toggleSidebar();
  };

  const handelFile = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  const handleModalClose = () => {
    setOpenModal(false);
    setFile(null);
    setError(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  const handleFileUpload = (e) => {
    if (file === null) {
      setError(true);
      return;
    }
    e.preventDefault();
    setUploading(true);
    storage
      .ref(`files/${file.name}`)
      .put(file)
      .then((snapshot) => {
        console.log(snapshot);
        storage
          .ref("files")
          .child(file.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("myFiles").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: file.name,
              fileUrl: url,
              size: snapshot._delegate.bytesTransferred,
            });
            setUploading(false);
            setOpenModal(false);
            setFile(null);
            resetSidebar();
            setError(false);
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
              {!uploading ? (
                <>
                  {error && <ErrorDiv error="Please Upload file first" />}
                  <div
                    className="drop-area"
                    onDragOver={handleDragOver}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById("fileInput").click()}
                  >
                    <CloudQueueIcon
                      style={{ fontSize: "50px", color: "#333" }}
                    />
                    <p>Drop files here or click to upload</p>
                  </div>
                  <p
                    style={{
                      textAlign: "center",
                      color: "#555",
                      fontSize: "14px",
                      marginBottom: "20px",
                    }}
                  >
                    <strong>File:</strong>{" "}
                    {file ? file.name : "No file selected"}
                  </p>
                  <input
                    type="file"
                    className="file-input"
                    id="fileInput"
                    onChange={handelFile}
                  />
                  <input
                    type="submit"
                    value="Upload"
                    className="modal-submit"
                    onClick={handleFileUpload}
                  />
                </>
              ) : (
                <Uploading>
                  <SpinnerIcon />
                  <span>Uploading ...</span>
                </Uploading>
              )}
            </ModalBody>
          </form>
        </ModalPopup>
      </Modal>
      <Container isOpen={open}>
        <SidebarBtn>
          <button onClick={() => setOpenModal(true)}>
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
            <progress size="tiny" value={(totalStorage / 30) * 100} max="100" />
            <span
              style={{
                fontSize: "13px",
                color: "rgb(78, 78, 78)",
              }}
            >
              {totalStorage.toFixed(4)} GB used of 30 GB
            </span>
          </div>
        </Options>
      </Container>
      <Overlay isOpen={open} onClick={handleToggleSidebar} />
    </>
  );
}

export default Sidebar;
