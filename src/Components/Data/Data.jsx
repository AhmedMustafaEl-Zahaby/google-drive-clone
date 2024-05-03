import React, {useEffect , useState} from 'react'
import styled from 'styled-components'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ListIcon from '@mui/icons-material/List';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import {db} from "../../firebase";

const DataContainer = styled.div`
    flex: 1 1;
    padding: 10px 0px 0px 20px;
    position: relative;

    @media (max-width:504px){
        padding: 5px;
    }
`;

const DataHeader = styled.div`
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

const DataGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-top: 30px;
    margin-bottom: 30px;

    @media (max-width: 813px){
        justify-content: space-around;
    }
`;

const DataFile = styled.div`
    text-align: center;
    border: 1px solid rgb(204 204 204 / 46%);
    margin: 10px;
    min-width: 200px;
    padding: 0px;
    padding-top: 10px;
    border-raduis: 5px;
    cursor: pointer;
    svg{
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
`

const DataListRow = styled.div`
    display:flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    p {
        display:flex;
        align-items: center;
        font-size: 13px;
        b {
            display:flex;
            align-items: center;
        }
        svg{
            font-size: 22px;
            margin: 10px;
        }
    }
`

function Data() {
  const [files, setFiles] = useState([])
    useEffect(() => {
        db.collection('myFiles').onSnapshot(snapshot => {
            setFiles(snapshot.docs.map(doc => ({
                id: doc.id,
                item: doc.data()
            })))
        })
    }, [])

  const changeBytes = (bytes , decimals = 2) => {
    if(bytes === 0) return '0 Bytes'
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes' , 'KB' , 'MB' , 'GB' , 'TB' , 'PB' , 'EB' , 'ZB' , 'YB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k , i)).toFixed(dm)) + ' ' + sizes[i]
  }
  console.log(files);
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
                {
                    files.map(({id , item}) => (
                        <DataFile key={id} onClick={() => window.open(`${item.fileUrl}`)}>
                            <InsertDriveFileIcon />
                            <p>{item.caption}</p>
                        </DataFile>
                    ))
                }
            </DataGrid>
            <div>
                <DataListRow>
                    <p><b>Name <ArrowDownwardIcon /></b></p>
                    <p><b>Owner</b></p>
                    <p><b>Last Modified</b></p>
                    <p><b>File Size</b></p>
                </DataListRow>
                {
                    files.map(({id , item}) => (
                        <DataListRow key={item.id}>
                            <a href={item.fileUrl} target='_blank'
                            style={{
                                color: 'black',
                                minWidth: '200px',
                            }}
                            >
                            <p><InsertDriveFileIcon /> {item.caption}</p>
                            </a>
                            <p>Owner</p>
                            <p>{new Date(item.timestamp?.seconds * 1000).toUTCString()}</p>
                            <p>{changeBytes(item.size)}</p>
                        </DataListRow>
                    ))
                }
            </div>
        </div>
    </DataContainer>
  )
}

export default Data