

const validation = (dogDetails,setErrors) => {
    let tempErrors = {};

    if(!dogDetails.name) tempErrors.name= "Name is required";
    if(dogDetails.name.length >35) tempErrors.name = "max 35 characters"

    if(!dogDetails.heightMin) tempErrors.heightMin= "Height Min is required";
    if(dogDetails.heightMin > dogDetails.heightMax) tempErrors.heightMin= "Height Min cannot be greater than Height Max";

    if(!dogDetails.heightMax) tempErrors.heightMax= "Height Max is required";
    if(dogDetails.heightMax < dogDetails.heightMin) tempErrors.heightMax = "Height Max cannot be lower than Height Max"

    if(!dogDetails.weightMin) tempErrors.weightMin= "Weight Min is required";
    if(dogDetails.weightMin > dogDetails.weightMax) tempErrors.heightMin = "Weight Min cannot be greater than Weight Max"

    if(!dogDetails.weightMax) tempErrors.heightMax= "Weight Max is required";
    if (dogDetails.weightMax < dogDetails.weightMin) tempErrors.weightMax = "Weight Max cannot be lower than Weight Min"

    if(!dogDetails.breedGroup) tempErrors.breedGroup = "Breed Gropup is required";
    if(!dogDetails.temperament) tempErrors.temperament = "Temperament is required";

    if(dogDetails.image){
        if(!/^(ftp|http|https):\/\/[^ "]+$/.test(dogDetails.image)) {
            tempErrors.image= "image is not an URL"
        };
    };
    
    setErrors(tempErrors)
};

export default validation;