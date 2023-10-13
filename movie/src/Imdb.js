import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./imdb.css";
import "./card.css";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "./Spinner";
import StarIcon from "@mui/icons-material/Star";
import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";
import Nodata from './No data-cuate.png'

function Imdb(props) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [flag, setFlag] = useState(true);
  const [addlist, setAddlist] = useState([]);

  if (page === 1) {
    axios
      .get(
        `https://api.themoviedb.org/3/search/multi?query=${props.text}&api_key=c8c3756e312fabeb5d1802af7f1f2510`
      )
      .then((response) => {
        setList(response.data.results);
        console.log(response.data.results.length);
        if (response.data.results.length < 20) {
          console.log("hii");
          setFlag(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    setList([]);
    setPage(1);
    setFlag(true);
  }, [props.text]);
  const fetchMoreData = () => {
    let link_url = `https://api.themoviedb.org/3/search/movie?query=${props.text
      }&api_key=c8c3756e312fabeb5d1802af7f1f2510&page=${page + 1}`;
    setLoading(true);
    axios
      .get(link_url)
      .then((response) => {
        if (response.data.results.length === 0) {
          setFlag(false);
        }
        setList(list.concat(response.data.results));
      })
      .catch((error) => {
        console.log(error);
      });
    setPage(page + 1);
    setLoading(false);
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
      {list.length == 0 && <div style={{ display: "flex",flexDirection:"column", justifyContent: 'center', alignItems: 'center', height: '800px' }}><img style={{ height: '500px', width: "500px" }} src={Nodata}></img>
      <h1 style={{color:'white'}}>No Results Found</h1>
      </div>}
      <div className="movies container">
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={list.length}
          next={fetchMoreData}
          hasMore={flag}
          loader={<Spinner />}
        >
          <div className="row_item">

            {list ?
              list
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
                            {e.vote_average && (
                              <Link
                                to={
                                  localStorage.getItem("movieicons") ? "/" : "/signin"
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
                }) : <>
                <h1>No results found</h1>
              </>}
          </div>
        </InfiniteScroll>
      </div>
      <br></br>
      <br></br>
    </div>

  );
}

export default Imdb;
