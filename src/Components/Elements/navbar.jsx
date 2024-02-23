import React from "react";

const Navbar = () => {
    return(
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <span>CarSystem</span>
        <button className="navbar-toggler" type="button" data-bs-parent="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item active">
                    <a href="#" className="nav-link">
                        Home
                    </a>
                </li>
                <li className="nav-item active">
                    <a href="#" className="nav-link">
                        Features
                    </a>
                </li>
                <li className="nav-item active">
                    <a href="#" className="nav-link">
                        Another
                    </a>
                </li>
            </ul>
        </div>
        
    </nav>

    
    )
}

export default Navbar