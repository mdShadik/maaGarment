"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/store";
import { setLoading } from "@/store/loaderSlice";

const PageLoader: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname(); // Current route
  const dispatch = useAppDispatch();
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    if (isNavigating) {
      dispatch(setLoading(true));
    } else {
      dispatch(setLoading(false));
    }
  }, [isNavigating, dispatch]);

  useEffect(() => {
    // Simulate navigation start
    setIsNavigating(true);

    const timer = setTimeout(() => {
      // Simulate navigation complete
      setIsNavigating(false);
    }, 300); // Adjust timing if needed for smoother transitions

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
};

export default PageLoader;
