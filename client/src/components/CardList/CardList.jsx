import Card from "../Card/Card";
import './CardList.css'

const CardList = ({ dogs, filterDogs }) => {
    const dogCard = dogs?.map(({ id, name, bred_for, reed_group, life_span, temperament, origin, image, weight, height, created }) => (
      <Card
        key={id}
        id={id}
        name={name}
        bred_for={bred_for}
        reed_group={reed_group}
        life_span={life_span}
        temperament={temperament && temperament.name ? temperament.name : temperament}
        origin={origin}
        weight={weight}
        height={height}
        image={image && image.url ? image.url : image}
        created={created}
      />
    ));
  
    return (
      <div className="cardList">
        {dogCard}
      </div>
    );
  };
  

export default CardList