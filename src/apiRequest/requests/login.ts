import { setExpiry, setToken } from "@/utils/localstorage";
import { login } from "../apiMethods/login";

export const loginApi = async (values: { loginName: string; password: string }) => {
  const response = await login(values)
  if (response && response?.data?.token) {
      setToken(response?.data?.token);
      const expiry = new Date(response?.data?.expiresIn)
      setExpiry(expiry);
    }
    return response.data;
}

export const loginUser = async (loginName: string, password: string) => {
  try {
    const response = await loginApi({ loginName, password });
    return response
  } catch (error: any) {
    console.error("Login failed", error?.response?.data);
    return error?.response?.data;
  }
};