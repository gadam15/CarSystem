import React from "react";
import { useState } from 'react';
import Footer from "./Elements/footer";
// import { Link } from "react-router-dom";
import Navbar from "./Elements/navbar";

//Komponent podstrony obliczającej koszt trasy
const FuelCost = () => {
    //Deklaracja zmiennych
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
    
    //Obliczenia
    const Calc = () => {
        let FKm = parseFloat(km, 10);
        let FPrice = parseFloat(price, 10);
        let FFuel = parseFloat(fuel, 10);
        let FPeople = parseFloat(people, 10);

        let result = (FKm / 100 * FFuel * FPrice / FPeople).toFixed(2);

        //Wyświetlenie błędów
        if(isNaN(result)){
            return setHowMuch("Set all data")
        } else {
                
            return setHowMuch("Cost: " + result + " zł"); 
        }
    };

    //Zwrócenie widoku stony
    return(
        <>
             
             <div className="container h-75 text-center">
        <section className="position-absolute top-50 start-50 translate-middle w-25 bg-dark bg-gradient p-2 rounded-2">
          
            <h4>Count how much you will pay for your trip (in PLN)</h4>
            <form>
                <label htmlFor="distance">
                    Distance in km: 
                </label>
                <input type="number"  onChange={changeKm} className="rounded-2 text-center"/>
                 <label htmlFor="price">
                    Price in PLN: 
                </label>
                <input type="number" onChange={changePrice} className="rounded-2 text-center"/>
                 <label htmlFor="fc"> 
                    Fuel Consumption in l/100km:
                </label>
                <input type="number" onChange={changeFuel} className="rounded-2 text-center"/>
                 <label htmlFor="np">
                    Number of People: 
                </label>
                <input type="number" onChange={changePeople} className="rounded-2 text-center"/><br/>
                 
                 
                 <input type="button" onClick={Calc} value="Check" className="btn btn-success"/>
                 <br />

                 <p style={{marginTop:"10px"}}>{howMuch}</p>
            </form>
            
        </section>
        </div>
                
            
        </>
    );
};

export default FuelCost;