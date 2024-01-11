import { NavLink } from "react-router-dom";
import "./Landing.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import WoD from "../../../public/WoD.png";
import { getAllDogs } from "../../redux/action";

const Landing = () => {
  const dogs = useSelector((state) => state.filteredDogs);
  const [dogId, setDogId] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDogs());
  }, [dogs]);

  const handleNextDog = () => {
    if (dogId < dogs.length - 1) {
      setDogId(dogId + 1);
    }
  };

  const handlePrevDog = () => {
    if (dogId > 0) {
      setDogId(dogId - 1);
    }
  };

  return (
    <div className="landingContainer">
      <div className="title">
        <img className="logo" src={WoD} alt="logo" width={150} />
        <h1>Welcome to World Of Dogs!</h1>
      </div>
      <hr />
      <br />
      {dogs.length > 0 && (
        <>
          <article className="block">
            <div className="buttonContainer">
              <button onClick={handlePrevDog} disabled={dogId === 0}>
                Previous
              </button>
            </div>

            <div className="imageLandingContainer">
              <img
                className="imageLanding"
                src={dogs[dogId].image}
                alt={dogs[dogId].name}
              />
            </div>
            <div className="buttonContainer">
              <button
                onClick={handleNextDog}
                disabled={dogId === dogs.length - 1}>
                Next
              </button>
            </div>
          </article>
          <div className="finalBlock">
            <div className="nameCont">
              <h3 className="nameLanding">Name: {dogs[dogId].name}</h3>
            </div>
            <hr />

            <div className="navLinkButton">
              <NavLink className="buttonEnter" to="/home">
                Enter to the Page
              </NavLink>
            </div>
            <hr />
          </div>
        </>
      )}
    </div>
  );
};

export default Landing;
