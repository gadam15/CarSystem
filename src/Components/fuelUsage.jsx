import React from "react";
import { useState } from 'react';
import Bottom from './bottom';
// import { Link } from "react-router-dom";
import Navbar from "./Elements/navbar";

const FuelUsage = () => {
    const [km, setKm] = useState('');
    const [price, setPrice] = useState('');
    const [people, setPeople] = useState('');
    const [fuel, setFuel] = useState('');
    const [howMuch, setHowMuch] = useState('');
    
    const changeKm = (e) => {
        setKm(e.target.value);
    };
    const changePrice = (e) => {
        setPrice(e.target.value);
    };
    const changeFuel = (e) => {
        setFuel(e.target.value);
    };
    const changePeople = (e) => {
        setPeople(e.target.value);
    };
    
    const Calc = () => {
        let FKm = parseFloat(km, 10);
        let FPrice = parseFloat(price, 10);
        let FFuel = parseFloat(fuel, 10);
        let FPeople = parseFloat(people, 10);

        let result = (FKm / 100 * FFuel * FPrice / FPeople).toFixed(2);

        setHowMuch("Koszt jazdy " + result + " zł");       
    };

    return(
        <>
            <Navbar/>
                <div className="zuzyciePaliwa">
                    <h2>Ilość km</h2>
                    <input type="number"  onChange={changeKm}/>
                    <h2>Cena paliwa</h2>
                    <input type="number" onChange={changePrice}/>
                    <h2>Spalanie auta L/100km</h2>
                    <input type="number" onChange={changeFuel}/>
                    <h2>Ilośc osób</h2>
                    <input type="number" onChange={changePeople}/><br/>
                    <input type="button" onClick={Calc} value="Sprawdź" /><br />

                    <p>{howMuch}</p>
                </div>
            <Bottom/>
        </>
    );
};

export default FuelUsage;