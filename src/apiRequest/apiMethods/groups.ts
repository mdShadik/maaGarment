import { apiEndPoints } from "@/utils/constants/appConstants";
import { makeApiCall } from "../apiRequest";

export const addGroup = (payload: any) => makeApiCall({
    method: "post",
    endpoint: apiEndPoints.group,
    payload,
});

export const getAllGroup = (query?: any) => makeApiCall({
    method: "get",
    endpoint: apiEndPoints.group,
    query,
});

export const getGroupbyIdApi = (id: any) => makeApiCall({
    method: "get",
    endpoint: `${apiEndPoints.group}/${id}`,
});