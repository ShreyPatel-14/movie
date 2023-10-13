import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./card.css";
import StarIcon from "@mui/icons-material/Star";
import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";

function Watchlist() {
  const [line, setLine] = useState("");
  const [line1, setLine1] = useState("There is no data in your Watchlist");
  const [line2, setLine2] = useState("There is no data in your Favorites");
  const [newarr, setNewarr] = useState([]);
  const [addlist, setAddlist] = useState([]);
  const [personlist, setPersonlist] = useState([]);
  const fetchdata = async () => {
    try {
      const usermail = localStorage.getItem("moviemail");
      let result = await fetch("http://localhost:5000/getdata", {
        method: "post",
        body: JSON.stringify({ usermail }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      
      if (result.nodata) {
        setLine(result.nodata);
      } 
      else if (result.watchlist) 
      {
        for (var i of result.watchlist) {
          if (i.media_type === "person") {
            axios
              .get(
                `https://api.themoviedb.org/3/${i.media_type}/${i.id}?api_key=c8c3756e312fabeb5d1802af7f1f2510&append_to_response=credits`
              )
              .then((response) => {
                setPersonlist((personlist) => [...personlist, response.data]);
              })
              .catch((error) => {
                console.error(error);
              });
          } else {
            axios
              .get(
                `https://api.themoviedb.org/3/${i.media_type}/${i.id}?api_key=c8c3756e312fabeb5d1802af7f1f2510&append_to_response=credits`
              )
              .then((response) => {
                setNewarr((newarr) => [...newarr, response.data]);
              })
              .catch((error) => {
                console.error(error);
              });
          }
        }
      }
    } catch (error) {
      console.error("Error :", error);
    }
  };

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
    fetchdata();
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
      setNewarr([]);
      setPersonlist([]);
      fetchdata();
      getInitialData();
    } catch (error) {
      console.error("Error :", error);
    }
  };

  return (
    <div className="homedata">
      <div className="movies container">
        {line ? (
          <h2 className="heading4">{line}</h2>
        ) : (
          <>
            <h1 className="heading4">Your Watchlist</h1>

            <div>
              {newarr.length === 0 ? (
                <>
                  <h2 className="heading4">{line1}</h2>
                </>
              ) : (
                <div className="row_item">
                  {newarr
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
                      {
                        console.log("the type is", e.media_type);
                      }
                      return (
                        <>
                          <Link
                            to={`/movies/${e.title ? "movie" : "tv"}/${e.id}`}
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
                                <h6>
                                  {e.release_date && e.release_date.slice(0, 4)}
                                </h6>
                                <p>
                                  {e.overview &&
                                    e.overview.slice(0, 150) + "..."}
                                </p>
                                {e.vote_average && (
                                  <Link
                                    to="/watchlist"
                                    onClick={() => {
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
              )}
            </div>
            <br></br>
            <br></br>
            <h1 className="heading4">Your Favorites</h1>
            <div>
              {personlist.length === 0 ? (
                <>
                  <h2 className="heading4">{line2}</h2>
                </>
              ) : (
                <div className="row_item">
                  {personlist
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
                      {
                        console.log("the type is", e.media_type);
                      }
                      return (
                        <>
                          <Link
                            to={`/person/person/${e.id}`}
                            style={{ textDecoration: "none" }}
                            key={e.id}
                          >
                            <div className="container_card" key={e.id}>
                              <div>
                                <img
                                  className="cardimg"
                                  src={
                                    `https://image.tmdb.org/t/p/w500/` +
                                    e.profile_path
                                  }
                                  alt="none"
                                />
                              </div>
                              <div className="dets">
                                <h3>{e.title ? e.title : e.name}</h3>

                                <Link
                                  to="/watchlist"
                                  onClick={() => {
                                    storeAll(e.id, "person");
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
                              </div>
                            </div>
                          </Link>
                        </>
                      );
                    })}
                </div>
              )}
            </div>
          </>
        )}
      </div>
      <br></br>
      <br></br>
    </div>
  );
}

export default Watchlist;
