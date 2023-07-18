import { NavLink } from "react-router-dom";
import './Landing.css'

const Landing = ()=> {
return(
    <div className="landingContainer">
        <h1>Welcome to Dog Web App</h1>
        <article>
            <NavLink to='/home'> Home </NavLink>
        </article>
    </div>
)
};

export default Landing;