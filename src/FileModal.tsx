import React, { ChangeEventHandler } from "react";
import { Typography, Modal, Box } from "@mui/material";
import { File } from "./Model";

const style = {
  position: "absolute" as "absolute",
  display: "flex",
  flexDirection: "column",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #CCC",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

interface FileModalProps {
  open: boolean;
  handleFileModalClose: ChangeEventHandler;
  fileData: File;
}

const FileModal = ({
  open,
  handleFileModalClose,
  fileData,
}: FileModalProps) => {
  return (
    <Modal open={open} onClose={handleFileModalClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          {fileData.content}
        </Typography>
      </Box>
    </Modal>
  );
};

export default FileModal;
