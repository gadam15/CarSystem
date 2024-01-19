import React from "react";
import Banner from "./Components/banner";
import Bottom from "./Components/bottom";

const Login = () => {
    return(
        <div className="logowanie">
            <Banner/>
            <div className="zaloguj">
                <h2>Nazwa użytkownika:</h2>
                <input type="text"/>
                <h2>Hasło:</h2>
                <input type="password"/><br/>
                <input type="button" value="Zaloguj"/>
            </div>
            <Bottom/>
        </div>
    );
};

export default Login;