import { apiEndPoints } from "@/utils/constants/appConstants";
import { makeApiCall } from "../apiRequest";

export const login = (payload: any) => makeApiCall({
    method: "post",
    endpoint: apiEndPoints.login,
    payload,
});
