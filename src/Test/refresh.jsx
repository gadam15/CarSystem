/*import React, { Fragment, useState, useEffect } from "react";
import { CookiesProvider, useCookies } from "react-cookie";

const [cookies, setCookie, removeCookie] = useCookies(["jwtToken"]);
const cookie = Cookie.get("jwtToken")
const data1={
    jwtToken: cookie,
    refreshToken:
};
if(!cookie){
    
    const url = 'https://localhost:7107/api/UserAPI/RefreshToken'; 
        response = axios.post(url, data1).
        then(function (response){
            console.log(response.data)
            var jwtToken = response.data['jwtToken']
            //Cookies.set('token', response.data['jwtToken'], { expires: 1/12, secure: true })
            setCookie('jwtToken', jwtToken, { path: "/", maxAge: 7200, secure: true}) 
            setNavigate(true)
        })
        .catch(function(error){
            console.log(error);
        });
}*/