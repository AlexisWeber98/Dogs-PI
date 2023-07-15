import { ALL_DOGS, FILTRED_CREATED, ORDER_BY_NAME, ORDER_BY_WEIGHT } from "./action-types";

let initialState = {
  AllDogs: [],
  filteredDogs: [],
  orderBy: null, // Agrega esta línea para inicializar orderBy
  orderDirection: 1, // Agrega esta línea para inicializar orderDirection
};



const reducer = (state = initialState, {type,payload}) => {
    switch (type) {
        case ALL_DOGS:
            
        return {
            ...state,
        AllDogs: payload };


        case ORDER_BY_NAME:
  let orderByNameCopy = [...state.filteredDogs]; // Cambia de state.AllDogs a state.filteredDogs

  let orderByName = null;
  if (payload === 'A') {
    orderByName = orderByNameCopy.sort((a, b) => a.name.localeCompare(b.name)); // Cambia de a.id - b.id a a.name.localeCompare(b.name)
  } else {
    orderByName = orderByNameCopy.sort((a, b) => b.name.localeCompare(a.name)); // Cambia de b.id - a.id a b.name.localeCompare(a.name)
  }

  return {
    ...state,
    filteredDogs: orderByName,
    orderBy: 'name', // Agrega esta línea para almacenar el ordenamiento actual en el estado
    orderDirection: payload === 'A' ? 1 : -1, // Agrega esta línea para almacenar la dirección del ordenamiento en el estado
  };

case ORDER_BY_WEIGHT:
  let orderByWeightCopy = [...state.filteredDogs]; // Cambia de state.AllDogs a state.filteredDogs

  let orderByWeight = null;
  if (payload === 'Min') {
    orderByWeight = orderByWeightCopy.sort((a, b) => {
      const weightA = parseInt(a.weight.metric.split(' - ')[0]);
      const weightB = parseInt(b.weight.metric.split(' - ')[0]);
      return weightA - weightB;
    });
  } else {
    orderByWeight = orderByWeightCopy.sort((a, b) => {
      const weightA = parseInt(a.weight.metric.split(' - ')[1]);
      const weightB = parseInt(b.weight.metric.split(' - ')[1]);
      return weightA - weightB;
    });
  }

  return {
    ...state,
    filteredDogs: orderByWeight,
    orderBy: 'weight', // Agrega esta línea para almacenar el ordenamiento actual en el estado
    orderDirection: payload === 'Min' ? 1 : -1, // Agrega esta línea para almacenar la dirección del ordenamiento en el estado
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
  };


        
        default:
            return { ...state};
    }
};


export default reducer;