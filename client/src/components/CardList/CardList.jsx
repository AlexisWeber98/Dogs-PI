import Card from "../Card/Card";
import './CardList.css'

const CardList = ({dogs}) => {

    const dogCard = dogs?.map(({id,name, bred_for, reed_group, life_span, temperament, origin, image, weight, height, created}) => (
        <Card
        key={id}
        id={id}
        name={name}
        bred_for={bred_for}
        reed_group={reed_group}
        life_span={life_span}
        temperament={temperament}
        origin={origin}
        weight={weight}
        height={height}
        image={image?.url}
        created={created}

        />
    ))


    return(
    <div className="cardList">
        {dogCard}

    </div>
)
};

export default CardList