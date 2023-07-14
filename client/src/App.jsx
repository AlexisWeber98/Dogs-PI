import React from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Home from './views/Home/Home'
import Landing from "./views/Landing/Landing";
import Detail from "./views/Detail/Detail";
import Create from "./views/Create/Create";
import SearchBar from "./components/SearchBar/SearchBar";
import Nav from "./components/Nav/Nav";


const App = () => {
    const location = useLocation()

    return(
        <div>

{location.pathname !== "/" && location.pathname !== "/create" ? <Nav /> : null}

        <Routes>
            <Route path="/" element= {<Landing/>}/>
            <Route path="/home" element= {<Home/>}/>
            <Route path="/detail/:id" element={<Detail/>}/>
            <Route path="/create" element ={<Create/>}/>
        </Routes>
        </div>
    )

};


export default App;