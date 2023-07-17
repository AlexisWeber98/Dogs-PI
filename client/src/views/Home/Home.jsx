import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardList from "../../components/CardList/CardList";
import './Home.css'
import { getAllDogs, orderByName, orderByWeight, filterCreated, filterByTemperament, getTemperaments } from "../../redux/action";


const Home = ({temperaments}) => {

    const dispatch = useDispatch();
    
    const dogs = useSelector((state) => state.filteredDogs);


    // ------------ Local States --------------//

    const [auxName, setAuxName] = useState(false);
    const [auxWeight, setAuxWeight] = useState(false);
    const [filtredCreated, setFiltredCreated] = useState(false);

    

    useEffect(() => {
  dispatch(getAllDogs());
  ;
}, []);



    

    // ------------------ Handlers ----------------- //

    const handleOrderByName = (event) => {
        dispatch(orderByName(event.target.value));
        setAuxName(true);
    };
      
    const handleOrderByWeight = (event) => {
        dispatch(orderByWeight(event.target.value));
        setAuxWeight(true);
    };
      

    const hanldeFiltredCreated = (event) => {
        dispatch(filterCreated(event.target.value))
        setFiltredCreated(true)
    };

    const handleFilterByTemperament = (event) => {
        dispatch(filterByTemperament(event.target.value))
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

                <select onChange={handleOrderByWeight}>
                    
                    <option value="Min">Min</option>
                    <option value="Max">Max</option>
                </select>

                <select onChange={hanldeFiltredCreated}>
                    <option value="Existing">Existing</option>
                    <option value="Created">Created</option>

                </select>

                <select onChange={handleFilterByTemperament}>
                    <option value="All">All</option>
                    {temperaments && temperaments.map((temperament) => (
                    <option key={temperament.id} value={temperament.name}>{temperament.name}</option>
                    ))}
                </select>


            </div>
            <div className="firstDogs">
                <CardList dogs={dogs}/>
            </div>
            
        </div>
    )
};


export default Home;