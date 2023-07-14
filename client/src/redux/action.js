import { ALL_DOGS, GET_DETAIL, ORDER_BY_NAME, ORDER_BY_WEIGHT} from "./action-types";
import axios from 'axios'

const URL = 'http://localhost:3001/dogs'

export const getAllDogs = () => {

    return async (dispatch) => {
        try{
            const response = await axios.get(URL);
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
}


export const orderByWeight = (order) => {
    return {
        type: ORDER_BY_WEIGHT,
        payload: order
    }
}

