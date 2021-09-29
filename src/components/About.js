import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom'


function About(props) {
    const location = useLocation()
    const getId = window.location.pathname.split('/')[2]
    const [movie, setMovie] = useState([])
    const [actor, setActor] = useState([])
    const getMovie =  () => {
        axios.get(`https://api.themoviedb.org/3/movie/${getId}`, {params:{'api_key':'532e067f3cd2bdf065f3cc7fc5557c09'}}).then((res) => {
            setMovie(res.data)
        }).catch((error) => {
            console.log(error)
        })
        
    }
    const getActor =  () => {
        axios.get(`https://api.themoviedb.org/3/movie/${getId}/credits`, {params:{'api_key':'532e067f3cd2bdf065f3cc7fc5557c09'}}).then((res) => {
            setActor(res.data.cast)
            
        }).catch((error) => {
            console.log(error)
        })
        
    }
    useEffect(() => {
        if(location.state && location.state.data){
            location && location.state && setMovie(location.state.data)}
            
        else{
            getMovie()
            
        }
        if(location.state && location.state.acteur){
            location && location.state && setActor(location.state.acteur)}
            
        else{
            getActor()
            
        }    
         

        
    },[])
    console.log(actor)
  return (
    <div>
        <p>About</p>
        
        
            <div>
                <img src={`https://themoviedb.org/t/p/w220_and_h330_face/${movie.poster_path}`}/>
                <Link to={{
    pathname: "/update",
    state: { data: movie, actor}
  }}>Modifier les informations</Link>
                <p>Titre : {movie.original_title}</p>       
                <p>Date De Sortie : {movie.release_date}</p>


            <h4>genre</h4>
            {movie && movie.genres && movie.genres.map((el,i) => 
                
                <p> - {el.name} </p>  
                  
                )} 
            <h4>Acteur</h4>  
            {actor &&  actor.map((el,i) => 
                
                <p> - {el.name} </p>  
                  
                )}             
            </div>
    </div>
  );
}
export default About;
