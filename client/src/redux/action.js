import { ALL_DOGS, FILTRED_CREATED, GET_DETAIL, ORDER_BY_NAME, ORDER_BY_WEIGHT, FILTER_TEMPERAMENT, GET_TEMPERAMENTS, SEARCH} from "./action-types";
import axios from 'axios'

const URL_DOGS = 'http://localhost:3001/dogs'
const URL_TEMPERAMENTS= 'http://localhost:3001/temperaments'
const URL_NAME = "http://localhost:3001/dogs/name?name="

export const getAllDogs = () => {

    return async (dispatch) => {
        try{
            const response = await axios.get(URL_DOGS);
            const dogs = response.data
            return dispatch ({
                type: ALL_DOGS,
                payload: dogs})
        } catch (error){
            error.message
        };
    };
};


export const getDetail = (id) => {

    return async (dispatch) => {
        try {
            const response = await axios.get(`${URL_DOGS}/${id}`);
            const data = response.data
            return dispatch ({
                type : GET_DETAIL,
                payload: data
            })
        }
        catch (error) {

        }
    }
};

export const orderByName= (order) => {
    return {
        type: ORDER_BY_NAME,
        payload: order
    }
};


export const orderByWeight = (order) => {
    return {
        type: ORDER_BY_WEIGHT,
        payload: order
    }
};

export const filterCreated = (filtred) => {
    return {
        type: FILTRED_CREATED,
        payload: filtred
    }
};

export const getTemperaments = () => {
    return async (dispatch) => {
        try{
            const response = await axios.get(URL_TEMPERAMENTS);
            const temperaments= response.data
            return dispatch ({
                type: GET_TEMPERAMENTS,
                payload: temperaments})
        } catch (error){
            error.message
        };
    };
}

export const filterByTemperament = (temperament) => {
    return {
      type: FILTER_TEMPERAMENT,
      payload: temperament,
    };
  };

  export const createDog = (dogData) => {
    const {name, image, heightMin, heightMax, weightMin, weightMax, lifeSpan, bredFor, breedGroup, temperament, created } = dogData;

    return async () =>  {
       try {
        await axios.post(URL_DOGS, {
        name,
        image,
        heightMin: Number(heightMin),
        heightMax: Number(heightMax),
        weightMin: Number(weightMin),
        weightMax: Number(weightMax),
        lifeSpan,
        bredFor,
        breedGroup,
        temperament,
        created
        })
       } catch (error) {
        return error.message;
       }
    }
  };

  export const onSearch = (name) => {
    return async (dispatch) => {
      try {
        const { data } = await axios.get(`${URL_NAME}${name}`);
        console.log(data);
        return dispatch({
          type: SEARCH,
          payload: data
        });
      } catch (error) {
        throw new Error(error.message); 
      }
    };
};
  