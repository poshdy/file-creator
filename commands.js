const CREATE_FILE = "create a file";
const RENAME_FILE = "rename the file";
const DELETE_FILE = "delete a file";
const ADD_TO_FILE = "add to the file";

export const GetFilePath = (command) => {
  return command.substring(CREATE_FILE.length + 1);
};

export { ADD_TO_FILE, CREATE_FILE, DELETE_FILE, RENAME_FILE };
