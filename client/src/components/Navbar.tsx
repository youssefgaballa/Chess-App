import { Link } from "react-router"

export default function NavBar() {
    return (
        <nav>
            <Link to = "/" className = "">Home</Link>
            <ul>
                <li>
                    <Link to = "/Notes" className = "">Notes</Link>
                </li>
                <li>
                    <Link to = "/SampleComponent">Sample Component</Link>
                </li>
            </ul>
        </nav>
    )
}

