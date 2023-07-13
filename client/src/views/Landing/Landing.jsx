import { NavLink } from "react-router-dom";

const Landing = ()=> {
return(
    <div>
        <h1>Welcome to Dog Web App</h1>
        <article>
            <NavLink to='/home'> Home </NavLink>
        </article>
    </div>
)
};

export default Landing;