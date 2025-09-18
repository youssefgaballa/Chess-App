import { Link, useLocation } from "react-router"
import { useContext, useEffect } from "react";
import AuthContext, { useAuth } from "../state/AuthorizationContext";

export default function NavBar() {
  const location = useLocation();
  const { userAuth, setUserAuth } = useAuth();
  useEffect(() => {
    console.log("userAuth changed: ", userAuth);
  }, [userAuth]);
 
    return (
      <nav className="bg-gray-400 w-[100vw] h-[10vh] border-b border-black">

        <ul className="flex justify-end items-center w-full h-full">
          <li className="mr-auto h-full">
            <Link to="/" state={{ from: location }} className="flex items-center h-full p-5 hover:bg-green-500 ">Home</Link>
          </li>
          {userAuth.username &&
            <li className="h-full">
              <Link to="/Notes" state={{ from: location }} className="flex items-center h-full p-5 hover:bg-green-500 ">Notes</Link>
            </li>
          }
          {userAuth.username &&
            <li className="h-full">
              <Link to="/Map" state={{ from: location }} className="flex items-center h-full p-5 hover:bg-green-500 " >Map</Link>
            </li>}
          {!userAuth.username &&
            <li className="h-full">
              <Link to="/Registration" state={{ from: location }} className="flex items-center h-full p-5 hover:bg-green-500 " >Register</Link>
            </li>
          }
          {!userAuth.username &&
            <li className="h-full">
            <Link to="/Login" state={{ from: location }} className="flex items-center h-full p-5 hover:bg-green-500 " >Login</Link>
            </li>}
          
          {userAuth.username &&
            <li className="h-full">
            <button onClick={() => setUserAuth({username:"", role:"", accessToken:""})} className="flex items-center h-full p-5 hover:bg-green-500 " >Logout</button>
            </li>}
          
        </ul>

        </nav>
    )
}

