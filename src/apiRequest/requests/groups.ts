import { addGroup as addGroupApi, getAllGroup as getAllGroupApi } from "../apiMethods/groups";

export const addGroups = async (name: string, shortName: string) => {
    const payload = {
        name,
        shortName
    }
    try {
      const response = await addGroupApi(payload);
      return response
    } catch (error: any) {
      console.error("Error Adding Group", error?.response?.data);
      return error?.response?.data;
    }
  };

  export const getAllGroups = async (query?: any) => {
    try {
      const response = await getAllGroupApi(query);
      return response
    } catch (error: any) {
      console.error("Error Fetching Group", error?.response?.data);
      return error?.response?.data;
    }
  };