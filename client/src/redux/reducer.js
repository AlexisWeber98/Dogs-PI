import { ALL_DOGS, FILTRED_CREATED, GET_TEMPERAMENTS, ORDER_BY_NAME, ORDER_BY_WEIGHT, FILTER_TEMPERAMENT } from "./action-types";

let initialState = {
  AllDogs: [],
  filteredDogs: [],
  orderBy: null,
  orderDirection: 1,
  allTemperaments:[], 
  
};



const reducer = (state = initialState, {type,payload}) => {
  switch (type) {
    case ALL_DOGS:
            
    return {
        ...state,
        AllDogs: payload };


    case ORDER_BY_NAME:
      let orderByNameCopy = [...state.filteredDogs];
      let orderByName = null;
      
      if (payload === 'A') {
        orderByName = orderByNameCopy.sort((a, b) => a.name.localeCompare(b.name));
      } else {
        orderByName = orderByNameCopy.sort((a, b) => b.name.localeCompare(a.name));
      }
      
      return {
        ...state,
        filteredDogs: orderByName,
        orderBy: 'name', //almacenar el ordenamiento actual en el estado
        orderDirection: payload === 'A' ? 1 : -1, //almacenar la dirección del ordenamiento en el estado
      };
      
    case ORDER_BY_WEIGHT:
      let orderByWeightCopy = [...state.filteredDogs]; 
      let orderByWeight = null;
        
      if (payload === 'Min') {
        orderByWeight = orderByWeightCopy.sort((a, b) => {
          const weightA = parseInt(a.weight.metric.split(' -')[0]);
          const weightB = parseInt(b.weight.metric.split(' - ')[0]);
            
          return weightA - weightB;
        });
        
        } else {
          orderByWeight = orderByWeightCopy.sort((a, b) => {
          const weightA = parseInt(a.weight.metric.split(' - ')[1]);
          const weightB = parseInt(b.weight.metric.split(' - ')[1]);
            
          return weightA - weightB;
          }
        );
      }
        
      return {
      ...state,
      filteredDogs: orderByWeight,
      orderBy: 'weight', 
      orderDirection: payload === 'Min' ? 1 : -1
    };
        
    case FILTRED_CREATED:
      let filterDogs = null;
          
      if (payload === "Created") {
        filterDogs = state.AllDogs.filter((dog) => dog.created);
        } else if (payload === "Existing") {
          filterDogs = state.AllDogs.filter((dog) => !dog.created);
        } else {
        filterDogs = state.AllDogs;
      }
          
      return {
        ...state,
        filteredDogs: filterDogs,
        temperamentFilter: null
      };

    case GET_TEMPERAMENTS:
      return {
        ...state,
        allTemperaments: payload
      }

      case FILTER_TEMPERAMENT:

      let filterTemp = null

      if(payload === "All"){
       
          filterTemp = [...state.AllDogs]
        
      } else {
        let dogsCopy = [...state.AllDogs];
        filterTemp = dogsCopy.filter((dog) => {
          const dogTemperaments = dog.temperament ? dog.temperament.split(',').map((temp) => temp.trim()) : [];
          return filterTemp = dogTemperaments.includes(payload)
        });
      
        return {
          ...state,
          filteredDogs: filterTemp
        };
      
      }
      
        
          
      default:
      return { ...state};
    }
  };


export default reducer;