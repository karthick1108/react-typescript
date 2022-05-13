import { FileExplorer } from "./Model";

export const feData: Array<FileExplorer> = [
    {
      type: "folder",
      level: 1,
      name: "root",
      children: [
        {
          type: "folder",
          name: "usr",
          level: 2,
          children: [
            {
              type: "file",
              name: "readme",
              level: 3,
              content: "some dummy text",
            },
          ],
        },
        {
          type: "folder",
          name: "bin",
          level: 2,
          children: []
          },
        {
          type: "folder",
          name: "etc",
          level: 2,
          children: []
        },
        {
          type: "folder",
          name: "var",
          level: 2,
          children: []
        },
      ],
    },
    {
        type: "file",
        name: "readme",
        level: 10,
        content: "Hello text",
    }
  ];
  