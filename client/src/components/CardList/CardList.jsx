import {AllDogs} from '../../App'
import Card from "../Card/Card";

const CardList = () => {

    

    const dogCard = AllDogs.map((id,name, bred_for, reed_group, life_span, temperament, origin, image, weight, height) => {
        <Card
        key={id}
        id= {id}
        name= {name}
        breedFor= {bred_for}
        reed_group={reed_group}
        origin= {origin}
        life_span= {life_span}
        temperament= {temperament}
        weight={weight}
        height={height}
        image={image?.url}
        />
    })

    return(
    <div>
        {dogCard}

    </div>
)
};

export default CardList