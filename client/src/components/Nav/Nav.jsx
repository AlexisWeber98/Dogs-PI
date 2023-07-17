import { NavLink } from "react-router-dom";
import { useState } from "react";
import './Nav.css';
import { onSearch } from "../../redux/action";
import { useDispatch } from "react-redux";

const Nav = () => {

  const dispatch = useDispatch()
  const [name, setName] = useState("");

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = () => {
    dispatch(onSearch(name))
  };

  return (
    <div className="navContainer">
      <div>
        <input className="searchBar" type="text" name="search" placeholder="Search By Breed" onChange={handleChange} />
        <button className="searchButton" onClick={() => handleSubmit(name)}>Search</button>

        <NavLink to="/create">Create Dog</NavLink>
      </div>
    </div>
  );
};

export default Nav;
