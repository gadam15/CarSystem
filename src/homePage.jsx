import React from "react";
import { Link } from "react-router-dom";
import Banner from './Components/banner';
import Bottom from './Components/bottom';

const Home = () =>{
    return(
        <div className="Home">
            <Banner/>
            <div className="middle1">
                <h2>WITAMY W CARSYSTEM
                    OPIS
                </h2>
            </div>
            <div className="middle2">
                <h2><Link to="/logowanie">Zaloguj</Link> </h2><br/>
                <h2>lub</h2> <br/>
                <h2><Link to="/rejstracja">Zarejestruj</Link></h2> 
            </div>
            <Bottom/>
        </div>

    );
};

export default Home; 