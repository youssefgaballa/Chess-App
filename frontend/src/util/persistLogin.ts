import { useEffect } from "react";
import { useAuth, type AuthContextType } from "../state/AuthorizationContext";

// TODO: put this fct in hood directory and rename file to usePersistLogin.ts
// Make sure that on every page uses this hook, the query is only enabled
// when userAuth.accessToken is available in the context.
// Do this by passing the context to the query and enable it conditionally.
export const usePersistLogin = () => {
  const { userAuth, setUserAuth } = useAuth();

  useEffect(() => {
    const beforeUnloadHandler = () => {
      //console.log('---beforeunload event triggered');
      window.localStorage.setItem('user', JSON.stringify(userAuth));
      //console.log("window.localStorage.getItem('user'): ", window.localStorage.getItem('user'));
    }
    const loadHandler = () => {
      //console.log("---load event triggered");
      const persistedUser: AuthContextType["userAuth"] = JSON.parse(window.localStorage.getItem('user')!);
      //console.log("persistedUser from localStorage: ", persistedUser);
      setUserAuth({
        username: persistedUser?.username,
        role: persistedUser?.role,
        accessToken: persistedUser?.accessToken
      });
      //console.log("userAuth after load: ", userAuth);
      // Important to remove from localstorage to prevent XSS attacks
      // not foolproof though.
      //TODO: implement better security measures
      window.localStorage.removeItem('user');
      
    }
    //console.log("----Home component mounted");
    window.addEventListener('beforeunload', beforeUnloadHandler);
    window.addEventListener('load', loadHandler);
    return () => {
      //console.log("---Home component unmounted");
      window.removeEventListener('beforeunload', beforeUnloadHandler);
      window.removeEventListener('load', loadHandler);
    };
  }, []);
}