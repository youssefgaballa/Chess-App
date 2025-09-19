import { useEffect } from "react";
import { selectUser, setUser, type UserState } from "../users/userSlice";
import { useDispatch, useSelector } from "react-redux";

// TODO: put this fct in hood directory and rename file to usePersistLogin.ts
// Make sure that on every page uses this hook, the query is only enabled
// when userAuth.accessToken is available in the context.
// Do this by passing the context to the query and enable it conditionally.
export const usePersistLogin = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  //TODO: dont put accesstoken in localstorage 
  // upon refresh, get new access token using refresh token
  useEffect(() => {
    // console.log("----Home component mounted");

    const beforeUnloadHandler = () => {
      // console.log('---beforeunload event triggered');
      window.localStorage.setItem('user', JSON.stringify(user));
      // console.log("window.localStorage.getItem('user'): ", window.localStorage.getItem('user'));
    }

    const loadHandler = () => {
      // console.log("---load event triggered");
      const persistedUser: UserState = JSON.parse(window.localStorage.getItem('user')!);
      // console.log("persistedUser from localStorage: ", persistedUser);
      dispatch(setUser(persistedUser));
      
      // console.log("userAuth after load: ", userAuth);
      // Important to remove from localstorage to prevent XSS attacks
      // not foolproof though.
      //TODO: implement better security measures
      //window.localStorage.removeItem('user');
      
    }

    window.addEventListener('beforeunload', beforeUnloadHandler);
    window.addEventListener('load', loadHandler);
    return () => {
      // console.log("---Home component unmounted");
      window.removeEventListener('beforeunload', beforeUnloadHandler);
      window.removeEventListener('load', loadHandler);
    };
  }, []);
}