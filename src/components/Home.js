import axios from 'axios';
import { useEffect, useState } from 'react';
import Pagination from "react-js-pagination";
import { Link } from 'react-router-dom';


function Home() {
    const [allMovies, setAllMovies] = useState([])
    const [pageNumber, setPageNumber] = useState(1)
    const getAllMovies =  (numberPage) => {
        axios.get('https://api.themoviedb.org/3/movie/popular', {params:{'api_key':'532e067f3cd2bdf065f3cc7fc5557c09', page: numberPage}}).then((res) => {
            setAllMovies(res.data.results)
        }).catch((error) => {
            console.log(error)
        })
        
    }
    useEffect(() => {
        getAllMovies(pageNumber)
    },[pageNumber])
    console.log(allMovies)
  return (
    <div>
        <p>Homes</p>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Titre</th>
                    <th scope="col">Affiche</th>
                    <th scope="col">En savoir plus</th>  
                </tr>
            </thead>

        
                {allMovies && allMovies.map((el,i) => 
                <tr>
                    <th scope="row">{el.original_title} </th>
                    <td><img src={`https://themoviedb.org/t/p/w220_and_h330_face/${el.poster_path}`}/></td>
                    <td><Link to={`about/${el.id}`}>En savoir plus</Link> </td>
                </tr>
                      
                  
                )}
        </table>
        <Pagination
          activePage={pageNumber}
          itemsCountPerPage={20}
          totalItemsCount={10000}
          pageRangeDisplayed={10}
          onChange={(el) => setPageNumber(el)}
        />
    </div>
  );
}
export default Home;
