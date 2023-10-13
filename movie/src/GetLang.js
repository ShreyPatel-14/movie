import { useState } from 'react'
import React from 'react'
import { useParams,Link } from 'react-router-dom'
import axios from 'axios' 
import './card.css'

const GetLang = () => {
    const [movielist, setMovielist] = useState([])
    const [tvlist, setTvlist] = useState([])
const params=useParams()

axios
    .get(`https://api.themoviedb.org/3/discover/movie?&api_key=c8c3756e312fabeb5d1802af7f1f2510&with_original_language=${params.lang}`)
    .then((response) => {
        setMovielist(response.data.results);
    })
    .catch((error) => {
        console.error(error);
    })

axios
    .get(`https://api.themoviedb.org/3/discover/tv?&api_key=c8c3756e312fabeb5d1802af7f1f2510&with_original_language=${params.lang}`)
    .then((response) => {
        setTvlist(response.data.results);
    })
    .catch((error) => {
        console.error(error);
    })

    return (
        <>
        <div className='d-flex'>
        {
          movielist.map((e) => {
            return (<>
              <Link
                to={`/movies/movie/${e.id}`}
                style={{ textDecoration: "none" }}
                key={e.id}
              >
                <div className="container_card" key={e.id}>
                  <div>
                    <img className='cardimg' src={
                      `https://image.tmdb.org/t/p/w500/` + e.poster_path
                    } alt="none" />
                  </div>
                  <div className="dets">
                    <h3>{e.title}</h3>
                    <h6>1hr 45min <br/>{e.vote_average}</h6>
                    <p>{e.overview.slice(0, 150) + "..."}</p>
                    <button><i className="fa fa-plus"></i> add to watch list</button>
                  </div>
                </div>

              </Link>
            </>);
          })
        }
      </div>
      <div className='d-flex'>
        {
          tvlist.map((e) => {
            return (<>
              <Link
                to={`/movies/tv/${e.id}`}
                style={{ textDecoration: "none" }}
                key={e.id}
              >
                <div className="container_card" key={e.id}>
                  <div>
                    <img className='cardimg' src={
                      `https://image.tmdb.org/t/p/w500/` + e.poster_path
                    } alt="none" />
                  </div>
                  <div className="dets">
                    <h3>{e.name}</h3>
                    <h6>1hr 45min <br/>{e.vote_average}</h6>
                    <p>{e.overview.slice(0, 150) + "..."}</p>
                    <button><i className="fa fa-plus"></i> add to watch list</button>
                  </div>
                </div>

              </Link>
            </>);
          })
        }
      </div>
        </>
    )
}

export default GetLang;