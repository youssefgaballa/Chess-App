import { Link, useLocation, useNavigate } from "react-router"
import {  useEffect } from "react";
import { clearUser, selectUser } from "../users/userSlice";
import { useDispatch, useSelector } from "react-redux";
//TODO: add timer that logs out user after some time of inactivity
export default function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const username = user.username;
  useEffect(() => {
    console.log("user changed: ", user);
  }, [user]);
  //console.log("user in Navbar: ", user);
 
    return (
      <nav className="bg-gray-400 w-[100vw] h-[10vh] border-b border-black">

        <ul className="flex justify-end items-center w-full h-full">
          <li className="mr-auto h-full">
            <Link to="/" state={{ from: location }} className="flex items-center h-full p-5 hover:bg-green-500 ">Home</Link>
          </li>
          {username &&
            <li className="h-full">
              <Link to="/Notes" state={{ from: location }} className="flex items-center h-full p-5 hover:bg-green-500 ">Notes</Link>
            </li>
          }
          {username &&
            <li className="h-full">
              <Link to="/Map" state={{ from: location }} className="flex items-center h-full p-5 hover:bg-green-500 " >Map</Link>
            </li>}
          {!username &&
            <li className="h-full">
              <Link to="/Registration" state={{ from: location }} className="flex items-center h-full p-5 hover:bg-green-500 " >Register</Link>
            </li>
          }
          {!username &&
            <li className="h-full">
            <Link to="/Login" state={{ from: location }} className="flex items-center h-full p-5 hover:bg-green-500 " >Login</Link>
            </li>}
          {username &&
            <li className="h-full">
              <Link to="/Profile" state={{ from: location }} className="flex items-center h-full p-5 hover:bg-green-500 " >Profile</Link>
            </li>}
          {
            user.role === 'admin' &&
            <li className="h-full">
              <Link to="/Admin" state={{ from: location }} className="flex items-center h-full p-5 hover:bg-green-500 " >Admin</Link>
            </li>
          }
          
          {username &&
            <li className="h-full">
              <button onClick={() => {
                dispatch(clearUser());
                navigate("/Login", { replace: true });
              }} className="flex items-center h-full p-5 hover:bg-green-500 " >Logout</button>
            </li>}
          
        </ul>

        </nav>
    )
}

