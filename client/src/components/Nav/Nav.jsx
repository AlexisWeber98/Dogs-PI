import { NavLink } from "react-router-dom";
import { useState } from "react";
import './Nav.css';
import { onSearch } from "../../redux/action";
import { useDispatch } from "react-redux";

const Nav = ({ setCurrentPage }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [errorNameSearch, setErrorNameSearch] = useState(null);

  const handleChange = (event) => {
  const value = event.target.value;
  setName(value);

  if (/\d/.test(value)) {
    setErrorNameSearch("Cannot contain numbers");
  } else {
    setErrorNameSearch(null);
  }
};


  const handleSubmit = () => {
    if (!errorNameSearch) {
      setCurrentPage(1);
      dispatch(onSearch(name));
      setName("");
    }
  };

  return (
    <div className="bodyNav">
      <h1>World Of Dogs</h1>
      <div className="container">
        <div className="searchBar">
          <button className="button" onClick={handleSubmit} disabled={!name || !!errorNameSearch}>
            Search
          </button>
          <input className="my-input" type="text" name="search" placeholder="Search By Breed" onChange={handleChange} value={name} />
          {errorNameSearch && <p>{errorNameSearch}</p>}
        </div>
        <div>
          <NavLink className="button button-create" to="/create">
            Create Dog
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Nav;



