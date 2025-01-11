import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/utils/localstorage";
import { pageEndPoints } from "@/utils/constants/appConstants";

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  redirectPath: string = pageEndPoints.login
) => {
  const ComponentWithAuth: React.FC<P> = (props) => {
    const  isAuthenticated  = getToken()
    const isAuth = Boolean(isAuthenticated)
    const router = useRouter();

    useEffect(() => {
      if (!isAuth) {
        router.push(redirectPath);
      }
    }, [isAuthenticated, redirectPath, router]);

    return isAuth ? <WrappedComponent {...props} /> : null;
  };

  return ComponentWithAuth;
};

export default withAuth;
