import { addUserApi, getAllUsersApi, getUserbyIdApi } from "../apiMethods/users";

export const addUsers = async (payload: any) => {
  try {
      console.log("I am yeta")
      const response = await addUserApi(payload);
  console.log("I am here", response)

      return response
    } catch (error: any) {
      console.error("Error Adding User 23", error?.response?.data);
      return error?.response?.data;
    }
  };

  export const getAllGroups = async (query?: any) => {
    try {
      const response = await getAllUsersApi(query);
      return response
    } catch (error: any) {
      console.error("Error Fetching user", error?.response?.data);
      return error?.response?.data;
    }
  };


  export const getGroupById = async (id: any) => {
    try {
      const response = await getUserbyIdApi(id);
      return response
    } catch (error: any) {
      console.error("Error Fetching user", error?.response?.data);
      return error?.response?.data;
    }
  };