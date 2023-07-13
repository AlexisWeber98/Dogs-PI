import React from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Home from './views/Home/Home'
import Landing from "./views/Landing/Landing";
import Detail from "./views/Detail/Detail";
import Create from "./views/Create/Create";
import SearchBar from "./components/SearchBar/SearchBar";
import getDogs from "./helpers/getDogs";


const App = () => {
    const location = useLocation()


    const [AllDogs,setAllDogs] = useState({})

    useEffect(()=> {
       const dogs = getDogs();
       setAllDogs(dogs)
    }, []);



    return(
        <div>
        {location.pathname !== "/landing" && <SearchBar/>}
        <Routes>
            <Route path="/landing" element= {<Landing/>}/>
            <Route path="/home" element= {<Home AllDogs={AllDogs}/>}/>
            <Route path="/home/:id" element={<Detail/>}/>
            <Route path="/create" element ={<Create/>}/>
        </Routes>
        </div>
    )

};


export default App;