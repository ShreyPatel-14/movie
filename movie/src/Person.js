import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import StarIcon from "@mui/icons-material/Star";
import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";
import FilterIcon from '@mui/icons-material/Filter';
import "./person.css";
function Person() {
  const params = useParams();
  const [list, setList] = useState([]);
  const [tv, setTv] = useState([]);
  const [mov, setMov] = useState([]);
  const [img, setImg] = useState([]);
  const [vid, setVid] = useState([]);
  const [flag, setFlag] = useState(0);
  const [oid, setOid] = useState("movie");
  const [addlist, setAddlist] = useState([]);

  const allList = [
    {
      id: "movie",
      name: "Movies",
    },
    {
      id: "tv",
      name: "TV Shows",
    },
  ];
  var namei = allList[0].id;
  //detail
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/person/${params.id}?&api_key=c8c3756e312fabeb5d1802af7f1f2510`
      )
      .then((response) => {
        setList(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get(
        `https://api.themoviedb.org/3/person/${params.id}/${oid}_credits?&api_key=c8c3756e312fabeb5d1802af7f1f2510`
      )
      .then((response) => {
        setTv(response.data.cast);
      })
      .catch((error) => {
        console.error(error);
      });

    // Movies
    axios
      .get(
        `https://api.themoviedb.org/3/person/${params.id}/movie_credits?&api_key=c8c3756e312fabeb5d1802af7f1f2510`
      )
      .then((response) => {
        setMov(response.data.cast);
        // console.log(response.data.cast)
      })
      .catch((error) => {
        console.error(error);
      });

    //Images
    axios
      .get(
        `https://api.themoviedb.org/3/person/${params.id}/images?api_key=c8c3756e312fabeb5d1802af7f1f2510`
      )
      .then((response) => {
        setImg(response.data.profiles);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/person/${params.id}/${oid}_credits?&api_key=c8c3756e312fabeb5d1802af7f1f2510`
      )
      .then((response) => {
        setTv(response.data.cast);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [oid]);

  useEffect(() => {
    var f = 0;
    const video = async () => {
      for (let i = 0; i <= mov.length; i++) {
        // console.log(mov)
        await axios
          .get(
            `https://api.themoviedb.org/3/movie/${mov[i].id}/videos?api_key=c8c3756e312fabeb5d1802af7f1f2510`
          )
          .then((response) => {
            if (response.data.results.length > 0) {
              setVid(response.data.results[0].key);
              console.log(response.data.results[0].key);
              console.log("hi");
              f = 1;
              console.log(f);
            }
          })
          .catch((error) => {
            console.error(error);
          });
        console.log(f);
        if (f === 1) {
          console.log("break");
          break;
        }
      }
    };
    if (mov.length != 0) {
      video();
    }
  }, [mov]);

  const getInitialData = async () => {
    try {
      const usermail = localStorage.getItem("moviemail");
      let result = await fetch("https://movie-backend-3omk.onrender.com/initialdata", {
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
      let result = await fetch("https://movie-backend-3omk.onrender.com/watchlist", {
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
  return (
    <div className="homedata">
      <div className="container movies">
        <h1 style={{ marginBottom: "20px",marginLeft:'12px' }}>{list.name}</h1>
        <div className="main-person-card">
          <div className="card-1">
            <img
              src={`https://image.tmdb.org/t/p/w500/` + list.profile_path}
              
              alt="images_poster"
              className="person-image"
            />
          </div>
          <div className="card-2">
            {vid.length != 0 && (
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
              <FilterIcon className="person-icons"/>
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
                        style={{ marginLeft: "2.4%",color:'black' }}
                      >
                        Photos
                      </h3>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        style={{ marginRight: "2%" }}
                      ></button>
                    </div>
                    <div className="modal-body">
                      <div className="row3">
                        {img.map((e) => {
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
                                      height: "280px",
                                      width: "200px",
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
                  ? `/person/${params.media_type}/${params.id}`
                  : "/signin"
              }
              onClick={() => {
                localStorage.getItem("movieicons") &&
                  storeAll(params.id, "person");
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
        <div className="details">
          <p className="biography">{list.biography}</p>
          <hr></hr>
          <p className="born">
            <span>Born:</span>{" "}
            {new Date(list.birthday).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
          <hr></hr>
          <p className="pob"><span>Place of Birth:</span> {list.place_of_birth}</p>
          <hr></hr>
        </div>
        <div>
          <div>
            <ul className="nav nav-pills row navtypes">
              {allList.map((e) => {
                return (
                  <>
                    <li
                      className="nav-item col-sm"
                      onClick={() => {
                        setOid(e.id);
                      }}
                      style={{display:'flex',justifyContent:'center'}}
                    >
                      <a
                        className={`back_hov nav-link text-center items ${
                          namei === e.id ? "active" : ""
                        }`}
                        data-bs-toggle="pill"
                        href="#demo3"
                        
                      >
                        <div className="inside">{e.name}</div>
                      </a>
                    </li>
                  </>
                );
              })}
            </ul>
          </div>
          <div className="row1_item">
            {tv &&
              tv
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
                        to={`/movies/${oid}/${e.id}`}
                        style={{ textDecoration: "none" }}
                        key={e.id}
                      >
                        <div className="container_card" key={e.id}>
                          <div>
                            <img
                              className="cardimg"
                              src={
                                `https://image.tmdb.org/t/p/w500/` +
                                e.poster_path
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
                                localStorage.getItem("movieicons")
                                  ? `/person/${params.media_type}/${params.id}`
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
                })}
          </div>
        </div>
      </div>
      <br></br>
      <br></br>
    </div>
  );
}
export default Person;
