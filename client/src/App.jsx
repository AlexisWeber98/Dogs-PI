import React from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getAllDogs, getTemperaments, onSearch } from "./redux/action";
import { useDispatch, useSelector } from "react-redux";
import Home from './views/Home/Home'
import Landing from "./views/Landing/Landing";
import Detail from "./views/Detail/Detail";
import Create from "./views/Create/Create";
import Nav from "./components/Nav/Nav";


const App = () => {

    const location = useLocation();
    const dispatch = useDispatch()
    const temperaments = useSelector((state) => state.allTemperaments);
    const dogs = useSelector((state) => state.filteredDogs)

   

    useEffect(()=> {
      dispatch(getTemperaments());
      dispatch(getAllDogs())
    }, [])
    return(
        <div>

{location.pathname !== "/" && location.pathname !== "/create" ? <Nav onSearch= {onSearch}/> : null}

        <Routes>
            <Route path="/" element= {<Landing/>}/>
            <Route path="/home" element= {<Home temperaments = {temperaments}/>}/>
            <Route path="/detail/:id" element={<Detail/>}/>
            <Route path="/create" element ={<Create temperaments= {temperaments}/>}/>
        </Routes>
        </div>
    )

};


export default App;