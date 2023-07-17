import { useState } from "react";
import { NavLink } from "react-router-dom";
import validation from "./validation";
import { useDispatch } from "react-redux";
import { createDog } from "../../redux/action";



const Create = ({temperaments}) => {

    const dispatch = useDispatch();

    const [ dogDetails, setDogDetails ] = useState({
        name: "",
        image: "",
        heightMin: 0,
        heightMax: 0,
        weightMin: 0,
        weightMax: 0,
        lifeSpan: "",
        bredFor: "",
        breedGroup: "",
        temperament: "",
        created: true,

    });

    const [ errors, setErrors] = useState({
        name:"",
        heightMin:"",
        heightMax:"",
        weightMin:"",
        weightMax:"",
        lifeSpan:"",
        temperament:""
    });

    
    //--------------- Handlers ---------------//
    
   // Dentro de tu componente Create
const handelSubmit = async (event) => {
    event.preventDefault();
    dispatch(createDog(dogDetails));
  
    // Limpiar el formulario
    setDogDetails({
      name: "",
      image: "",
      heightMin: 0,
      heightMax: 0,
      weightMin: 0,
      weightMax: 0,
      lifeSpan: "",
      bredFor: "",
      breedGroup: "",
      temperament: "",
      created: true,
    });
  
    // Mostrar el aviso de confirmación
    alert("El perro ha sido creado correctamente");
  };
  

    const handelChange = (event)=> {
        setDogDetails ({
            ...dogDetails,
            [event.target.name]: event.target.value
          },
        
        validation(dogDetails,setErrors))
    };






    return (
        <div>

            <NavLink to='/home' className="button">Back</NavLink>
            <h1> create a new breed </h1>
            <div>
                <form onSubmit={handelSubmit}>
                    <label htmlFor="name">Name of breed:</label>
                    <input type="text" name="name" placeholder="name" onChange={handelChange} value={dogDetails.name}></input>
                    <p>{errors.name}</p>
                    <br />

                    <label htmlFor="heightMin">Height Min (metric System)</label>
                    <input type="number" name="heightMin" onChange={handelChange} value={dogDetails.heightMin}/>Cm
                    <p>{errors.heightMin}</p>
                    <br />

                    <label htmlFor="heightMax">Height Max</label>
                    <input type="number" name="heightMax" onChange={handelChange} value={dogDetails.heightMax}/>Cm
                    <p>{errors.heightMax}</p>
                    <br />
                    
                    <label htmlFor="weightMin">Weight Min</label>
                    <input type="number" name="weightMin" onChange={handelChange} value={dogDetails.weightMin}/>Kg
                    <p>{errors.weightMin}</p>
                    <br />

                    <label htmlFor="weightMax">Weight Max</label>
                    <input type="number" name="weightMax" onChange={handelChange} value={dogDetails.weightMax}/>Kg
                    <p>{errors.weightMax}</p>
                    <br />

                    <label htmlFor="lifeSpan">Life Span</label>
                    <input type="text" name="lifeSpan" placeholder="ej: 9 - 12."onChange={handelChange} value={dogDetails.lifeSpan}/>years
                    {errors.lifeSpan}
                    <br />

                    <label htmlFor="bredFor">Bred For</label>
                    <input name="bredFor" type="text"  placeholder="Bred For" onChange={handelChange} value={dogDetails.bredFor}/>
                    <br />
                    
                    <label htmlFor="breedGroup">Breed Gropup</label>
                    <select name="breedGroup" defaultValue="Select" onChange={handelChange}>
                        <option value="Undefined">Undefined</option>
                        <option value="Companionship">Companionship</option>
                        <option value="Domestic">Domestic</option>
                        <option value="Herding">Herding</option>
                        <option value="Hound">Hound</option>
                        <option value="Mixed">Mixed</option>
                        <option value="Non-Sporting">Non-Sporting</option>
                        <option value="Sporting">Sporting</option>
                        <option value="Toy">Toy</option>
                        <option value="Terrier">Terrier</option>
                        <option value="Working">Working</option>
                    </select>
                    <br />

                    <label htmlFor="temperament">Temperament</label>
                    <select name="temperament" onChange={handelChange}>
                        <option value="All">All</option>
                        {temperaments && temperaments.map((temperament) => (
                        <option key={temperament.id} value={temperament.name}>{temperament.name}</option>
                        ))};
                    
                    </select>
                    <p>{errors.temperament}</p>
                    <br />

                    <label htmlFor="image"> Image</label>
                    <input name="image" type="text" placeholder="URL" value={dogDetails.image} onChange={handelChange}/>
                    <p>{errors.image? errors.image:null}</p>
                    <br />

                    <button type="submit" disabled={!dogDetails.name||
                        errors.name || errors.heightMax || errors.heightMin || errors.weightMax || errors.weightMin || errors.lifeSpan || errors.temperament || errors.image
                        }>Create</button>
                    
                </form>
            </div>
        </div>
    )
} ;


export default Create;