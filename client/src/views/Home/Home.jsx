import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardList from "../../components/CardList/CardList";
import './Home.css'
import { getAllDogs, orderByName } from "../../redux/action";


const Home = () => {

    const dispatch = useDispatch();
    const dogs = useSelector((state)=> state.AllDogs);
    const [auxName, setAuxName] = useState(false)

    useEffect(()=> {
        dispatch(getAllDogs());
       
    }, []);


    // ------------------ Handlers ----------------- //

    const handleOrderByName = (event) => {
        dispatch(orderByName(event.target.value))
        setAuxName(true)
    };





    return (
        <div>
            <h1>Our Dogs</h1>
            <div>
                <h3>Order By</h3>
                <select onChange={handleOrderByName}>
                    <option value="A">A-Z</option>
                    <option value="D">Z-A</option>
                </select>

                <select>
                    
                    <option value="Min">Min</option>
                    <option value="Max">Max</option>
                </select>

                <select>
                    <option value="Existing">Existing</option>
                    <option value="Created">Created</option>

                </select>

                <select >
                    <option value=""></option>
                </select>
            </div>
            <div className="firstDogs">
                <CardList dogs={dogs}/>
            </div>
            
        </div>
    )
};


export default Home;