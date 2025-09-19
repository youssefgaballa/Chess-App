import { useEffect } from "react";
import {  setUser, type UserState } from "../users/userSlice";
import { useDispatch } from "react-redux";
import { getNewAccessToken } from "./RefreshToken";

// TODO: put this fct in hood directory and rename file to usePersistLogin.ts
// Make sure that on every page uses this hook, the query is only enabled
// when userAuth.accessToken is available in the context.
// Do this by passing the context to the query and enable it conditionally.
export const usePersistLogin = () => {
  const dispatch = useDispatch();


  //TODO: dont put accesstoken in localstorage 
  // upon refresh, get new access token using refresh token
  useEffect(() => {
    //console.log("----Home component mounted");
    
    const loadHandler = async () => {
      // console.log("---load event triggered");
      const persistedUser: UserState = JSON.parse(window.localStorage.getItem('user')!);
      // console.log("persistedUser from localStorage: ", persistedUser);
      const accessToken = await getNewAccessToken(persistedUser.username!);
      // console.log("accessToken from getNewAccessToken: ", accessToken);
      dispatch(setUser({...persistedUser, accessToken}));

    }

    window.addEventListener('load', loadHandler);
    return () => {
    //  console.log("---Home component unmounted");
      window.removeEventListener('load', loadHandler);
    };
  }, []);
}