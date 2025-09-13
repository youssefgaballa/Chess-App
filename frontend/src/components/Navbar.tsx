import { Link } from "react-router"

export default function NavBar() {
    return (
        <nav className="bg-gray-400 w-full h-[5%]">

            <ul className="flex justify-end items-center w-full h-full">
                <li className="mr-auto">
                    <Link to="/" className="flex items-center h-full p-5 hover:bg-green-500 ">Home</Link>
                </li>
                <li className="">
            <Link to="/Notes" className="flex items-center h-full p-5 hover:bg-green-500 ">Notes</Link>
                </li>
                <li className="">
            <Link to="/SampleComponent" className="flex items-center h-full p-5 hover:bg-green-500 " >Sample Component</Link>
                </li>
            </ul>

        </nav>
    )
}

