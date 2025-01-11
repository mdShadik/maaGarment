import axios from "axios";
import { store } from "@/store";
import { clearToken, getExpiry, getToken, setExpiry, setToken } from "@/utils/localstorage";
import { apiEndPoints, pageEndPoints } from "@/utils/constants/appConstants";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { clearAuthState } from "@/store/authSlice";
import { login } from "./apiMethods/login";

export const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
    (config) => {
      const token = store.getState().auth.token || getToken();
      const expiry = getExpiry();
      const currentTime = new Date().getTime();
    
      if (expiry && currentTime > expiry) {
        clearToken();
        store.dispatch(clearAuthState());
        toast.error("Token expired. User logged out.");
        window.location.reload(); // Reload page to reset app state
        return Promise.reject("Token expired. User logged out.");
      }
  
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
  
      return config;
    },
    (error) => {
      toast.error("Token expired. User logged out.");
      return Promise.reject(error);
    }
  );
  
  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        clearToken();
        store.dispatch(clearAuthState());
        toast.error("Unauthorized access. User logged out.");
        window.location.reload();
      }
      return Promise.reject(error);
    }
  );

  export const makeApiCall = async ({
    method,
    endpoint,
    query = {},
    payload = {},
  }: {
    method: "get" | "post" | "put" | "delete";
    endpoint: string;
    query?: any;
    payload?: any;
  }) => {
    try {
      let response;
  
      if (method === "get") {
        response = await api.get(endpoint, { params: query });
      } else if (method === "post" || method === "put" || method === "delete") {
        response = await api[method](endpoint, payload);
      }
  
      return response;
    } catch (error: any) {
      console.error("Error Fetch", error?.response?.data);
      return error?.response?.data;
    }
  };

