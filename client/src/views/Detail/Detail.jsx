import { useParams, NavLink } from "react-router-dom";
import { getDetail } from "../../redux/action";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import './Detail.css'


const Detail = () => {

    const {id} = useParams();
    const dispatch = useDispatch();
    const [dog,setDog] = useState({})
    
    useEffect(() => {
       const getDogDetail = async () => {
        try{
        const data = await dispatch(getDetail(id))
        setDog(data.payload)
        }catch (error) {
        return error.message
        }
       };
       getDogDetail()
    },[]);



    return (
        <div className="detailContainer">
          <br />
          <NavLink to="/home" className="button">Back</NavLink>
      
          <div className="content">
            <div className="imageContainer">
              <img className="image" src={dog.image} alt={dog.name} />
            </div>
            <div className="detali">
              <h3>Name : <br />{dog.name}</h3>
              <hr />
              <h3>Height : <br /> {dog.height} Cm</h3>
              <hr />
              <h3>Weight: <br />{dog.weight} Kg</h3>
              <hr />
              <h3>Life Span: <br />{dog.lifeSpan ? dog.lifeSpan : "undefined"}</h3>
              <hr />
              <h3>Bred For: <br />{dog.bredFor}</h3>
              <hr />
              <h3>Bred Group: <br />{dog.berdGroup? dog.berdGroup: "undefined"}</h3>
              <hr />
              <h3>Temperament: <br />{dog.temperament}</h3>
            </div>
          </div>
        </div>
      );
      
};


export default Detail;