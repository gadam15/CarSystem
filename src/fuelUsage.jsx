import React from "react";
import { useState } from 'react';
import Bottom from './Components/bottom';
import { Link } from "react-router-dom";
import ProfileBanner from "./Components/profileBanner";



const FuelUsage = () => {
    const [message, setMessage] = useState('');
    const [km, setKm] = useState('');
    
    const iloscKm = (e) => {
        // setMessage(e.target.value);
        setKm = e.target.value;

    };
    const wynik = () =>{
    };
    console.log(km);

    return(
        <>
            <ProfileBanner/>
                <div className="zuzyciePaliwa">
                    <h2>Wpisz ilość km</h2>
                    <input type="number"  onChange={iloscKm}/>
                    <h2>Wpisz cenę paliwa</h2>
                    <input type="number" />
                    <h2>Ilośc osób</h2>
                    <input type="number" /><br/>
                    <input type="button" value="Sprawdź" />

                    <p>Message: {message}</p>
                </div>
            <Bottom/>
        </>
    );
};


export default FuelUsage;