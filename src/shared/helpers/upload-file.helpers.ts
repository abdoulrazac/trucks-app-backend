import * as fs from 'fs';
import { join, sep } from 'path';
import * as util from 'util';

const writeFile = util.promisify(fs.writeFile);

export const createUploadFile = async (path : string, fileName: string, fileBuffer: Buffer) => {
  const basePath = join(process.cwd(), path);
  if (!fs.existsSync(path)) {
    fs.mkdirSync(basePath, {recursive: true});
  }
  await writeFile(join(basePath, fileName), fileBuffer);
  return join(path, fileName);
};

export const getFilePath = async (path : string) => {
  const filePath = process.cwd() + '/' + path
  return fs.existsSync(filePath)? filePath:null;
}
export const moveToTrash = async (basePath : string, filePath : string) => {
  try {
    fs.accessSync(filePath, fs.constants.W_OK | fs.constants.R_OK);
    const pathList = filePath.split(sep)
    const trashPath = join(process.cwd(), basePath, 'trash', ...pathList.slice(1, -1));
    const newFilePath = join(trashPath, ...pathList.slice(2));
    const oldPath = join(process.cwd(), filePath);

    if (!fs.existsSync(trashPath)) {
      fs.mkdirSync(trashPath, {recursive: true});
    }
    fs.renameSync(oldPath, newFilePath);
  } catch (error) {
    return
  }
};