import { useParams, NavLink } from "react-router-dom";
import { getDetail } from "../../redux/action";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";


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
    },[])
    return (
        <div>
            <NavLink to="/home" className="button">Back</NavLink>
            
        <h1>Breed Detail</h1>
        <div>
            <img src={dog.image} alt={dog.name} />
            <h3>Name: {dog.name} </h3>
            <h3>Height: {dog.height} Cm</h3>
            <h3>Weight: {dog.weight} Kg</h3>
            <h3>Life Span: {dog.lifeSpan ? dog.lifeSpan: "undefined"}</h3>
            <h3>Bred For: {dog.bredFor}</h3>
            <h3>Bred Group: {dog.berdGroup}</h3>
            <h3>Temperament: {dog.temperament}</h3>

        </div>
        
        </div>
    )
};


export default Detail;