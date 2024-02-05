import React, { Fragment, useState } from "react";
import axios from "./Test/axios";
import Banner from "./Components/banner";
import Bottom from "./Components/bottom";

const Register = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleNameChange = (value) =>{
        setName(value);
    }

    const handleEmailChange = (value) =>{
        setPassword(value);
    }

    const handlePasswordChange = (value) =>{
        setEmail(value);
    }
    
    const handleSave = () => {
        const data = {
            userName : name,
            password : password,
            email : email,
        }
        
        const url = 'https://localhost:7107/api/UserAPI/Register'; 
        
        axios.post(url,data).then((result)=>{
            alert("zarejestrowano");
        }).catch((error)=>{
            alert(error.response.data);
        })
    }

    return(
        <Fragment>
        <div className="Rejstracja">
            <Banner/>
            <div className="rejstracja">
                <h2>Nazwa użytkownika:</h2>
                <input type="text" onChange={(e) => handleNameChange(e.target.value)}/>
                <h2>Email</h2>
                <input type="text" onChange={(e) => handleEmailChange(e.target.value)}/>
                <h2>Hasło:</h2>
                <input type="password" onChange={(e) => handlePasswordChange(e.target.value)}/><br/>
                <input type="button" onClick={handleSave} value="Zarejestruj"/>
            </div>
            <Bottom/>
        </div>
        </Fragment>
    );
};

export default Register;