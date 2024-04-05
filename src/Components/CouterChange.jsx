import { useRef, useState, useEffect} from 'react';
import useAuth from '../hooks/useAuth';
import AuthContext from "../context/AuthProvider";
import {Link, useNavigate, useLocation} from "react-router-dom"
import '../loginstyle.css'
import axios, { axiosPrivate } from '../api/axios';

import useAxiosPrivate from "../hooks/useAxiosPrivate";

const CounterChange = () => {
    const { auth } = useAuth();
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
    const [licznik, setLicznik] = useState('');
    
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
        await axiosPrivate.put(`/CarAPI/UpdateCounter/${id}`, {licznik});
        navigate(`/userCarDetails?id=${id}`)
        }
        catch(err){
            alert("You are not allowed to do this! Go back!!!")
        }
        
    }
    
    return(
             
        <div className="container h-75 text-center">
        <section className="position-absolute top-50 start-50 translate-middle w-25 bg-dark bg-gradient p-2 rounded-2">
          
            <h1>Counter Value</h1>
            <form onSubmit={handleSubmit} method='post'>
                <label htmlFor="licznik">
                    New Counter Value: 
                </label>
                <input 
                    type="text" 
                    
                    id="licznik"
                    name="licznik"
                    value={licznik}
                    autoComplete='off'
                    onChange={e=>setLicznik(e.target.value)}
                    
                    required

                 />
                 
                 <br />
                 <input type="submit" value="Change" className="btn btn-success"/>
                 
            </form>
            
        </section>
        </div>
        
    )}
    

export default CounterChange;