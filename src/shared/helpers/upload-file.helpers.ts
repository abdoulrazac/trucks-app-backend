import * as fs from 'fs';
import * as util from 'util';

const writeFile = util.promisify(fs.writeFile);

export const creteUploadFile = async (path : string, fileName: string, fileBuffer: Buffer) => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, {recursive: true});
  }
  await writeFile(path + '/' + fileName, fileBuffer);
  return path + '/' + fileName;
};

export const readUploadFile = async (path : string) => {
  if (fs.existsSync(path)) {
    return fs.readFileSync(path);
  }
  return null
};
export const removeUploadFile = async (path : string) => {
  if (fs.existsSync(path)) {
    fs.rmSync(path);
  }
};