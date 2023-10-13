import { useState } from 'react'
import React from 'react'
import { useParams,Link } from 'react-router-dom'
import axios from 'axios' 


const Genres = () => {
    const [glist, setGlist] = useState([])
const params=useParams()

axios
    .get(`https://api.themoviedb.org/3/discover/${params.media_type}?&api_key=c8c3756e312fabeb5d1802af7f1f2510&with_genres=${params.id}`)
    .then((response) => {
        setGlist(response.data.results);
    })
    .catch((error) => {
        console.error(error);
    })
    return (
        <>
        <div className='d-flex'>
        {
            glist.map((v) => {
                return (
                  <>
                    <Link
                      to={`/movies/${params.media_type}/${v.id}`}
                      style={{ textDecoration: "none" }}
                      key={v.id}
                    >
                      <div
                        key={v.id}
                        className="card"
                      >
                        <img
                          src={
                            `https://image.tmdb.org/t/p/w500/` + (v.poster_path)
                          }
                          style={{ height: "250px", width: "200px" }}
                          alt="images_poster"
                        />
                        <div className="card-body">
                          <h5 className="card-title">{v.media_type==="movie"?v.title:v.name}</h5>
                          <p className="card-text">{v.overview}</p>
                          <p>{v.vote_average}</p>
                        </div>
                      </div>
                    </Link>
                  </>
                );
              })
        }
        </div>
        </>
    )
}

export default Genres