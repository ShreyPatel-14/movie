import { useState, useEffect } from "react";
import React from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./card.css";
import StarIcon from "@mui/icons-material/Star";
import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";

const Languages = () => {
  const [movielist, setMovielist] = useState([]);
  const [tvlist, setTvlist] = useState([]);
  const [Finallist, setFinallist] = useState([]);
  const [title,setTitle] = useState('')
  const params = useParams();
  const [addlist, setAddlist] = useState([]);

  var lang = [
    {
      name: "Hindi",
      id: "hi",
      pic: "https://img10.hotstar.com/image/upload/f_auto,q_90,w_1920/sources/r1/cms/prod/6661/1526661-a-00b818b5bc0e",
    },
    {
      name: "English",
      id: "en",
      pic: "https://img10.hotstar.com/image/upload/f_auto,q_90,w_1920/sources/r1/cms/prod/6660/1526660-a-afdd1ecfd8ae",
    },
    {
      name: "Bengali",
      id: "bn",
      pic: "https://img10.hotstar.com/image/upload/f_auto,q_90,w_1920/sources/r1/cms/prod/6659/1526659-a-7271cf19114e",
    },
    {
      name: "Tamil",
      id: "ta",
      pic: "https://img10.hotstar.com/image/upload/f_auto,q_90,w_1920/sources/r1/cms/prod/6682/1526682-a-fd4e220ba563",
    },
    {
      name: "Kannada",
      id: "kn",
      pic: "https://img10.hotstar.com/image/upload/f_auto,q_90,w_1920/sources/r1/cms/prod/6669/1526669-a-76efd0c306cd",
    },
    {
      name: "Telugu",
      id: "te",
      pic: "https://img10.hotstar.com/image/upload/f_auto,q_90,w_1920/sources/r1/cms/prod/6685/1526685-a-5f5995a53f61",
    },
    {
      name: "Malayalam",
      id: "ml",
      pic: "https://img10.hotstar.com/image/upload/f_auto,q_90,w_1920/sources/r1/cms/prod/6672/1526672-a-eafe6913c6c8",
    },
    {
      name: "Marathi",
      id: "mr",
      pic: "https://img10.hotstar.com/image/upload/f_auto,q_90,w_1920/sources/r1/cms/prod/6674/1526674-a-fdd5233a7699",
    },
    {
      name: "Japanese",
      id: "ja",
      pic: "https://img10.hotstar.com/image/upload/f_auto,q_90,w_1920/sources/r1/cms/prod/6668/1526668-a-ed367d61302a",
    },
    {
      name: "Korean",
      id: "ko",
      pic: "https://img10.hotstar.com/image/upload/f_auto,q_90,w_1920/sources/r1/cms/prod/6670/1526670-a-ec8fb58a5fb8",
    },
  ];
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?&api_key=c8c3756e312fabeb5d1802af7f1f2510&with_original_language=${params.lang}`
      )
      .then((response) => {
        setMovielist(response.data.results);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get(
        `https://api.themoviedb.org/3/discover/tv?&api_key=c8c3756e312fabeb5d1802af7f1f2510&with_original_language=${params.lang}`
      )
      .then((response) => {
        setTvlist(response.data.results);
      })
      .catch((error) => {
        console.error(error);
      });
      for(var i of lang)
    {
      if(i.id === params.lang)
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
    <div className="homedata">
      <div className="movies container">
      <h1 className='heading4'>{ title } Movies & TV Shows</h1>
        <div className="row_item">
          {Finallist.filter((val) => {
            if (val.poster_path === null) {
              return false;
            } else {
              return true;
            }
          }).map((e) => {
            return (
              <>
                
                <Link
                  to={`/movies/${e.title ? `movie` : `tv`}/${e.id}`}
                  style={{ textDecoration: "none" }}
                  key={e.id}
                >
                  <div className="container_card" key={e.id}>
                    <div>
                      <img
                        className="cardimg"
                        src={
                          `https://image.tmdb.org/t/p/w500/` +
                          (e.media_type === "person"
                            ? e.profile_path
                            : e.poster_path)
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
                      <h6>{e.release_date && e.release_date.slice(0, 4)}</h6>
                      <p>{e.overview && e.overview.slice(0, 150) + "..."}</p>
                      {e.vote_average && (
                        <Link
                        to={
                          localStorage.getItem("movieicons") ? `/languages/${params.lang}` : "/signin"
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
          })}
        </div>
      </div>
    </div>
  );
};

export default Languages;
