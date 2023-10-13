import React, { useState } from "react";
import axios from "axios";
import "./searchbar.css";
import { Link, useNavigate } from "react-router-dom";
import Logo1 from "./logo3.png";
import Avatar from "@mui/material/Avatar";
import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined";
import SearchIcon from "@mui/icons-material/Search";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import BookmarkAddedOutlinedIcon from "@mui/icons-material/BookmarkAddedOutlined";

function Searchbar(props) {
  var [text, setText] = useState("");
  const navigate = useNavigate();
  var [list, setList] = useState([]);
  var [show, setShow] = useState("");
  var [pagesize, setPagesize] = useState(0);
  var [results, setResults] = useState(0);
  function getdata(event) {
    setText(event.target.value);
    if (event.target.value !== "") {
      axios
        .get(
          `https://api.themoviedb.org/3/search/multi?query=${text}&api_key=c8c3756e312fabeb5d1802af7f1f2510`
        )
        .then((response) => {
          setList(response.data.results);
          setPagesize(response.data.total_results);
          setResults(response.data.total_pages);
        })
        .catch((error) => {
          console.error(error);
        });

      setShow("absolute");
    } else {
      setShow("none");
    }
  }
  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };
  return (
    <>
      <div className="navbar">
        <div className="left-nav">
          <Link to="/">
            <img
              src={Logo1}
              className="logo"
              alt="logo"
              onClick={(e) => {
                props.getText(e, "");
                navigate("/");
              }}
            />
          </Link>
        </div>
        <div className="middle-nav">
          <form
            className="search-bar"
            onSubmit={(e) => {
              props.getText(e, text);
              props.getPages(pagesize);
              props.getResults(results);
              setShow("none");
              navigate("/");
            }}
          >
            <input
              type="text"
              className="search"
              placeholder="Search"
              onChange={getdata}
            />

            <SearchIcon
              onClick={(e) => {
                props.getText(e, text);
                props.getPages(pagesize);
                props.getResults(results);
                setShow("none");
                navigate("/");
              }}
              className="i"
            />
          </form>
          <div className="dynamicsb">
            {list &&
              list
                .filter((val) => {
                  if (val.poster_path === null || val.profile_path === null) {
                    return false;
                  } else {
                    return true;
                  }
                })
                .map((val, i) => {
                  return (
                    <>
                      <Link
                        to={
                          val.media_type === "person"
                            ? `/person/${val.media_type}/${val.id}`
                            : `/movies/${val.media_type}/${val.id}`
                        }
                        onClick={() => {
                          setList([]);
                        }}
                        key={i}
                      >
                        <div
                          className="suggestion"
                          style={{ display: show }}
                          key={i}
                        >
                          <img
                            src={
                              `https://image.tmdb.org/t/p/w500/` +
                              (val.media_type === "person"
                                ? val.profile_path
                                : val.poster_path)
                            }
                            alt="icons"
                            className="icon"
                          />

                          <p className="title">
                            {val.media_type === "movie" ? val.title : val.name}
                          </p>
                        </div>
                      </Link>
                    </>
                  );
                })
                .slice(0, 8)}
          </div>
        </div>
        <div className="right-nav">
          <Link
            to={localStorage.getItem("movieicons") ? "/watchlist" : "/signin"}
          >
            <button className="watchlist">
              <BookmarksOutlinedIcon
                className="i"
                style={{ paddingLeft: "0px" }}
              />
              <span>Watchlist</span>
            </button>
          </Link>
          {localStorage.getItem("movieicons") ? (
            <>
              <div className="dropdown">
                <button className="dropdown-btn" aria-haspopup="menu">
                  <Avatar
                    sx={{
                      bgcolor: "white",
                      color: "black",
                      fontSize: "17px",
                      marginRight: "15px",
                      width: "30px",
                      height: "30px",
                      fontWeight: "500",
                    }}
                  >
                    {localStorage
                      .getItem("moviemail")
                      .slice(0, 1)
                      .toUpperCase()}
                  </Avatar>
                  <span className="arrow"></span>
                </button>
                <ul className="dropdown-content" type="none">
                  <li>
                    <Link
                      to="/watchlist"
                      style={{
                        color: "white",
                        display: "flex",
                        justifyContent: "center",
                        fontWeight: "400",
                      }}
                    >
                      <BookmarkAddedOutlinedIcon
                        style={{ paddingRight: "5px" }}
                      />
                      Watchlist
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/"
                      onClick={logout}
                      style={{
                        color: "white",
                        display: "flex",
                        justifyContent: "center",
                        fontWeight: "400",
                      }}
                    >
                      <LogoutIcon style={{ paddingRight: "5px" }} />
                      Sign out
                    </Link>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <Link to="/signin">
              <button>
                <LoginIcon className="loginicon" style={{ fontSize: "27px" }} />
                <span className="btn-content">Signin</span>
              </button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

export default Searchbar;
