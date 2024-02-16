import { Link } from "react-router-dom"
import Users from "./Users"

const Main = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="collapse navbar-collapse navbar-dark bg-dark" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                <Link className="nav-item nav-link" to="/login">Sign In</Link>
                <Link className="nav-item nav-link" to="/register">Sign Up</Link>
                
                </div>
            </div>
        </nav>
    )
}

export default Main