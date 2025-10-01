import { getNewAccessToken as getNewAccessToken } from "../util/RefreshToken";
import { useEffect } from "react";
import { customAxios } from "./customAxios";
import { clearUser, selectUser } from "../users/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router"


export const axiosInterceptors = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Request interceptor to add the access token to headers
  useEffect(() => {
    const requestInterceptor = customAxios.interceptors.request.use(async (config) => {
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
          const newAccessToken = await getNewAccessToken(user.username).catch((err) => {
            console.log("err from getNewAccessToken in axiosInterceptors: ", err);
            dispatch(clearUser());
            navigate("/Login");
            return Promise.reject(error);
          });
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