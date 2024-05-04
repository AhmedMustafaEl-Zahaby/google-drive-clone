import React, { useEffect, useState, useContext } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ListIcon from "@mui/icons-material/List";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import {
  DataContainer,
  DataHeader,
  DataGrid,
  DataFile,
  DataListRow,
} from "./Components";
import { db } from "../../firebase";
import { DriveContext } from "../../Context/DriveContext";

function Data() {
  const [files, setFiles] = useState([]);
  const { setTotalStorage } = useContext(DriveContext);
  useEffect(() => {
    db.collection("myFiles").onSnapshot((snapshot) => {
      setFiles(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          item: doc.data(),
        }))
      );
      setTotalStorage(
        snapshot.docs.reduce(
          (total, doc) => total + doc.data().size / 1024 / 1024 / 1024,
          0
        )
      );
    });
  }, []);

  const changeBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  return (
    <DataContainer>
      <DataHeader>
        <div className="headerleft">
          <p>My Drive</p>
          <ArrowDropDownIcon />
        </div>
        <div className="headerright">
          <ListIcon />
          <InfoOutlinedIcon />
        </div>
      </DataHeader>
      <div>
        <DataGrid>
          {files.map(({ id, item }) => (
            <DataFile key={id} onClick={() => window.open(`${item.fileUrl}`)}>
              <InsertDriveFileIcon />
              <p>{item.caption}</p>
            </DataFile>
          ))}
        </DataGrid>
        <div>
          <DataListRow>
            <p
              style={{
                width: "50%",
              }}
            >
              <b>
                Name <ArrowDownwardIcon />
              </b>
            </p>
            <p
              style={{
                width: "20%",
              }}
            >
              <b>Owner</b>
            </p>
            <p
              style={{
                width: "20%",
              }}
            >
              <b>Last Modified</b>
            </p>
            <p
              style={{
                width: "10%",
              }}
            >
              <b>File Size</b>
            </p>
          </DataListRow>
          {files.map(({ id, item }) => (
            <DataListRow key={item.id}>
              <a
                href={item.fileUrl}
                target="_blank"
                style={{
                  color: "black",
                  width: "50%",
                }}
              >
                <p
                  style={{
                    paddingRight: "20px",
                  }}
                >
                  <InsertDriveFileIcon /> {item.caption}
                </p>
              </a>
              <p
                style={{
                  width: "20%",
                }}
              >
                Owner
              </p>
              <p
                style={{
                  width: "20%",
                }}
              >
                {new Date(item.timestamp?.seconds * 1000).toUTCString()}
              </p>
              <p
                style={{
                  width: "10%",
                }}
              >
                {changeBytes(item.size)}
              </p>
            </DataListRow>
          ))}
        </div>
      </div>
    </DataContainer>
  );
}

export default Data;
