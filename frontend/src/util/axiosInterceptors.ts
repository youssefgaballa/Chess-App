import { getNewAccessToken as getNewAccessToken } from "../util/RefreshToken";
import { useEffect } from "react";
import { customAxios } from "./customAxios";
import { selectUser } from "../users/userSlice";
import { useSelector } from "react-redux";


export const axiosInterceptors = () => {
  const user = useSelector(selectUser);
  // Request interceptor to add the access token to headers
  useEffect(() => {
    const requestInterceptor = customAxios.interceptors.request.use(async (config: any) => {
      console.log("---requestInterceptor fulfilled called");

      //console.log("userAuth.accessToken", userAuth.accessToken);
      if (!config.headers["authorization"]) {
        //console.log("userAuth in request interceptor: ", userAuth);
        config.headers["authorization"] = `bearer ${user.accessToken ?? ""}`;
      }
      return config;
      
    }, (error) => {
      console.log("---requestInterceptor error called");
      return Promise.reject(error);
    });

    const responseInterceptor = customAxios.interceptors.response.use((response) => {
      console.log("----responseInterceptor fulfilled called");
      return response;
    },
      async (error) => {
        console.log("---responseInterceptor rejected called");
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await getNewAccessToken(user.username);
          console.log("newAccessToken from getRefreshToken: ", newAccessToken);
          prevRequest.headers["authorization"] = `bearer ${newAccessToken}`;

          return customAxios(prevRequest);
        }

        return Promise.reject(error);
      }
    );

    return () => {
      customAxios.interceptors.request.eject(requestInterceptor);
      customAxios.interceptors.response.eject(responseInterceptor);
    };
  }, [user]);
};