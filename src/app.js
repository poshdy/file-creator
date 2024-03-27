import * as fs from "node:fs/promises";
import { CREATE_FILE } from "../command.js";
import { events } from "./file-events.js";

(async () => {
  const fileHandler = await fs.open("./file-handler.txt", "r");
  const watcher = fs.watch("./file-handler.txt");

  fileHandler.on("change", async () => {
    const stats = await fileHandler.stat();
    const buffer = Buffer.alloc(stats.size);
    const length = buffer.byteLength;
    await fileHandler.read(buffer, 0, length, 0);
    const command = buffer.toString();
    if (command.includes(CREATE_FILE)) {
      const path = command.substring(CREATE_FILE.length + 1);
      events.emit("create", path);
    }
  });

  for await (const event of watcher) {
    if (event.eventType == "change") {
      fileHandler.emit("change");
    }
  }
})();
