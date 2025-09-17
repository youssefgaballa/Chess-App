import { useContext, useEffect } from "react";
//import { getRefreshToken } from "../util/getRefreshToken";
import AuthContext, { useAuth, type AuthContextType } from "../state/AuthorizationContext";
import { getRefreshToken } from "../util/RefreshToken";

export function Home() {
  // TODO: Add routing to home page


  // const handleRefreshToken = async () => {
  //    //const userContext = useContext(AuthContext);
  //   //console.log(useContext(AuthContext));
  //   //  //const username = userContext?.userAuth.username;
  //   //  const username = "root";
  //   // const response = await axios.post('http://localhost:5000/refresh', { username: username },
  //   //   {
  //   //     headers: { 'Content-Type': 'application/json' },
  //   //     withCredentials: true
  //   //   });
  //   // return response.data.refreshToken;
  // };
  const userAuth = useAuth()?.userAuth;
  (async () => {
    console.log("refresh token", await getRefreshToken(userAuth!));
  })();
  


  return (
    <>
      <div>
        <header className="text-center">
          Home page!
        </header>
        
      </div>
    </>
  )
}

