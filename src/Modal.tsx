import React, { ChangeEventHandler, MouseEventHandler } from "react";
import {
  Typography,
  TextField,
  Button,
  Modal,
  Box,
  TextareaAutosize,
} from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  display: "flex",
  flexDirection: "column",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "background.paper",
  border: "2px solid #CCC",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

interface FileExplorerProps {
  open: boolean;
  type: string;
  handleClose: ChangeEventHandler;
  handleChangeText: ChangeEventHandler;
  handleDescriptionText: ChangeEventHandler;
  handleSave: MouseEventHandler;
}

const CreateModal = ({
  open,
  type,
  handleClose,
  handleChangeText,
  handleDescriptionText,
  handleSave,
}: FileExplorerProps) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography
          style={{ marginBottom: "24px" }}
          variant="h6"
          component="h2"
        >
          {type === "file" ? "New File" : "New Folder"}
        </Typography>
        <TextField
          style={{ marginBottom: "16px" }}
          size="small"
          label={type === "file" ? "File Name" : "Folder Name"}
          variant="outlined"
          onChange={handleChangeText}
          // TODO validation
        />
        {type === "file" ? (
          <TextareaAutosize
            style={{ marginBottom: "16px" }}
            minRows={10}
            placeholder="Enter file content"
            onChange={handleDescriptionText}
          />
        ) : null}
        <Button variant="contained" onClick={handleSave}>
          Create
        </Button>
      </Box>
    </Modal>
  );
};

export default CreateModal;
