import React from "react";
import {
  Typography,
  TextField,
  Stack,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import FileExplorerModal from "./Modal";
import FileModal from "./FileModal";

interface Folder {
  type: "folder";
  name: string;
  children: FileExplorer;
}

interface File {
  type: "file";
  name: string;
  content: string;
}

type FileExplorer = Array<Folder | File>;

type FileOrFolder = "file" | "folder";

const Home: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [modalType, setModalType] = React.useState<FileOrFolder>("file");
  const [data, setData] = React.useState<FileExplorer>([]);
  const [name, setName] = React.useState<string>("");
  const [searchText, setSearchText] = React.useState<string>("");
  const [content, setContent] = React.useState<string>("");

  const [fileModal, setFileModal] = React.useState(false);
  const [fileData, setFileData] = React.useState<FileExplorer>([]);

  const handleOpen = (type: FileOrFolder) => {
    setOpen(true);
    setModalType(type);
  };
  const handleClose = () => setOpen(false);
  const handleFileModalClose = () => setFileModal(false);

  const handleSave = () => {
    let newData;
    if (modalType === "file")
      newData = { type: "file" as "file", name, content };
    else newData = { type: "folder" as "folder", name, children: [] };
    setData([...data, newData]);
    handleClose();
  };

  const handleChangeText = (evt: any) => {
    setName(evt.target.value);
  };

  const handleDescriptionText = (evt: any) => {
    setContent(evt.target.value);
  };

  const handleSearchText = (evt: any) => {
    setSearchText(evt.target.value);
  };

  const handleDoubleClick = (rowData: any) => {
    const { type } = rowData;

    if (type === "file") {
      setFileModal(true);
      setFileData(rowData);
    }
  };

  const filteredData = React.useMemo(() => {
    if (!searchText) {
      return data;
    }

    const newData = data.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );

    return newData;
  }, [searchText, data]);

  return (
    <div>
      <Typography style={{ textAlign: "center" }}>
        {" "}
        Basic File Explorer
      </Typography>
      <TextField
        style={{ marginBottom: "48px" }}
        id="outlined-basic"
        label="Search ..."
        variant="outlined"
        fullWidth
        onChange={(evt) => handleSearchText(evt)}
      />
      <Stack spacing={2} direction="row">
        <Button variant="outlined" onClick={() => handleOpen("folder")}>
          Create New Folder
        </Button>

        <Button variant="outlined" onClick={() => handleOpen("file")}>
          Create New File
        </Button>
      </Stack>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData?.map((row) => (
            <TableRow onDoubleClick={() => handleDoubleClick(row)}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <FileExplorerModal
        open={open}
        type={modalType}
        handleClose={handleClose}
        handleChangeText={handleChangeText}
        handleSave={handleSave}
        handleDescriptionText={handleDescriptionText}
      />
      <FileModal
        fileModal={fileModal}
        handleFileModalClose={handleFileModalClose}
        fileData={fileData}
      />
    </div>
  );
};

export default Home;
