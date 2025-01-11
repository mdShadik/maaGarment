"use client"
import { Provider } from "react-redux";
import { store } from "./index";
import { persistStore } from "redux-persist";
import { useEffect, useState } from "react";

const persistor = persistStore(store);

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    persistor.persist();
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return <div>Loading...</div>;
  }

  return <Provider store={store}>{children}</Provider>;
}
