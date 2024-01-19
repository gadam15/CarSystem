import React from "react";
import Banner from "./Components/banner";
import Bottom from "./Components/bottom";

const Register = () => {
    return(
        <div className="Rejstracja">
            <Banner/>
            <div className="rejstracja">
            <h2>Nazwa użytkownika:</h2>
                <input type="text"/>
                <h2>Hasło:</h2>
                <input type="password"/><br/>
                <h2>Powtórz hasło:</h2>
                <input type="password"/><br/>
                <input type="button" value="Zarejestruj"/>
            </div>
            <Bottom/>
        </div>
    );
};

export default Register;