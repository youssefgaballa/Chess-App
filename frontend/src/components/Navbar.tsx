import { Link } from "react-router"

export default function NavBar() {
    return (
      <nav className="bg-gray-400 w-[100vw] h-[7vw]">

        <ul className="flex justify-end items-center w-full h-full">
          <li className="mr-auto h-full">
            <Link to="/" className="flex items-center h-full p-5 hover:bg-green-500 ">Home</Link>
          </li>
          <li className="h-full">
            <Link to="/Notes" className="flex items-center h-full p-5 hover:bg-green-500 ">Notes</Link>
          </li>
          <li className="h-full">
            <Link to="/Registration" className="flex items-center h-full p-5 hover:bg-green-500 " >Register</Link>
          </li>
          <li className="h-full">
            <Link to="/Login" className="flex items-center h-full p-5 hover:bg-green-500 " >Login</Link>
          </li>
            </ul>

        </nav>
    )
}

