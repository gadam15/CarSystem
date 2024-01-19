import React from "react";
import { Link } from "react-router-dom";

const Banner = () => {
    return(
        <div className='banner'>
            <div className='upper1'>
                <Link to="/"><h1>LOGO</h1></Link>
                </div>
            <div className='upper2'>
                <h1>
                    <Link to="/logowanie"> Logowanie</Link> 
                     /
                    <Link to="/rejstracja"> Rejstracja</Link>
                </h1>
            </div>
        </div>
    );
};

export default Banner;