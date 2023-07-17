import './Card.css'
import { NavLink } from "react-router-dom";


const Card = ({id,name, bred_for, reed_group, life_span, temperament, origin, image, weight, height, created}) => {
    return (
        <div className='card'>
            <NavLink to={`/detail/${id}`}>
                <img className='img' src={image} alt={name} />
                <h2>Name | {name}</h2>
                {weight && <h3>Weight | {weight.metric?weight.metric: weight}</h3>}
                <h3>Temperament | {temperament} </h3>
            </NavLink>

        </div>
    )
};


export default Card;