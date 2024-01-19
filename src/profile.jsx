import React from "react";
import Bottom from "./Components/bottom";
import ProfileBanner from "./Components/profileBanner";
import { useState, useEffect } from 'react';

const url = 'https://localhost:7107/api/CarAPI';

const FetchData = () => {
  const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await fetch(url);
            const users = await response.json();
            setUsers(users);
        } catch (error) {
            console.log(error);
        }
        };
        fetchData();
    }, []);

    // const Profile = () => {
        return(
            <div className="profil2">
                <ProfileBanner/>
                    <div className="profil">
                        <h1>Twoje samochody</h1>
                        <table>
                        <tr><th>Marka</th><th>Model</th><th>Rok</th><th>Przebieg</th></tr>
                        
                        {users.map((user) => {
                            const { id, marka, model, rok, licznik  } = user;
                            return (
                                    <tr key={id}><td>{marka}</td><td>{model}</td><td>{rok}</td><td>{licznik}</td></tr> 
                                );
                        })}

                        </table>
                    </div>
                <Bottom/>
            </div>
        );
    };
// };
export default FetchData;