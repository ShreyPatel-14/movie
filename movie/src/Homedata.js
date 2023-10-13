import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./card.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import "./trial.scss";
import StarIcon from "@mui/icons-material/Star";
import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";

export const Homedata = () => {
  const [today, setToday] = useState([]);
  const [nowplaying, setNowplaying] = useState([]);
  const [rated, setrated] = useState([]);
  const [series, setSeries] = useState([]);
  const [oid, setOid] = useState(8);
  const [olist, setOlist] = useState([]);
  const [omlist, setOmlist] = useState([]);
  const [otlist, setOtlist] = useState([]);
  const [person, setPerson] = useState([]);
  const [addlist, setAddlist] = useState([]);
  const [words, setWords] = useState(300);
  var movie = [
    {
      id: 28,
      name: "Action",
      pic: "https://img10.hotstar.com/image/upload/f_auto,q_90,w_1920/sources/r1/cms/prod/5302/1535302-a-e90748391e0d",
    },
    {
      id: 12,
      name: "Adventure",
      pic: "https://img10.hotstar.com/image/upload/f_auto,q_90,w_1920/sources/r1/cms/prod/5301/1535301-a-9bb68bcd147c",
    },
    {
      id: 16,
      name: "Animation",
      pic: "https://img10.hotstar.com/image/upload/f_auto,q_90,w_1920/sources/r1/cms/prod/5299/1535299-a-e6296badeb14",
    },
    {
      id: 35,
      name: "Comedy",
      pic: "https://img10.hotstar.com/image/upload/f_auto,q_90,w_1920/sources/r1/cms/prod/5292/1535292-a-5739f9c84b63",
    },
    {
      id: 80,
      name: "Crime",
      pic: "https://img10.hotstar.com/image/upload/f_auto,q_90,w_1920/sources/r1/cms/prod/5288/1535288-a-690bac400aa1",
    },
    {
      id: 99,
      name: "Documentary",
      pic: "https://img10.hotstar.com/image/upload/f_auto,q_90,w_1920/sources/r1/cms/prod/5286/1535286-a-f282f00643b5",
    },
    {
      id: 18,
      name: "Drama",
      pic: "https://img10.hotstar.com/image/upload/f_auto,q_90,w_1920/sources/r1/cms/prod/5285/1535285-a-88035ca1ae69",
    },
    {
      id: 10751,
      name: "Family",
      pic: "https://img10.hotstar.com/image/upload/f_auto,q_90,w_1920/sources/r1/cms/prod/5284/1535284-a-656c6b45a905",
    },
    {
      id: 14,
      name: "Fantasy",
      pic: "https://img10.hotstar.com/image/upload/f_auto,q_90,w_1920/sources/r1/cms/prod/5282/1535282-a-ae97739962dc",
    },
    {
      id: 36,
      name: "History",
      pic: "https://img10.hotstar.com/image/upload/f_auto,q_90,w_1920/sources/r1/cms/prod/5280/1535280-a-a1d64ccd7457",
    },
    {
      id: 27,
      name: "Horror",
      pic: "https://img10.hotstar.com/image/upload/f_auto,q_90,w_1920/sources/r1/cms/prod/5279/1535279-a-c92b487cb711",
    },
    {
      id: 10402,
      name: "Music",
      pic: "https://img10.hotstar.com/image/upload/f_auto,q_90,w_1920/sources/r1/cms/prod/5270/1535270-a-6a85b09721ab",
    },
    {
      id: 9648,
      name: "Mystery",
      pic: "https://img10.hotstar.com/image/upload/f_auto,q_90,w_1920/sources/r1/cms/prod/5269/1535269-a-e0ed0b72ebe7",
    },
    {
      id: 10749,
      name: "Romance",
      pic: "https://img10.hotstar.com/image/upload/f_auto,q_90,w_1920/sources/r1/cms/prod/5262/1535262-a-fbabfaf1176e",
    },
    {
      id: 878,
      name: "Sci-Fi",
      pic: "https://img10.hotstar.com/image/upload/f_auto,q_90,w_1920/sources/r1/cms/prod/5259/1535259-a-6e0b7daffb29",
    },
    {
      id: 53,
      name: "Thriller",
      pic: "https://img10.hotstar.com/image/upload/f_auto,q_90,w_1920/sources/r1/cms/prod/5246/1535246-a-27373cc1a222",
    },
  ];

  // var tv = [
  //   {
  //     id: 10765,
  //     name: "Sci-Fi & Fantasy",
  //     pic: "https://img10.hotstar.com/image/upload/f_auto,q_90,w_1920/sources/r1/cms/prod/5259/1535259-a-6e0b7daffb29",
  //   },
  //   {
  //     id: 10764,
  //     name: "Reality",
  //     pic: "https://img10.hotstar.com/image/upload/f_auto,q_90,w_1920/sources/r1/cms/prod/5264/1535264-a-9e7871687c76",
  //   },
  //   {
  //     id: 9648,
  //     name: "Mystery",
  //     pic: "https://img10.hotstar.com/image/upload/f_auto,q_90,w_1920/sources/r1/cms/prod/5269/1535269-a-e0ed0b72ebe7",
  //   },
  //   {
  //     id: 10762,
  //     name: "Kids",
  //     pic: "https://img10.hotstar.com/image/upload/f_auto,q_90,w_1920/sources/r1/cms/prod/5278/1535278-a-e9dbbe66922b",
  //   },
  //   {
  //     id: 10751,
  //     name: "Family",
  //     pic: "https://img10.hotstar.com/image/upload/f_auto,q_90,w_1920/sources/r1/cms/prod/5284/1535284-a-656c6b45a905",
  //   },
  //   {
  //     id: 18,
  //     name: "Drama",
  //     pic: "https://img10.hotstar.com/image/upload/f_auto,q_90,w_1920/sources/r1/cms/prod/5285/1535285-a-88035ca1ae69",
  //   },
  //   {
  //     id: 99,
  //     name: "Documentary",
  //     pic: "https://img10.hotstar.com/image/upload/f_auto,q_90,w_1920/sources/r1/cms/prod/5286/1535286-a-f282f00643b5",
  //   },
  //   {
  //     id: 80,
  //     name: "Crime",
  //     pic: "https://img10.hotstar.com/image/upload/f_auto,q_90,w_1920/sources/r1/cms/prod/5288/1535288-a-690bac400aa1",
  //   },
  //   {
  //     id: 35,
  //     name: "Comedy",
  //     pic: "https://img10.hotstar.com/image/upload/f_auto,q_90,w_1920/sources/r1/cms/prod/5292/1535292-a-5739f9c84b63",
  //   },
  //   {
  //     id: 16,
  //     name: "Animation",
  //     pic: "https://img10.hotstar.com/image/upload/f_auto,q_90,w_1920/sources/r1/cms/prod/5299/1535299-a-e6296badeb14",
  //   },
  //   {
  //     id: 10759,
  //     name: "Action & Adventure",
  //     pic: "https://img10.hotstar.com/image/upload/f_auto,q_90,w_1920/sources/r1/cms/prod/5301/1535301-a-9bb68bcd147c",
  //   },
  // ];
  // var multi = [...movie, ...tv];

  // var lang = [
  //   {
  //     name: "Hindi",
  //     id: "hi",
  //   },
  //   {
  //     name: "English",
  //     id: "en",
  //   },
  //   {
  //     name: "Gujarati",
  //     id: "gu",
  //   },
  //   {
  //     name: "Bengali",
  //     id: "bn",
  //   },
  //   {
  //     name: "Tamil",
  //     id: "ta",
  //   },
  //   {
  //     name: "Kannada",
  //     id: "kn",
  //   },
  //   {
  //     name: "Telugu",
  //     id: "te",
  //   },
  //   {
  //     name: "Malayalam",
  //     id: "ml",
  //   },
  //   {
  //     name: "Marathi",
  //     id: "mr",
  //   },
  //   {
  //     name: "Japanese",
  //     id: "ja",
  //   },
  //   {
  //     name: "Korean",
  //     id: "ko",
  //   },
  // ];

  var ott = [
    {
      id: "8",
      name: "Netflix",
    },
    {
      id: "122",
      name: "Hotstar",
    },
    {
      id: "237",
      name: "Sony Liv",
    },
    {
      id: "119",
      name: "Prime video",
    },
    {
      id: "515",
      name: "MX Player",
    },
    {
      id: "220",
      name: "Jio Cinema",
    },
    {
      id: "121",
      name: "Voot",
    },
  ];

  var gen = [
    {
      movie_id: 878,
      tv_id: 10765,
      name: "Sci-Fi & Fantasy",
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
      name: "Action & Adventure",
      pic: "https://img10.hotstar.com/image/upload/f_auto,q_90,w_1920/sources/r1/cms/prod/5301/1535301-a-9bb68bcd147c",
    },
  ];

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
  var setCard_dict = {
    1210: {
      perPage: 4,
      perMove: 2,
    },
    994: {
      perPage: 3,
      perMove: 2,
    },
    765: {
      perPage: 2,
      perMove: 1,
    },
    460: {
      perPage: 1,
      perMove: 1,
      width: "80%",
      pagination: false,
    },
  };
  useEffect(() => {
    if (window.innerWidth <= 455) {
      setWords(100);
    } else {
      setWords(300);
    }
  }, [window.innerWidth]);

  var namei = ott[0].name;
  const fetchMovies = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=c8c3756e312fabeb5d1802af7f1f2510&with_watch_providers=${oid}&watch_region=IN`
      )
      .then((response) => {
        setOmlist(response.data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const fetchTVShows = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/tv?api_key=c8c3756e312fabeb5d1802af7f1f2510&with_watch_providers=${oid}&watch_region=IN`
      )
      .then((response) => {
        setOtlist(response.data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    fetchMovies();
    fetchTVShows();
  }, [oid]);

  useEffect(() => {
    function shuffle(array) {
      return array.sort(() => Math.random() - 0.5);
    }

    const list = omlist.concat(otlist);
    setOlist(shuffle(list));
  }, [omlist, otlist]);

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
        setAddlist(result.datalist);
      }
    } catch (error) {
      console.error("Error :", error);
    }
  };
  useEffect(() => {
    {
      localStorage.getItem("movieicons") && getInitialData();
    }
  }, []);
  const storeAll = async (id, media_type) => {
    try {
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
      }
      getInitialData();
    } catch (error) {
      console.error("Error :", error);
    }
  };
  axios
    .get(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=c8c3756e312fabeb5d1802af7f1f2510`
    )
    .then((response) => {
      setrated(response.data.results);
    })
    .catch((error) => {
      console.error(error);
    });
  axios
    .get(
      `https://api.themoviedb.org/3/tv/top_rated?&api_key=c8c3756e312fabeb5d1802af7f1f2510`
    )
    .then((response) => {
      setSeries(response.data.results);
    })
    .catch((error) => {
      console.error(error);
    });
  axios
    .get(
      `https://api.themoviedb.org/3/tv/airing_today?&api_key=c8c3756e312fabeb5d1802af7f1f2510`
    )
    .then((response) => {
      setToday(response.data.results);
    })
    .catch((error) => {
      console.error(error);
    });
  axios
    .get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=c8c3756e312fabeb5d1802af7f1f2510`
    )
    .then((response) => {
      setNowplaying(response.data.results);
    })
    .catch((error) => {
      console.error(error);
    });
  axios
    .get(
      `https://api.themoviedb.org/3/trending/person/day?&api_key=c8c3756e312fabeb5d1802af7f1f2510`
    )
    .then((response) => {
      setPerson(response.data.results);
    })
    .catch((error) => {
      console.error(error);
    });

  return (
    <div className="homedata">
      <div style={{ paddingTop: "70px", zIndex: -1 }} className="container">
        <Splide
          options={{
            rewind: "true",
            perPage: 1,
            perMove: 1,
            width: "100%",
          }}
          aria-label="My Favorite Images"
        >
          {nowplaying
            .filter((e) => {
              if (e.profile_path === null || e.poster_path === null) {
                return false;
              } else {
                return true;
              }
            })
            .map((e) => {
              var genre1 = "";
              var genre2 = "";
              var i;
              for (i of movie) {
                if (i.id === e.genre_ids[0]) {
                  genre1 = i.name;
                }
                if (e.genre_ids[1] && i.id === e.genre_ids[1]) {
                  genre2 = i.name;
                }
              }
              return (
                <>
                  <SplideSlide
                    key={e.id}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Link
                      to={`/movies/movie/${e.id}`}
                      style={{ textDecoration: "none", height: "auto" }}
                      key={e.id}
                    >
                      <div className="movie_card" id="tomb">
                        <div className="info_section">
                          <div className="movie_header">
                            <img
                              className="locandina"
                              src={
                                `https://image.tmdb.org/t/p/w500/` +
                                (e.media_type === "person"
                                  ? e.profile_path
                                  : e.poster_path)
                              }
                              alt="movieimages"
                            />
                            <h1 className="moviename">{e.title}</h1>
                            <h4 className="releaseyear">
                              {e.release_date && e.release_date.slice(0, 4)}
                            </h4>
                            <h5 className="minutes">
                              <StarIcon className="i" />
                              <span>{e.vote_average}</span>
                            </h5>
                            <h5 className="type">
                              {genre2 ? genre1 + ", " + genre2 : genre1}
                            </h5>
                          </div>
                          <div className="movie_desc">
                            <p className="text">
                              {e.overview.length > words
                                ? e.overview.slice(0, words) + "..."
                                : e.overview}
                            </p>
                          </div>
                          <Link
                            to={
                              localStorage.getItem("movieicons")
                                ? "/"
                                : "/signin"
                            }
                            onClick={() => {
                              localStorage.getItem("movieicons") &&
                                storeAll(e.id, e.title ? `movie` : `tv`);
                            }}
                          >
                            <div className="movie_social">
                              {addlist.includes(e.id) ? (
                                <button>
                                  <DoneIcon className="i" />
                                  <span>Added</span>
                                </button>
                              ) : (
                                <button>
                                  <AddIcon className="i" />
                                  <span>Add to Watch list</span>
                                </button>
                              )}
                            </div>
                          </Link>
                        </div>
                        <div
                          className="blur_back tomb_back"
                          style={{
                            background: `url(https://image.tmdb.org/t/p/w500/${
                              e.media_type === "person"
                                ? e.profile_path
                                : e.backdrop_path
                            })`,
                            backgroundSize: "cover",
                            marginRight: "10px",
                          }}
                        ></div>
                      </div>
                    </Link>
                  </SplideSlide>
                </>
              );
            })}
        </Splide>
        <br />
        <h2 className="heading2">Top Rated Movies</h2>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Splide
            options={{
              rewind: "true",
              perPage: 5,
              perMove: 3,
              width: "100%",
              breakpoints: setCard_dict,
            }}
            aria-label="My Favorite Images"
          >
            {rated
              .filter((e) => {
                if (e.profile_path === null || e.poster_path === null) {
                  return false;
                } else {
                  return true;
                }
              })
              .map((e) => {
                return (
                  <>
                    <SplideSlide
                      key={e.id}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Link
                        to={`/movies/movie/${e.id}`}
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
                            <h3>{e.title}</h3>
                            <h5>
                              <StarIcon className="i" />
                              <span>{e.vote_average}</span>
                            </h5>
                            <h6>
                              {e.release_date && e.release_date.slice(0, 4)}
                            </h6>
                            <p>
                              {e.overview && e.overview.slice(0, 100) + "..."}
                            </p>
                            <Link
                              to={
                                localStorage.getItem("movieicons")
                                  ? "/"
                                  : "/signin"
                              }
                              onClick={() => {
                                localStorage.getItem("movieicons") &&
                                  storeAll(e.id, e.title ? `movie` : `tv`);
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
                    </SplideSlide>
                  </>
                );
              })}
          </Splide>
        </div>
        <br />
        <h2 className="heading2">Top Rated Series</h2>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Splide
            options={{
              rewind: "true",
              perPage: 5,
              perMove: 3,
              width: "100%",
              breakpoints: setCard_dict,
            }}
            aria-label="My Favorite Images"
          >
            {series
              .filter((e) => {
                if (e.profile_path === null || e.poster_path === null) {
                  return false;
                } else {
                  return true;
                }
              })
              .map((e) => {
                return (
                  <>
                    <SplideSlide
                      key={e.id}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Link
                        to={`/movies/tv/${e.id}`}
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
                            <h3>{e.name}</h3>
                            <h5>
                              <StarIcon className="i" />
                              <span>{e.vote_average}</span>
                            </h5>
                            <h6>
                              {e.first_air_date && e.first_air_date.slice(0, 4)}
                            </h6>
                            <p>
                              {e.overview && e.overview.slice(0, 100) + "..."}
                            </p>
                            <Link
                              to={
                                localStorage.getItem("movieicons")
                                  ? "/"
                                  : "/signin"
                              }
                              onClick={() => {
                                localStorage.getItem("movieicons") &&
                                  storeAll(e.id, e.title ? `movie` : `tv`);
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
                    </SplideSlide>
                  </>
                );
              })}
          </Splide>
        </div>
        <br />
        <h2 className="heading3">Explore what's streaming</h2>

        <ul className="nav nav-pills row">
          {ott
            .filter((e) => {
              if (e.profile_path === null || e.poster_path === null) {
                return false;
              } else {
                return true;
              }
            })
            .map((e) => {
              return (
                <>
                  <li
                    className="nav-item col-sm"
                    onClick={() => {
                      setOid(e.id);
                    }}
                  >
                    <a
                      className={`back_hov nav-link text-center ${
                        namei === e.name ? "active" : ""
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
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Splide
            options={{
              rewind: "true",
              perPage: 5,
              perMove: 3,
              width: "100%",
              breakpoints: setCard_dict,
            }}
            aria-label="My Favorite Images"
          >
            {olist
              .filter((e) => {
                if (e.profile_path === null || e.poster_path === null) {
                  return false;
                } else {
                  return true;
                }
              })
              .map((e) => {
                return (
                  <>
                    <SplideSlide
                      key={e.id}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
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
                                e.poster_path
                              }
                              alt="none"
                            />
                          </div>
                          <div className="dets">
                            <h3>{e.title ? e.title : e.name}</h3>
                            <h5>
                              <StarIcon className="i" />
                              <span>{e.vote_average}</span>
                            </h5>
                            <h6>
                              {e.release_date && e.release_date.slice(0, 4)}
                            </h6>
                            <p>
                              {e.overview && e.overview.slice(0, 100) + "..."}
                            </p>

                            <Link
                              to={
                                localStorage.getItem("movieicons")
                                  ? "/"
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
                          </div>
                        </div>
                      </Link>
                    </SplideSlide>
                  </>
                );
              })}
          </Splide>
        </div>
        <br></br>
        <h2 className="heading2">Genres</h2>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        ></div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Splide
            options={{
              rewind: "true",
              perPage: 5,
              perMove: 3,
              width: "100%",
              margin: "0 20px",
              breakpoints: setCard_dict,
            }}
            aria-label="My Favorite Images"
          >
            {gen.map((e) => {
              return (
                <>
                  <SplideSlide
                    key={e.tv_id}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      width: "280px",
                      padding: "0 11px",
                      height: "140px",
                    }}
                  >
                    <Link
                      to={`/genres/${e.movie_id}/${e.tv_id}`}
                      style={{ textDecoration: "none" }}
                      key={e.tv_id}
                    >
                      <div key={e.tv_id} className="card">
                        <img
                          src={e.pic}
                          style={{
                            height: "100%",
                            width: "100%",
                            borderRadius: "4px",
                          }}
                          alt="images_poster"
                        />
                      </div>
                    </Link>
                  </SplideSlide>
                </>
              );
            })}
          </Splide>
        </div>
        <br></br>
        <h2 className="heading2">Languages</h2>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Splide
            options={{
              rewind: "true",
              perPage: 5,
              perMove: 3,
              width: "100%",
              margin: "0 20px",
              breakpoints: setCard_dict,
            }}
            aria-label="My Favorite Images"
          >
            {lang.map((e) => {
              return (
                <>
                  <SplideSlide
                    key={e.id}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      width: "280px",
                      padding: "0 11px",
                      height: "140px",
                    }}
                  >
                    <Link
                      to={`/languages/${e.id}`}
                      style={{ textDecoration: "none" }}
                      key={e.id}
                    >
                      <div key={e.id} className="card">
                        <img
                          src={e.pic}
                          style={{
                            height: "100%",
                            width: "100%",
                            borderRadius: "4px",
                          }}
                          alt="images_poster"
                        />
                      </div>
                    </Link>
                  </SplideSlide>
                </>
              );
            })}
          </Splide>
        </div>
        <br></br>
        <h2 className="heading2">Popular Celebs</h2>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Splide
            options={{
              rewind: "true",
              perPage: 5,
              perMove: 3,
              width: "100%",
              margin: "0 20px",
              breakpoints: setCard_dict,
            }}
            aria-label="My Favorite Images"
          >
            {person
              .filter((val) => {
                if (val.profile_path === null) {
                  return false;
                } else {
                  return true;
                }
              })
              .map((e) => {
                return (
                  <>
                    <SplideSlide
                      key={e.id}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        padding: "0 11px",
                      }}
                    >
                      <Link
                        to={`/person/person/${e.id}`}
                        style={{ textDecoration: "none" }}
                        key={e.id}
                      >
                        <div
                          key={e.id}
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <img
                            src={
                              "https://image.tmdb.org/t/p/w500/" +
                              e.profile_path
                            }
                            style={{
                              height: "200px",
                              width: "200px",
                              borderRadius: "50%",
                              marginBottom: "20px",
                              objectFit: "cover",
                            }}
                            alt="images_poster"
                          />
                          <h5 style={{ color: "rgb(215, 213, 213)" }}>
                            {e.name}
                          </h5>
                        </div>
                      </Link>
                    </SplideSlide>
                  </>
                );
              })}
          </Splide>
        </div>
        <br></br>
        <h2 className="heading2">Airing Today</h2>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Splide
            options={{
              rewind: "true",
              perPage: 5,
              perMove: 3,
              width: "100%",
              breakpoints: setCard_dict,
            }}
            aria-label="My Favorite Images"
          >
            {today
              .filter((e) => {
                if (e.profile_path === null || e.poster_path === null) {
                  return false;
                } else {
                  return true;
                }
              })
              .map((e) => {
                return (
                  <>
                    <SplideSlide
                      key={e.id}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Link
                        to={`/movies/tv/${e.id}`}
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
                            <h3>{e.name}</h3>
                            <h5>
                              <StarIcon className="i" />
                              <span>{e.vote_average}</span>
                            </h5>
                            <h6>
                              {e.first_air_date && e.first_air_date.slice(0, 4)}
                            </h6>
                            <p>
                              {e.overview && e.overview.slice(0, 100) + "..."}
                            </p>
                            <Link
                              to={
                                localStorage.getItem("movieicons")
                                  ? "/"
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
                          </div>
                        </div>
                      </Link>
                    </SplideSlide>
                  </>
                );
              })}
          </Splide>
        </div>
        <br></br>
        <br></br>
      </div>
    </div>
  );
};
export default Homedata;
