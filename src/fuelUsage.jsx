import React from "react";
import { useState } from 'react';
import Bottom from './Components/bottom';
import { Link } from "react-router-dom";
import ProfileBanner from "./Components/profileBanner";



const FuelUsage = () => {
    // const [message, setMessage] = useState('');
    const [km, setKm] = useState('');
    const [price, setPrice] = useState('');
    const [people, setPeople] = useState('');
    
    const changeKm = (e) => {
       setKm(e.target.value);
       let IKm = parseInt(km, 10);
    } 

    const changePrice = (e) => {
       setPrice(e.target.value);
       let ISetPrice = parseInt(price, 10);
    }

    const changePeople = (e) => {
       setPeople(e.target.value);
       let IPeople = parseInt(people, 10);
    }
 
    let howMuch = km + price + people;
    
    console.log(howMuch);

    return(
        <>
            <ProfileBanner/>
                <div className="zuzyciePaliwa">
                    <h2>Wpisz ilość km</h2>
                    <input type="number"  onChange={changeKm}/>
                    <h2>Wpisz cenę paliwa</h2>
                    <input type="number" onChange={changePrice}/>
                    <h2>Ilośc osób</h2>
                    <input type="number" onChange={changePeople}/><br/>
                    <input type="button" value="Sprawdź" />

                     
                    <p>Message: {}</p>
                </div>
            <Bottom/>
        </>
    );
};


export default FuelUsage;