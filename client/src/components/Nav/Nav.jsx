import { NavLink } from "react-router-dom";
import { useState } from "react";
import './Nav.css';
import { onSearch } from "../../redux/action";
import { useDispatch } from "react-redux";

const Nav = () => {

  const dispatch = useDispatch();
  
  const [name, setName] = useState("");

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = () => {
    dispatch(onSearch(name))
  };

  return (
    <div>
      
      <h1>World Of Dogs</h1>
      <div className="container">
        <div className="searchBar">
          <button className="button" onClick={() => handleSubmit(name)}>Search</button>
          <input className="my-input" type="text" name="search" placeholder="Search By Breed" onChange={handleChange} />
        </div>

        <div>
          <NavLink className="button button-create" to="/create">Create Dog</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Nav;
