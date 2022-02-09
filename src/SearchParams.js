import { useEffect, useState, useContext } from "react";
import Result from "./Results";
import useBreedList  from "./useBreedList";
import ThemeContext from "./ThemeContext";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];
const BREED = [];

const SearchParams = () => {
    const [location, setLocation] = useState("");
    const [animal, setAnimal] = useState("");
    const [breed, setBreed] = useState("");
    const [pets,setPet] = useState([]);
    const [breeds] = useBreedList(animal);
    const [theme,setTheme] = useContext(ThemeContext);
    
    useEffect(() => {
      requestPets();
    },[])

    function updateLocation(e){
        setLocation(e.target.value)
    }
    function updateAnimal(e){
      setAnimal(e.target.value);
    }
    function updateBreed(e){
      setBreed(e.target.value);
    }
      async function requestPets(){
      var res = await fetch(`http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`);
      var json = await res.json();
      setPet(json.pets);
    }

    return (
      <div className="search-params">
        <form
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}
        >
          <label htmlFor="location">
            Location
            <input id="location" onChange={updateLocation} value={location} placeholder="Location" />
          </label>

          <label htmlFor="animals">
            Animals
            <select value={animal} onBlur={updateAnimal} onChange={updateAnimal} id="animals">
                <option></option>
                {
                  ANIMALS.map((animal => {
                    return <option key={animal} value={animal}>{animal}</option>
                  })) 
                }
            </select>
          </label>
          <label>
          Breed
            <select value={breed} onBlur={updateBreed} onChange={updateBreed}>
              <option></option>
              {
                breeds.map((breed => {
                  return <option value={breed} key={breed}>{breed}</option>
                }))
              }
            </select>
          </label>
            <label htmlFor="theme">
              Theme 
              <select value={theme}
              onChange={e => setTheme(e.target.value)}
              onBlur={e => setTheme(e.target.value)}
              >
              <option value="darkblue">Dark Blue</option>
              <option value="peru">Peru</option>
              <option value="red">Red</option>
              <option value="pink">Pink</option>
              </select>
            </label>
            <button style={{backgroundColor:theme}}>Submit</button>
        </form>
        <Result pets={pets} />
      </div>
    );
  };
  
  export default SearchParams;