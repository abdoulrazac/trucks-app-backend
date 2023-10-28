export function bufferToFile(buffer: Buffer, filename: string) {
  const mineType = getMime(filename);
  const uint8Array = new Uint8Array(buffer);
  const blob = new Blob([uint8Array], { type: mineType });
  return URL.createObjectURL(blob);
}

/* Get filename mime type
 * @param {filename} string
 * @returns {string}
 */
export function getMime(filename: string): string {
  const nameSplit = filename.split(".");
  const extension = nameSplit[nameSplit.length - 1];

  switch (extension) {
    case "pdf":
      return "application/pdf";
    case "png":
      return "image/png";
    case "jpg":
      return "image/jpg";
    case "jpeg":
      return "image/jpeg";
    case "doc":
      return "application/msword";
    case "docx":
      return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    case "xls":
      return "application/vnd.ms-excel";
    case "xlsx":
      return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    case "ppt":
      return "application/vnd.ms-powerpoint";
    case "pptx":
      return "application/vnd.openxmlformats-officedocument.presentationml.presentation";
    case "txt":
      return "text/plain";
    case "csv":
      return "text/csv";
    case "mp3":
      return "audio/mpeg";
    case "mp4":
      return "video/mp4";
    default:
      return "application/octet-stream";
  }
}
