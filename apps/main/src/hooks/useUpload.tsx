import { useUploadData } from "./useApis";
import { UploadData } from "../types/uploadfile";

export interface UploadedResInterface {
  title: string;
  size: number;
  url: string;
  ext: string;
  retrieval_id: string;
}

export const useUploadFileMedia = () => {
  const uploadMedia = useUploadData('shared/media/upload');

  const handleFileUpload = async (file: any): Promise<UploadedResInterface> => {
    const formData = new FormData();
    formData.append('media[]', file);
    const uploadRes = await uploadMedia.mutateAsync(formData);
    return uploadRes;
  }
  return { handleFileUpload, isUploading: uploadMedia.isPending };
}