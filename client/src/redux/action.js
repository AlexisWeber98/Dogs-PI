import { ALL_DOGS, FILTRED_CREATED, GET_DETAIL, ORDER_BY_NAME, ORDER_BY_WEIGHT, FILTER_TEMPERAMENT, GET_TEMPERAMENTS} from "./action-types";
import axios from 'axios'

const URL_DOGS = 'http://localhost:3001/dogs'
const URL_TEMPERAMENTS= 'http://localhost:3001/temperaments'

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
            const {data} = await axios.get(`${URL}/${id}`);
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
            const {data} = await axios.get(URL_TEMPERAMENTS);
            return dispatch ({
                type: GET_TEMPERAMENTS,
                payload: data})
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
  
