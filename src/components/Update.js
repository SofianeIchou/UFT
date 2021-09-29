import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom'

function Update() {
    const location = useLocation()
    const { data, actor } = location.state
    const [name, setName] = useState(data.original_title)
    const [date, setDate] = useState(data.release_date)
    const [genre, setGenre] = useState(data.genres)
    const [actors, setActor] = useState(actor)
    const [updateGenre, setUpdateGenre] = useState([])
    const [updateActor, setUpdateActors] = useState([])
    const updateFieldChanged = (index) => e => {
        let newArr = [...genre]
        newArr[index].id = genre[index].id
        newArr[index].name = e.target.value
      
        setUpdateGenre(newArr); 
      }

    const updateChanged = (index) => e => {
        let newArr = [...actors]
        newArr[index].name = e.target.value
      
        setUpdateActors(newArr); 
      }  
    
    useEffect(() => {
        data.genres = updateGenre
        data.actors = updateActor
        console.log(data)
    }, [updateGenre, updateActor])

  return (
    <div>
        <p>page update</p>
        <input type="text" onChange={(e) => {setName(e.target.value);data.original_title = e.target.value }} value={name}/>
        <input type="text" onChange={(e) => {setDate(e.target.value);data.release_date = e.target.value }} value={date}/>
        
        <div>
            <h1>Genre</h1>
                {genre && genre.map((el,i) => 
                        
                        <input type="text" name="name" value={genre.name} onChange={updateFieldChanged(i)}  />
                        
                        )} 
        </div>
        <div>
            <h1>Acteur</h1>
                {actors && actors.map((el,i) => 
                        
                        <input type="text" name="name" value={actors.name} onChange={updateChanged(i)}  />
                        
                        )} 
        </div>
        <Link to={{
    pathname: `/about/${data.id}`,
    state: { data: data, acteur: actors}
  }}>Modifier les informations</Link>
    </div>
  );
}
export default Update;
