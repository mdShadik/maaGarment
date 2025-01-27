import { apiEndPoints } from "@/utils/constants/appConstants";
import { makeApiCall } from "../apiRequest";

export const importUploadApi = (payload: any) => makeApiCall({
    method: "post",
    endpoint: apiEndPoints.import,
    payload,
});

export const getImportUploadApi = (query?: any) => makeApiCall({
    method: "get",
    endpoint: apiEndPoints.import,
    query,
});
