import SearchBar from "../SearchBar/SearchBar";
import { NavLink } from "react-router-dom";
import './Nav.css'

const Nav = () => {
    return(
        <div className="navContainer">
            <div>
                <SearchBar/>
            </div>
            <NavLink className="button" to='/create'>create a new dog</NavLink>
        </div>
    )
};


export default Nav;