import Events from "node:events";
import fs from "node:fs/promises";
export const events = new Events();

events.on("create", async (path) => {
  try {
    const ExistedFile = await fs.open(path, "r");
    ExistedFile.close();
    console.log(`this file ${path} is already exist`);
  } catch (error) {
    const handler = await fs.open(path, "w");
    handler.close();
  }
});
