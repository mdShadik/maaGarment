export const setItemToLocalstorage = (key: string, value: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, value);
  }
};

export const getItemFromLocalstorage = (key: string) => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key);
  }
  return null
};

export const removeItemFromLocalstorage = (key: string) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};

export const setToken = (token: string) => {
  setItemToLocalstorage("auth_token", token);
};
  
export const getToken = () => {
  return getItemFromLocalstorage("auth_token");
};

export const setExpiry = (expiresIn: any) => {
  const expiryDate = new Date().getTime() + expiresIn * 1000;
  setItemToLocalstorage("expiry", expiryDate.toString());
};

export const getExpiry = (): number | null => {
  const expiry = getItemFromLocalstorage("expiry");
  return expiry ? parseInt(expiry) : null;
};

export const clearToken = () => {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("expiry");
};
  