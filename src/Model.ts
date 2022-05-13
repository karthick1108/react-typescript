export interface Folder {
    type: "folder";
    name: string;
    level: number;
    children: Array<FileExplorer>;
  }
  
export interface File {
    type: "file";
    name: string;
    level: number;
    content: string;
  }
  
  export type FileExplorer = Folder | File;
  
  export type FILE_OR_FOLDER = "file" | "folder";