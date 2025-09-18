import axios from "axios";
import { getNewAccessToken as getNewAccessToken } from "../util/RefreshToken";
import AuthContext, { useAuth } from "../state/AuthorizationContext";
import { useContext, useEffect } from "react";
import { customAxios } from "./customAxios";


export const axiosInterceptors = () => {
  const {userAuth} = useAuth();
  // Request interceptor to add the access token to headers
  useEffect(() => {
    const requestInterscept = customAxios.interceptors.request.use(async (config: any) => {
      console.log("---request interceptor fulfilled called");

      //console.log("userAuth.accessToken", userAuth.accessToken);
      if (!config.headers["authorization"]) {
        config.headers["authorization"] = `bearer ${userAuth?.accessToken ?? ""}`;
      }
      return config;
      
    }, (error) => {
      console.log("request interceptor error called");
      return Promise.reject(error);
    });

    const responseInterscept = customAxios.interceptors.response.use((response) => {
      console.log("----response interceptor fulfilled called");
      return response;
    },
      async (error) => {
        console.log("---response interceptor rejected called");
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await getNewAccessToken(userAuth);
          console.log("newAccessToken from getRefreshToken: ", newAccessToken);
          prevRequest.headers["authorization"] = `bearer ${newAccessToken}`;

          return customAxios(prevRequest);
        }

        return Promise.reject(error);
      }
    );

    return () => {
      customAxios.interceptors.request.eject(requestInterscept);
      customAxios.interceptors.response.eject(responseInterscept);
    };
  }, [userAuth]);
};