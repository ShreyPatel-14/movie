
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";
import FilterIcon from "@mui/icons-material/Filter";

import "./App.css";
import "./person.css";

function Movie(props) {
  var [obj, setObj] = useState({});
  var [rec, setRec] = useState([]);
  const [vid, setVid] = useState([]);
  const [cast, setCast] = useState([]);
  const [fcast, setFCast] = useState([]);
  const [dir, setDir] = useState([]);
  const [pro, setPro] = useState([]);
  const [img, setImg] = useState([]);
  const [addlist, setAddlist] = useState([]);

  const params = useParams();
  var url = `https://api.themoviedb.org/3/${params.media_type}/${params.id}?api_key=c8c3756e312fabeb5d1802af7f1f2510&append_to_response=credits`;
  var x = `https://api.themoviedb.org/3/${params.media_type}/${params.id}/recommendations?api_key=c8c3756e312fabeb5d1802af7f1f2510`;

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
        console.log("the added id", result.added_id);
      }
      console.warn(result);
      getInitialData();
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
        // console.log("got initial data!");
        setAddlist(result.datalist);
      }
      // console.warn(result);
    } catch (error) {
      console.error("Error :", error);
    }
  };

  useEffect(() => {
    getInitialData();
  }, []);

  axios
    .get(url)
    .then((response) => {
      setObj(response.data);
      setCast(
        response.data.credits.cast
          .slice(0, 20)
          .filter((e) => e.profile_path !== null)
      );
      setDir(response.data.credits.crew.filter((e) => e.job === "Director"));
      setPro(response.data.credits.crew.filter((e) => e.job === "Producer"));
    })
    .catch((error) => {
      console.error(error);
    });

  axios
    .get(x)
    .then((response) => {
      setRec(response.data.results);
    })
    .catch((error) => {
      console.error(error);
    });

  axios
    .get(
      `https://api.themoviedb.org/3/${params.media_type}/${params.id}/videos?api_key=c8c3756e312fabeb5d1802af7f1f2510`
    )
    .then((response) => {
      if (response.data.results.length > 0) {
        setVid(response.data.results[0].key);
      }
    })
    .catch((error) => {
      console.error(error);
    });

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/${params.media_type}/${params.id}/images?api_key=c8c3756e312fabeb5d1802af7f1f2510`
      )
      .then((response) => {
        if (response.data.results != []) {
          setImg(response.data.backdrops);
          console.log(response.data.backdrops);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [params.media_type,params.id]);

  return (
    <div className="homedata">
      <div className="movies container">
        <div class="heads">
        <h1>{obj.title ? obj.title : obj.name}</h1>
        <div className="rating"><StarIcon className="staricon"/><span>{obj.vote_average}</span></div>
        </div>
        <div className="main-person-card">
          <div className="card-1">
            <img
              src={`https://image.tmdb.org/t/p/w500/` + obj.poster_path}
              alt="images_poster"
              className="person-image"
            />
          </div>
          <div className="card-2">
            {vid.length !== 0 && (
              <iframe
                className="person-video"
                src={`https://www.youtube.com/embed/${vid}?autoplay=1&mute=1&playlist=${vid}&loop=1`}
              ></iframe>
            )}
          </div>
          <div className="buttons-2">
            <div
              className="d-flex flex-column btn-1"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FilterIcon className="person-icons" />
              <div className="inner-btn">Photos</div>

              <div
                className="modal fade"
                id="exampleModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-lg">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h3
                        className="modal-title"
                        id="exampleModalLabel"
                        style={{ marginLeft: "2.4%", color: "black" }}
                      >
                        Photos
                      </h3>
                      <button
                        type="button"
                        className="btn-close "
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        style={{ marginRight: "2%" }}
                      ></button>
                    </div>
                    <div className="modal-body">
                      <div className="row3">
                        {img.length !== 0 &&
                          img.map((e) => {
                            return (
                              <>
                                <a
                                  href={
                                    `https://image.tmdb.org/t/p/w500/` +
                                    e.file_path
                                  }
                                >
                                  <div className="column3" key={e.id}>
                                    <img
                                      src={
                                        `https://image.tmdb.org/t/p/w500/` +
                                        e.file_path
                                      }
                                      style={{
                                        marginRight: "5px",
                                        marginLeft: "5px",
                                        height: "150px",
                                        width: "250px",
                                        borderRadius: "8px",
                                      }}
                                      alt="images_poster"
                                    />
                                  </div>
                                </a>
                              </>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Link
              to={
                localStorage.getItem("movieicons")
                  ? `/movies/${params.media_type}/${params.id}`
                  : "/signin"
              }
              onClick={() => {
                localStorage.getItem("movieicons") &&
                  storeAll(
                    params.id,
                    params.media_type === "tv" ? "tv" : "movie"
                  );
              }}
              className="btn-1"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                className="d-flex flex-column"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {addlist.includes(parseInt(params.id)) ? (
                  <>
                    <DoneIcon className="person-icons" />
                    <span className="inner-btn">Added</span>
                  </>
                ) : (
                  <>
                    <AddIcon className="person-icons" />
                    <span className="inner-btn">Add to watch list</span>
                  </>
                )}
              </div>
            </Link>
          </div>
        </div>
        <br></br>
        <br></br>
        <div className="details">
          {dir.length !== 0 && (
            <div>
              <p className="born">
                <span>Directors:</span>
                {dir.map((e) => {
                  return (
                    <Link
                      to={`/person/person/${e.id}`}
                      style={{ textDecoration: "none", color: "white" }}
                      key={e.id}
                    >
                      <>{e.name}, </>
                    </Link>
                  );
                })}
              </p>
              <hr></hr>
            </div>
          )}
          {obj.genres && (
            <div>
              <p className="born">
                <span>Genres:</span>{" "}
                {obj.genres.map((e) => {
                  return <>{e.name}, </>;
                })}
              </p>
              <hr></hr>
            </div>
          )}

          {pro.genres && (
            <div>
              <p className="born">
                <span>Producers:</span>{" "}
                {pro.map((e) => {
                  return <>{e.name}, </>;
                })}
              </p>
              <hr></hr>
            </div>
          )}

          {obj.runtime && (
            <div>
              <p className="born">
                <span>Runtime:</span> {obj.runtime} min
              </p>
              <hr></hr>
            </div>
          )}
          {obj.episode_run_time && obj.episode_run_time.length!==0 && (
            <div>
              <p className="born">
                <span>Episode Runtime:</span> {obj.episode_run_time} min
              </p>
              <hr></hr>
            </div>
          )}
          {obj.release_date ? (
            <div>
              <p className="born">
                <span>Release Date:</span>{" "}
                {new Date(obj.release_date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
              <hr></hr>
            </div>
          ) : (
            <div>
              <p className="born">
                <span>Release Date:</span> 
                {new Date(obj.first_air_date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
              <hr></hr>
            </div>
          )}
        </div>

        <h2 className="heading4">Cast</h2>

        {cast.length !== 0 && (
          <div class="cast">
            {cast.length !== 0 &&
              cast.map((e) => {
                return (
                  <div className="d-flex">
                    <div className="svg">
                      <Link
                        to={`/person/person/${e.id}`}
                        style={{ textDecoration: "none" }}
                        key={e.id}
                      >
                        <img
                          src={
                            `https://image.tmdb.org/t/p/w500/` + e.profile_path
                          }
                          style={{
                            height: "100px",
                            width: "100px",
                            objectFit: "cover",
                          }}
                          alt="images_poster"
                        />
                      </Link>
                    </div>
                    <div className="flex-column Amargin">
                      <div className="Sname">{e.character}</div>

                      <Link
                        to={`/person/person/${e.id}`}
                        style={{ textDecoration: "none" }}
                        key={e.id}
                      >
                        <div className="Sdetail">{e.name}</div>
                      </Link>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
        
        {obj.overview && (
          <div className="heading4">
            <hr style={{marginTop:'20px'}}></hr>
            <h2 style={{marginTop:'20px',marginBottom:'20px'}}>Storyline</h2>
            <p className="biography">{obj.overview}</p>
          </div>
        )}
        <hr className="heading4" style={{marginTop:'20px'}}></hr>
        {rec.length ? <h2 className="heading4" style={{marginBottom:'20px'}}>More Like This</h2> : ""}
        
        <div className="container">
          <div className="row_item">
            {rec ? (
              rec
                .slice(0, rec.length - 1)
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
                        to={
                          e.media_type === "person"
                            ? `/person/${e.media_type}/${e.id}`
                            : `/movies/${e.title ? "movie" : "tv"}/${e.id}`
                        }
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
                              {e.overview && e.overview.slice(0, 150) + "..."}
                            </p>
                            { (
                              <Link
                                to={
                                  localStorage.getItem("movieicons")
                                    ? `/movies/${params.media_type}/${params.id}`
                                    : "/signin"
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
            ) : (
              <>
                <h1>No results found</h1>
              </>
            )}
          </div>
        </div>
        <br></br>
        <br></br>
      </div>
    </div>
  );
}

export default Movie;
