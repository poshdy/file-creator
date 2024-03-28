import Events from "events";
import * as fs from "fs/promises";
export const events = new Events();

events.on("create", async (path) => {
  try {
    const existingFileHandle = await fs.open(path, "r");
    existingFileHandle.close();
    return console.log(`The file ${path} already exists.`);
  } catch (e) {
    const newFileHandle = await fs.open(path, "w");
    console.log("A new file was successfully created.");
    newFileHandle.close();
  }
});
events.on("delete", async (path) => {
  try {
    await fs.rm(path, { force: true });
    console.log(`The file ${path} deleted`);
  } catch (e) {
    console.log(`error ${e.message}`);
  }
});
events.on("rename", async (oldPath, newPath) => {
  try {
    await fs.rename(oldPath, newPath);
    console.log(`The file ${oldPath} renamed to ${newPath}`);
  } catch (e) {
    console.log(`error ${e.message}`);
  }
});
events.on("write", async (path, content) => {
  try {
    const file = await fs.open(path, "w");
    await file.write(content);
    console.log(`writed to file`);
    await file.close();
  } catch (e) {
    console.log(`error ${e.message}`);
  }
});
