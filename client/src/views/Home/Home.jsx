import { NavLink } from "react-router-dom";
import CardList from "../../components/CardList/CardList";

const Home = (name, bred_for, reed_group, life_span, temperament, origin, image, weight, height) => {
    return (
        <div>
            <h1>this is an Home</h1>
            <div>
                <CardList />
            </div>
            <div>
                <NavLink to='/create'>create a new dog</NavLink>
            </div>
        </div>
    )
};


export default Home;