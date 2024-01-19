import React from "react";
import { Link } from "react-router-dom";


const ProfileBanner = () => {
    return(
        <div className='banner'>
            <div className='upper1'>
                <Link to="/"><h1>LOGO</h1></Link>
                </div>
            <div className='upper2'>
                <h1>
                    <p>Wyloguj</p>
                </h1>
            </div>
        </div>
    );
};

export default ProfileBanner;