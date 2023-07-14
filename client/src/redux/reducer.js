import { ALL_DOGS, ORDER_BY_NAME, ORDER_BY_WEIGHT } from "./action-types";

let initialState = {
    AllDogs:[],
}

const reducer = (state = initialState, {type,payload}) => {
    switch (type) {
        case ALL_DOGS:
            
        return {
            ...state,
        AllDogs: payload };


        case ORDER_BY_NAME:
            let orderByNameCopy = state.AllDogs;
            let sortOrder =  payload === 'A'? orderByNameCopy.sort((a, b) => a.id- b.id) : state.AllDogs.sort((a, b) => b.id - a.id);
            return{
                ...state,
                AllDogs : sortOrder
            };


            case ORDER_BY_WEIGHT:
                let orderByWeightCopy = state.AllDogs   
            let sortByWeight= payload === "Min" ? orderByWeightCopy.sort((a, b)=> a.weight - b.weight): orderByWeightCopy.sort((a, b)=> b.weight- a.weight)
                return {
                    ...state,
                    AllDogs:sortByWeight
                }

        
        default:
            return { ...state};
    }
};


export default reducer;