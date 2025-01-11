import { clearToken, getExpiry } from "@/utils/localstorage";

export const checkTokenExpiry = () => {
  const expiry = getExpiry();
  const currentTime = new Date().getTime();

  if (expiry && currentTime > expiry) {
    clearToken();
  }
};
