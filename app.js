import * as fs from "node:fs/promises";
import {
  CREATE_FILE,
  DELETE_FILE,
  ADD_TO_FILE,
  GetFilePath,
  RENAME_FILE,
} from "./commands.js";
import { events } from "./handlers.js";

(async () => {
  const commandFileHandler = await fs.open("./creator.txt", "r");

  commandFileHandler.on("change", async () => {
    const size = (await commandFileHandler.stat()).size;
    const buff = Buffer.alloc(size);
    const length = buff.byteLength;

    await commandFileHandler.read(buff, 0, length, 0);

    const command = buff.toString("utf-8");
    if (command.includes(CREATE_FILE)) {
      const filePath = GetFilePath(command);

      events.emit("create", filePath);
    }
    if (command.includes(DELETE_FILE)) {
      const filePath = GetFilePath(command);
      events.emit("delete", filePath);
    }
    if (command.includes(RENAME_FILE)) {
      const index = command.indexOf(" to ");
      console.log(index)
      const oldPath = command.substring(RENAME_FILE.length + 1, index);
      console.log(oldPath);
      const newPath = command.substring(index + 4);
      console.log(newPath);

      events.emit("rename", oldPath, newPath);
    }
    if (command.includes(ADD_TO_FILE)) {
      const index = command.indexOf(" with content: ");
      const filePath = command.substring(ADD_TO_FILE.length + 1, index);
      // const oldPath = command.substring(RENAME_FILE.length + 1, index);
      const content = command.substring(index + 15);

      events.emit("write", filePath, content);
    }
  });

  const watcher = fs.watch("./creator.txt");
  for await (const event of watcher) {
    if (event.eventType === "change") {
      commandFileHandler.emit("change");
    }
  }
})();
