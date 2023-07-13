const getDogs = async () => {

try {
    const {data} = await axios.get(URL);

    if(data.name) return sixDogs
} catch (error) {
    return error.message
}

};

export default getDogs