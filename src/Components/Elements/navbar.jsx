import React from "react";
import {Link, useNavigate, useLocation} from "react-router-dom"
const Navbar = () => {
    return(
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
        <span><h3>CarSystem</h3></span>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item active">
                    
                    <a href="#" className="nav-link">
                    <i class="bi-person-circle"></i> Profile
                    </a>
                </li>
                <li className="nav-item active">
                <a href="#" className="nav-link">
                    <i class="bi-car-front-fill"></i> Your Cars
                    </a>
                </li>
                <li className="nav-item">
                    <Link to="/fuelUsage" className="nav-link"><i className="bi-fuel-pump-fill"></i> Fuel Cost</Link>
                </li>
            </ul>
        </div>
        </div>
    </nav>

    
    )
}

export default Navbar