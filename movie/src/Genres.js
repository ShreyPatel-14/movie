import { useState,useEffect } from 'react'
import React from 'react'
import { useParams,Link } from 'react-router-dom'
import axios from 'axios' 
import './card.css'
import StarIcon from "@mui/icons-material/Star";
import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";

const Genres = () => {
  const [movielist, setMovielist] = useState([]);
  const [tvlist, setTvlist] = useState([]);
  const [Finallist, setFinallist] = useState([]);
  const [title,setTitle] = useState('')
  const params = useParams();
  const [addlist, setAddlist] = useState([]);

  var gen = [
    {
      movie_id: 878,
      tv_id: 10765,
      name: "Sci-Fi",
      pic: "https://img10.hotstar.com/image/upload/f_auto,q_90,w_1920/sources/r1/cms/prod/5259/1535259-a-6e0b7daffb29",
    },
    {
      movie_id: 9648,
      tv_id: 9648,
      name: "Mystery",
      pic: "https://img10.hotstar.com/image/upload/f_auto,q_90,w_1920/sources/r1/cms/prod/5269/1535269-a-e0ed0b72ebe7",
    },
    {
      movie_id: 10751,
      tv_id: 10751,
      name: "Family",
      pic: "https://img10.hotstar.com/image/upload/f_auto,q_90,w_1920/sources/r1/cms/prod/5284/1535284-a-656c6b45a905",
    },
    {
      movie_id: 18,
      tv_id: 18,
      name: "Drama",
      pic: "https://img10.hotstar.com/image/upload/f_auto,q_90,w_1920/sources/r1/cms/prod/5285/1535285-a-88035ca1ae69",
    },
    {
      movie_id: 99,
      tv_id: 99,
      name: "Documentary",
      pic: "https://img10.hotstar.com/image/upload/f_auto,q_90,w_1920/sources/r1/cms/prod/5286/1535286-a-f282f00643b5",
    },
    {
      movie_id: 80,
      tv_id: 80,
      name: "Crime",
      pic: "https://img10.hotstar.com/image/upload/f_auto,q_90,w_1920/sources/r1/cms/prod/5288/1535288-a-690bac400aa1",
    },
    {
      movie_id: 35,
      tv_id: 35,
      name: "Comedy",
      pic: "https://img10.hotstar.com/image/upload/f_auto,q_90,w_1920/sources/r1/cms/prod/5292/1535292-a-5739f9c84b63",
    },
    {
      movie_id: 16,
      tv_id: 16,
      name: "Animation",
      pic: "https://img10.hotstar.com/image/upload/f_auto,q_90,w_1920/sources/r1/cms/prod/5299/1535299-a-e6296badeb14",
    },
    {
      movie_id: 28,
      tv_id: 10759,
      name: "Adventure",
      pic: "https://img10.hotstar.com/image/upload/f_auto,q_90,w_1920/sources/r1/cms/prod/5301/1535301-a-9bb68bcd147c",
    },
  ];
  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/discover/movie?&api_key=c8c3756e312fabeb5d1802af7f1f2510&with_genres=${params.movie_id}`)
      .then((response) => {
        setMovielist(response.data.results);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get(`https://api.themoviedb.org/3/discover/tv?&api_key=c8c3756e312fabeb5d1802af7f1f2510&with_genres=${params.tv_id}`)
      .then((response) => {
        setTvlist(response.data.results);
      })
      .catch((error) => {
        console.error(error);
      });

      for(var i of gen)
    {
      if(i.movie_id === parseInt(params.movie_id))
      {
        setTitle(i.name)
        break;
      }
    }
  }, [params.id]);

  useEffect(() => {
    function shuffle(array) {
      return array.sort(() => Math.random() - 0.5);
    }
    const Flist = movielist.concat(tvlist);
    setFinallist(shuffle(Flist));
  }, [movielist, tvlist]);

  const getInitialData = async () => {
    try {
      const usermail = localStorage.getItem("moviemail");
      let result = await fetch("http://localhost:5000/initialdata", {
        method: "post",
        body: JSON.stringify({ usermail }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      if (result.message) {
        console.log("got initial data!");
        setAddlist(result.datalist);
      }
      console.warn(result);
    } catch (error) {
      console.error("Error :", error);
    }
  };
  
  useEffect(() => {
    getInitialData();
  }, []);

  const storeAll = async (id, media_type) => {
    try {
      console.log(id);
      console.log(media_type);
      const usermail = localStorage.getItem("moviemail");
      let result = await fetch("http://localhost:5000/watchlist", {
        method: "post",
        body: JSON.stringify({ media_type, id, usermail }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      if (result.removedmovie) {
        console.log(result.removedmovie);
      } else if (result.message) {
        console.log("movie added");
        setAddlist([...addlist, result.added_id]);
      }
      console.warn(result);
      getInitialData();
    } catch (error) {
      console.error("Error :", error);
    }
  };

    return (
        <div className='homedata'>
      <div className="movies container">
          <h1 className='heading4'>{ title } Movies & TV Shows</h1>
          <div className="row_item">
            {
              Finallist
                .filter((v) => {
                  if (
                    v.poster_path === null ||
                    v.profile_path === null ||
                    v.overview === "" ||
                    v.vote_average === 0.0
                  ) {
                    return false;
                  } else {
                    return true;
                  }
                })
                .map((e) => {
                  return (
                    <>
                      <Link
                        to={`/movies/${e.title ? 'movie' : 'tv'}/${e.id}`}
                        style={{ textDecoration: "none" }}
                        key={e.id}
                      >
                        <div className="container_card" key={e.id}>
                          <div>
                            <img
                              className="cardimg"
                              src={
                                `https://image.tmdb.org/t/p/w500/` + e.poster_path
                              }
                              alt="none"
                            />
                          </div>
                          <div className="dets">
                            <h3>{e.title ? e.title : e.name}</h3>
                            {e.vote_average && (
                              <h5>
                                <StarIcon className="i" />
                                <span>
                                  <span>{e.vote_average}</span>
                                </span>
                              </h5>
                            )}
                            <h6>
                              {e.release_date && e.release_date.slice(0, 4)}
                            </h6>
                            <p>
                              {e.overview && e.overview.slice(0, 150) + "..."}
                            </p>
                            {e.vote_average && (
                              <Link
                              to={
                                localStorage.getItem("movieicons") ? `/genres/${params.movie_id}/${params.tv_id}` : "/signin"
                              }
                              onClick={() => {
                                localStorage.getItem("movieicons") &&
                                  storeAll(e.id, e.title ? "movie" : "tv");
                              }}
                            >
                              {addlist.includes(e.id) ? (
                                <button className="watch-button">
                                  <DoneIcon className="watch-icons" />
                                  <span>Added</span>
                                </button>
                              ) : (
                                <button className="watch-button">
                                  <AddIcon className="watch-icons" />
                                  <span>Add to Watch list</span>
                                </button>
                              )}
                            </Link>
                            )}
                          </div>
                        </div>
                      </Link>
                    </>
                  );
                })
                }
          </div>
      </div>
        </div>
    )
}

export default Genres