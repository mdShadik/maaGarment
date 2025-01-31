import { apiEndPoints } from "@/utils/constants/appConstants";
import { makeApiCall } from "../apiRequest";

export const importUploadApi = (payload: any) => makeApiCall({
    method: "post",
    endpoint: apiEndPoints.import,
    payload,
    headers: {
      "Content-Type": "multipart/form-data",
    },
});

export const getImportUploadApi = (query?: any) => makeApiCall({
    method: "get",
    endpoint: apiEndPoints.import,
    query,
});
