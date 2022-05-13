import React from "react";
import {
  Typography,
  TextField,
  Stack,
  Button,
  Breadcrumbs,
  Link,
} from "@mui/material";
import CreateModal from "./Modal";
import FileModal from "./FileModal";
import FileExplorerTable from "./FileExplorerTable";

import { File, FileExplorer, FILE_OR_FOLDER, Folder } from "./Model";

const Home: React.FC = () => {
  const [searchText, setSearchText] = React.useState<string>("");

  // Open Create New Modal
  const [open, setOpen] = React.useState(false);
  const [modalType, setModalType] = React.useState<FILE_OR_FOLDER>("file");
  const [name, setName] = React.useState<string>("");
  const [content, setContent] = React.useState<string>("");

  const [level, setLevel] = React.useState(1);
  const [data, setData] = React.useState<Array<FileExplorer>>([]);
  const [currentData, setCurrentData] = React.useState<Array<FileExplorer>>([
    ...data,
  ]);
  const [path, setPath] = React.useState<Array<string>>([]);

  // Open File content Modal
  const [openFileModal, setOpenFileModal] = React.useState(false);
  const [fileData, setFileData] = React.useState<File>();

  const handleCreateModalOpen = (type: FILE_OR_FOLDER) => {
    setOpen(true);
    setModalType(type);
  };
  const handleCreateModalClose = () => setOpen(false);
  const handleFileModalClose = () => setOpenFileModal(false);

  const handleSave = () => {
    let newData;
    if (modalType === "file")
      newData = { type: "file" as "file", name, content, level };
    else newData = { type: "folder" as "folder", name, level, children: [] };

    console.log("data >>>>>>", data);
    if (data.length === 0) {
      setData([newData]);
    }
    let d = getFEDataAtPath(data, path);
    d.children = [...currentData, newData];
    setCurrentData([...currentData, newData]);
    setData([...data]);
    handleCreateModalClose();
  };

  const getFEDataAtPath = (d: FileExplorer[], p: string[]) => {
    let tempData: any = [...d];
    p.forEach((p) => {
      if (Array.isArray(tempData))
        tempData = tempData.find((element) => element.name === p) as Folder;
      else {
        tempData = tempData.children.find(
          (element: any) => element.name === p
        ) as Folder;
      }
    });
    return tempData;
  };

  const handleChangeText = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setName(evt.target.value);
  };

  const handleDescriptionText = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setContent(evt.target.value);
  };

  const handleSearchText = (
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchText(evt.target.value);
  };

  const handleDoubleClick = (rowData: FileExplorer) => {
    const { type } = rowData;

    if (type === "file") {
      setOpenFileModal(true);
      setFileData(rowData as File);
    } else {
      rowData.children && setCurrentData([...rowData.children]);
      setPath([...path, rowData.name]);
    }
  };

  const saveLocalData = () => {
    localStorage.setItem("data", JSON.stringify(data));
  };

  const getLocalData = () => {
    if (localStorage.getItem("data") === null) {
      localStorage.setItem("data", JSON.stringify([]));
    } else {
      let dataLocal = JSON.parse(localStorage.getItem("data") || "{}");
      setData(dataLocal);
    }
  };

  const filteredData = React.useMemo(() => {
    if (!searchText) {
      return currentData;
    }

    return currentData.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText, currentData]);

  const totalCount = () => {
    // Try with reduce and return array
    const fileCount = filteredData.filter(
      (element) => element.type === "file"
    ).length;
    const folderCount = filteredData.filter(
      (element) => element.type === "folder"
    ).length;

    return `${fileCount} file(s) and ${folderCount} folder(s)`;
  };

  const navigateToFile = (selectedPath: string, index = 0) => {
    if (selectedPath === "home") {
      setCurrentData([...data]);
    } else {
      let tp = path.slice(0, index + 1);
      setPath([...tp]);
      let temp = [...data];
      tp.forEach((p) => {
        temp = (temp.find((t) => t.name === p) as Folder).children;
      });
      setCurrentData([...temp]);
    }
  };

  React.useEffect(() => {
    saveLocalData();
  }, [data]);

  // React.useEffect(() => {
  //   getLocalData();
  // }, []);

  return (
    <div>
      <Typography style={{ textAlign: "center", marginBottom: "16px" }}>
        Basic File Explorer
      </Typography>
      <TextField
        style={{ marginBottom: "32px" }}
        id="outlined-basic"
        label="Search ..."
        variant="outlined"
        fullWidth
        onChange={(evt) => handleSearchText(evt)}
      />
      <Stack style={{ marginBottom: "16px" }} spacing={2} direction="row">
        <Button
          variant="outlined"
          onClick={() => handleCreateModalOpen("folder")}
        >
          Create New Folder
        </Button>

        <Button
          variant="outlined"
          onClick={() => handleCreateModalOpen("file")}
        >
          Create New File
        </Button>
      </Stack>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        {[
          <Link key="Home" onClick={() => navigateToFile("home")}>
            Home
          </Link>,
          ...path.map((p, index) => {
            return (
              <Link key={index} onClick={() => navigateToFile(p, index)}>
                {p}
              </Link>
            );
          }),
        ]}
      </Breadcrumbs>
      <FileExplorerTable
        explorerData={filteredData}
        handleDoubleClick={handleDoubleClick}
      />
      <div>
        <Typography style={{ display: "flex", justifyContent: "right" }}>
          Total: {totalCount()}
        </Typography>
      </div>
      <CreateModal
        open={open}
        type={modalType}
        handleClose={handleCreateModalClose}
        handleChangeText={handleChangeText}
        handleSave={handleSave}
        handleDescriptionText={handleDescriptionText}
      />
      {fileData ? (
        <FileModal
          open={openFileModal}
          handleFileModalClose={handleFileModalClose}
          fileData={fileData}
        />
      ) : null}
    </div>
  );
};

export default Home;
