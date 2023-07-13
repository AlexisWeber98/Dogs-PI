import { NavLink } from "react-router-dom";


const Card = ({id,name, bred_for, reed_group, life_span, temperament, origin, image, weight, height}) => {
    return (
        <div>
            <NavLink to={`/detail/${id}`}>
                <img src={image.url} alt={name} />
                <h2>name | {name}</h2>
                <h3>origin | {origin}</h3>
            </NavLink>

        </div>
    )
};


export default Card;