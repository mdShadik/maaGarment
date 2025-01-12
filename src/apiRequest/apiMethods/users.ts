import { apiEndPoints } from "@/utils/constants/appConstants";
import { makeApiCall } from "../apiRequest";

export const addUserApi = (payload: any) => makeApiCall({
    method: "post",
    endpoint: apiEndPoints.user,
    payload,
});

export const getAllUsersApi = (query?: any) => makeApiCall({
    method: "get",
    endpoint: apiEndPoints.user,
    query,
});

export const getUserbyIdApi = (id: any) => makeApiCall({
    method: "get",
    endpoint: `${apiEndPoints.user}/${id}`,
});