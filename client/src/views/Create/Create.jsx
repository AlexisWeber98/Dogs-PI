import { NavLink } from "react-router-dom";


const Create = () => {

    return (
        <div>

            <NavLink to='/home' className="button">Back</NavLink>
            <h1> create a new breed </h1>
            <div>
                <form action="">
                    <label htmlFor="name">Name of breed:</label>
                    <input type="text" name="name"></input>

                    <label htmlFor="HeightMin">Height Min (metric System)</label>
                    <input type="number" name="HeightMin"/>

                    <label htmlFor="HeightMax">Height Max</label>
                    <input type="number" name="HeightMax"/>
                    
                    <label htmlFor="wightMin">Wight Min</label>
                    <input type="number" name="wightMin"/>
                    
                    <label htmlFor="wightMax">Wight Max</label>
                    <input type="number" name="wightMax"/>
                    
                    <label htmlFor="lifeSpan">Life Span</label>
                    <input type="text" min="0"name="lifeSpan"/>

                    <label htmlFor="">Bred For</label>
                    <input type="text" />
                    
                    <label htmlFor="">Breed Gropup</label>
                    <select defaultValue="Select">
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


                    <label htmlFor="">tempeament</label>
                    <select name="" id="">
                        <option value=""></option>
                    </select>

                    <button>Create</button>
                    
                </form>
            </div>
        </div>
    )
} ;


export default Create;