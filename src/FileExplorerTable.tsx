import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

interface DataProps {
  explorerData: any;
  handleDoubleClick: Function;
}

const FileExplorerTable = ({ explorerData, handleDoubleClick }: DataProps) => {
  return (
    <Table style={{ marginBottom: "48px" }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Type</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {explorerData.map((row: any) => (
          <TableRow key={row.name} onDoubleClick={() => handleDoubleClick(row)}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.type}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default FileExplorerTable;
