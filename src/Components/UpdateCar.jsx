import { useRef, useState, useEffect} from 'react';
import useAuth from '../hooks/useAuth';
import AuthContext from "../context/AuthProvider";
import {Link, useNavigate, useLocation} from "react-router-dom"
import '../loginstyle.css'
import axios, { axiosPrivate } from '../api/axios';

import useAxiosPrivate from "../hooks/useAxiosPrivate";

//Komponent podstrony aktualizującej dane o samochodzie
const UpdateCar = () => {
    
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();

    //deklaracja zmiennych
    const [model, setModel] = useState('');
    const [marka, setMarka] = useState('');
    const [rok, setRok] = useState('');
    const [licznik, setLicznik] = useState('');
    const [opis, setOpis] = useState('');

    //Pobranie parametru ID z URL
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            //Zapytanie do API
            await axiosPrivate.put(`/CarAPI/UpdateCar/${id}`, {marka, model, rok, licznik, opis});
            navigate("/myCars")
        }
        catch(err){
            //Alert wyśiwetlany w przypadku nieautoryzowanej próby wykonania zapytania
            alert("You are not allowed to do this! Go back!!!")
        }
        
    }
    
    //Zwrot widoku strony
    return(
             
        <div className="container h-75 text-center">
        <section className="position-absolute top-50 start-50 translate-middle w-25 bg-dark bg-gradient p-2 rounded-2">
          
            <h1>Add New Car</h1>
            <form onSubmit={handleSubmit} method='post'>
                <label htmlFor="marka">
                    Mark: 
                </label>
                <input 
                    type="text" 
                    
                    id="marka"
                    name="marka"
                    value={marka}
                    autoComplete='off'
                    onChange={e=>setMarka(e.target.value)}
                    
                    required

                 />
                 <label htmlFor="model">
                    Model: 
                </label>
                <input 
                    type="text" 
                    id="model"
                    name="model"
                    value={model}
                    autoComplete='off'
                    onChange={(e)=>setModel(e.target.value)}
                    
                    required
                    
                 />
                 <label htmlFor="rok">
                    Year: 
                </label>
                <input 
                    type="text" 
                    id="rok"
                    name="rok"
                    value={rok}
                    autoComplete='off'
                    onChange={(e)=>setRok(e.target.value)}
                    
                    required

                 />
                 <label htmlFor="licznik">
                    Counter: 
                </label>
                <input 
                    type="text" 
                    id="licznik"
                    name="licznik"
                    value={licznik}
                    autoComplete='off'
                    onChange={(e)=>setLicznik(e.target.value)}
                   
                    required

                 />
                 <label htmlFor="opis">
                    Description: 
                </label>
                <textarea
                    className="form-control" 
                    type="text" 
                    id="opis"
                    name="opis"
                    value={opis}
                    autoComplete='off'
                    onChange={(e)=>setOpis(e.target.value)}
                   
                    required

                 />
                 
                 <br />
                 <input type="submit" value="Update" className="btn btn-success"/>
                 
            </form>
            
        </section>
        </div>
        
    )}
    

export default UpdateCar;