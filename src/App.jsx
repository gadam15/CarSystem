import React from 'react';
import Home from './homePage';
import { Route, Routes } from 'react-router-dom';
import Login from './login';
import Register from './register';
import FetchData from './profile';
import FuelUsage from './fuelUsage';

function App() {
  return (
    <div className="App">
        <Routes><Route path="/" element={<Home/>} /></Routes>
        <Routes><Route path="/logowanie" element={<Login/>} /></Routes>
        <Routes><Route path="/rejstracja" element={<Register/>} /></Routes>
        <Routes><Route path="/profil" element={<FetchData/>} /></Routes>
        <Routes><Route path="/zuzyciePaliwa" element={<FuelUsage/>} /></Routes>
    </div>
  );
}

export default App;
