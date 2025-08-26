import { Link } from "react-router"

export default function NavBar() {
    return (
        <nav className= "flex justify-center items-stretch bg-gray-400 py-3 ">
            <Link to = "/" className = "">Home</Link>
            <ul className = "flex justify-around"> 
                <li className = "flex justify-around">
                    <Link to = "/Notes" className ="pl-1">Notes</Link>
                </li>
                <li className = "flex justify-around">
                    <Link to = "/SampleComponent" className ="pl-1">Sample Component</Link>
                </li>
            </ul>
        </nav>
    )
}

