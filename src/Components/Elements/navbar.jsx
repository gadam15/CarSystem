import React from "react";
import useLogout from "../../hooks/useLogout";
import {Link, useNavigate, useLocation} from "react-router-dom"
import useAuth from '../../hooks/useAuth';

//Tworzenie komponentu paska nawigacji
const Navigbar = () => {
    const navigate = useNavigate();
    const logout = useLogout();
    const { auth } = useAuth();
    const signOut = async () => {
        await logout();
        
        navigate('/login');
    }
    
    
    return(
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
        <Link to="/" className="nav-link"><span><h3>CarSystem</h3></span></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item active">
                    
                    <Link to={`/profile?id=${auth?.id}`} className="nav-link"><i class="bi-person-circle"></i> Profile</Link>
                    
                </li>
                <li className="nav-item active">
                    <Link to="/myCars" className="nav-link"><i className="bi-car-front-fill"></i> My Cars</Link>
                </li>
                <li className="nav-item">
                    <Link to="/fuelUsage" className="nav-link"><i className="bi-fuel-pump-fill"></i> Fuel Cost</Link>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link"   onClick={signOut}> 
                        <i className="bi-box-arrow-left"></i> Sign Out
                    </a>
                </li>
            </ul>
        </div>
        </div>
    </nav>

    )
}


export default Navigbar