import axios from "./Test/axios";
// import Cookies from "js-cookie";
import { CookiesProvider, useCookies } from "react-cookie";
import {jwtDecode} from "jwt-decode";
import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Banner from "./Components/banner";
import Bottom from "./Components/bottom";

const Login = () => {

    const navigateTo = useNavigate();
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [cookies, setCookie] = useCookies(["jwtToken"]);

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
        
        
        // When the user logs in
        const response = fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json())
        .then((data1) => {
           
            // console.log(data1)
            const jwtToken = data1.jwtToken;
            console.log(jwtToken);

            // Cookies.set('token', jwtToken, { expires: 7, httpOnly: true});
            document.cookie = `JWT=${jwtToken}; expires=${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString()};  `;
            // setCookie("user", jwtToken, { path: "/", httpOnly: true });
        });
          
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