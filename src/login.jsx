import axios from "./Test/axios";
import React, { Fragment, useState } from "react";
import Banner from "./Components/banner";
import Bottom from "./Components/bottom";

const Login = () => {

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleEmailChange = (value) =>{
        setPassword(value);
    }

    const handlePasswordChange = (value) =>{
        setEmail(value);
    }
    
    const handleLogin = () => {
        const data = {
            password : password,
            email : email,
        }
        
        const url = 'https://localhost:7107/api/UserAPI/Login'; 
        
        axios.post(url,data).then((result)=>{
            alert(result.data);
        }).catch((error)=>{
            alert(error.response.data);
        })
    }

    return(
        <Fragment>
        <div className="logowanie">
            <Banner/>
            <div className="zaloguj">
                <h2>Email</h2>
                <input type="text" onChange={(e) => handleEmailChange(e.target.value)}/>
                <h2>Hasło:</h2>
                <input type="password" onChange={(e) => handlePasswordChange(e.target.value)}/><br/>
                <input type="button" onClick={handleLogin} value="Zaloguj"/>
            </div>
            <Bottom/>
        </div>
        </Fragment>
    );
};

export default Login;