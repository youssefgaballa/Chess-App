import { Link, useLocation, useNavigate } from "react-router"
import HomeIcon from '@mui/icons-material/Home';
import ChatIcon from '@mui/icons-material/Chat';
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
      <nav className="bg-white w-[100vw] h-[10vh] border-b border-black">

        <ul className="flex justify-end items-center w-full h-full">
          <li className="mr-auto h-full">
            <Link to="/" state={{ from: location }} className="flex items-center h-full p-5 hover:bg-green-500 rounded-lg"><HomeIcon />Home</Link>
          </li>
          <li className="h-full">
            <Link to="/Chat" state={{ from: location }} className="flex items-center h-full p-5 hover:bg-green-500 rounded-lg"><ChatIcon />Chat</Link>
          </li>
          <li className="h-full">
            <Link to="/Chess" state={{ from: location }} className="flex items-center h-full p-5 hover:bg-green-500 rounded-lg">Chess</Link>
          </li>
          {username &&
            <li className="h-full">
              <Link to="/Notes" state={{ from: location }} className="flex items-center h-full p-5 hover:bg-green-500 rounded-lg">Notes</Link>
            </li>
          }
          {username &&
            <li className="h-full">
              <Link to="/Map" state={{ from: location }} className="flex items-center h-full p-5 hover:bg-green-500 rounded-lg">Map</Link>
            </li>}
          {!username &&
            <li className="h-full">
              <Link to="/Registration" state={{ from: location }} className="flex items-center h-full p-5 hover:bg-green-500 rounded-lg" >Register</Link>
            </li>
          }
          {!username &&
            <li className="h-full">
            <Link to="/Login" state={{ from: location }} className="flex items-center h-full p-5 hover:bg-green-500 rounded-lg" >Login</Link>
            </li>}
          {username &&
            <li className="h-full">
              <Link to="/Profile" state={{ from: location }} className="flex items-center h-full p-5 hover:bg-green-500 rounded-lg" >Profile</Link>
            </li>}
          {
            user.role === 'admin' &&
            <li className="h-full">
              <Link to="/Admin" state={{ from: location }} className="flex items-center h-full p-5 hover:bg-green-500 rounded-lg" >Admin</Link>
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

