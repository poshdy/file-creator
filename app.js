import * as fs from "node:fs/promises";
// class FileCreator {
//   async Read(path) {
//     const data = await fs.readFile(path, { encoding: "utf-8" });
//     return data;
//   }

//   async Create(path, data) {}
// }

// const creator = new FileCreator();

// const data = await creator.Read("./messi.txt");
// console.log(data);
(async () => {
  const watcher = fs.watch("./");

  for await (const event of watcher) {
    console.log(event);
  }
})();
