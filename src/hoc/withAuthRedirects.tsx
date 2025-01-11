import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store";
import { pageEndPoints } from "@/utils/constants/appConstants";
import { getToken } from "@/utils/localstorage";

const withAuthRedirect = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  redirectPath: string = pageEndPoints.dashboard 
) => {
  const ComponentWithAuthRedirect: React.FC<P> = (props) => {
    const isAuthenticated  = getToken();
    const isAuth = Boolean(isAuthenticated)
    const router = useRouter();

    useEffect(() => {
      if (isAuth) {
        router.push(redirectPath);
      }
    }, [isAuthenticated, redirectPath, router]);

    return !isAuth ? <WrappedComponent {...props} /> : null;
  };

  return ComponentWithAuthRedirect;
};

export default withAuthRedirect;
