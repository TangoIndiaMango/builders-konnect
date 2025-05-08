export interface UploadData {
  file: UploadFile;
  fileList: UploadFileItem[];
}

export interface UploadFile {
  uid: string;
}

export interface UploadFileItem {
  uid: string;
  lastModified: number;
  lastModifiedDate: string;
  name: string;
  size: number;
  type: string;
  percent: number;
  originFileObj: UploadFile;
}
