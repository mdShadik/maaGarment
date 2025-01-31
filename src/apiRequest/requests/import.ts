import { getImportUploadApi, importUploadApi } from "../apiMethods/import";

export const importUpload = async (payload: any) => {

  const formData = new FormData();
  formData.append("fileType", payload.fileType);
  formData.append("file", payload.file);
  try {
    const response = await importUploadApi(formData);
    return response;
  } catch (error: any) {
    console.error("Error Uploading File", error?.response?.data);
    return error?.response?.data;
  }
};

export const getImportUpload = async (query?: any) => {
  try {
    const response = await getImportUploadApi(query);
    return response;
  } catch (error: any) {
    console.error("Error Fetching Files", error?.response?.data);
    return error?.response?.data;
  }
};
