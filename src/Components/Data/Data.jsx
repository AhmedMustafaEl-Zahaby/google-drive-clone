import React, { useEffect, useState, useContext } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ListIcon from "@mui/icons-material/List";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Pagination, PaginationItem, Stack } from "@mui/material";
import {
  DataContainer,
  DataHeader,
  DataGrid,
  DataFile,
  DataListRow,
  SpinnerWrapper,
  Spinner,
} from "./Components";
import { db } from "../../firebase";
import { DriveContext } from "../../Context/DriveContext";

function Data() {
  const { user, searchName } = useContext(DriveContext);
  const userId = user?.uid;
  const [files, setFiles] = useState([]);
  const { setTotalStorage } = useContext(DriveContext);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false); // State for search loading
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Change this value to adjust items per page

  useEffect(() => {
    let query = db?.collection("users")?.doc(userId)?.collection("myFiles");

    if (searchName) {
      setSearchLoading(true); // Set loading to true during search
      query = query
        ?.where("caption", ">=", searchName)
        ?.where("caption", "<=", searchName + "\uf8ff");
    } else {
      setSearchLoading(false); // Set loading to false when not searching
    }

    const unsubscribe = query?.onSnapshot((snapshot) => {
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
      setLoading(false);
      setSearchLoading(false); // Set search loading to false after search is done
    });

    return () => unsubscribe();
  }, [searchName]);

  const changeBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  // Logic to get current items based on pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = files.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <>
      {(loading || searchLoading) && ( // Check both loading states
        <SpinnerWrapper>
          <Spinner />
        </SpinnerWrapper>
      )}
      {!loading &&
        !searchLoading && ( // Render only when not loading or searching
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
                {currentItems.map(({ id, item }) => (
                  <DataFile
                    key={id}
                    onClick={() => window.open(`${item.fileUrl}`)}
                  >
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
                      width: "15%",
                    }}
                  >
                    <b>Owner</b>
                  </p>
                  <p
                    style={{
                      width: "30%",
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
                {currentItems.map(({ id, item }) => (
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
                        width: "15%",
                      }}
                    >
                      Owner
                    </p>
                    <p
                      style={{
                        width: "30%",
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
            {files.length !== 0 ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "20px auto",
                }}
              >
                <Stack spacing={2}>
                  <Pagination
                    count={Math.ceil(files.length / itemsPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                    renderItem={(item) => (
                      <PaginationItem
                        slots={{
                          previous: ArrowBackIcon,
                          next: ArrowForwardIcon,
                        }}
                        {...item}
                      />
                    )}
                  />
                </Stack>
              </div>
            ) : null}
          </DataContainer>
        )}
    </>
  );
}

export default Data;
