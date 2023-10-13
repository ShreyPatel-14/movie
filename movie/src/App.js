import React, { useState } from "react";
import Home from "./Home";
import Movie from "./Movie";
import Genres from "./Genres";
import Languages from "./Languages";
import { BrowserRouter as Router, Routes, Link,Route } from "react-router-dom";
import Person from "./Person";
import Searchbar from "./Searchbar";
import Signup from "./Signup";
import Signin from "./Signin";
import Watchlist from "./Watchlist";
import './card.css'
import "./searchbar.css";
import Logo from './logo3.png';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
function App() {
var [text, setText] = useState("");
var [pagesize, setPagesize] = useState(0);
var [results, setResults] = useState(0);
document.title="CINEMATE"
function getText(e, text) {
    e.preventDefault();
    setText(text);
  }
  function getPages(pages) {
    setPagesize(pages);
  }
  function getResults(res) {
    setResults(res)
  }
  return (
    <body className='homedata' style={{height:"100%"}}>
    <div className='homedata'>
      <Router>
      <Searchbar getText={getText} getPages={getPages} getResults={getResults}/>
      
        <Routes>
          <Route path="/" element={<Home text={text} pagesize={pagesize} results={results} />}></Route>
          <Route path={`/movies/:media_type/:id`} element={<Movie />}></Route>
          <Route path={`/person/:media_type/:id`} element={<Person />}></Route>
          <Route path={`/genres/:movie_id/:tv_id`} element={<Genres />}></Route>
          <Route path={`/languages/:lang`} element={<Languages />}></Route>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/watchlist" element={<Watchlist />} />
        </Routes>
      
<footer className="text-center text-lg-start" style={{backgroundColor:"#042647"}}>


  <section className="pt-2">
    <div className="container text-center text-md-start mt-5">
      <div className="row mt-3">
        <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
      <img
              src={Logo}
              className="logo"
              style={{ width:"250px",
                height:"80px"}}
              alt="logo"
      ></img>    
          <p>
          For each movie/tv-series, You can view detailed information such as poster, title, year, and details.
          </p>
        </div>

        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
          <h6 className="text-uppercase fw-bold mb-4">
            Products
          </h6>
          <p>
            <a href="#!" className="text-reset">Get the CINEMATE App</a>
          </p>
          <p>
            <a href="#!" className="text-reset">Help</a>
          </p>
          <p>
            <a href="#!" className="text-reset">CINEMATEPro</a>
          </p>
          <p>
            <a href="#!" className="text-reset">Box Office Mojo</a>
          </p>
        </div>

        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
          <h6 className="text-uppercase fw-bold mb-4">
            Useful links
          </h6>
          <p>
            <a href="#!" className="text-reset">Press Room</a>
          </p>
          <p>
            <a href="#!" className="text-reset">AdvertisingJobs</a>
          </p>
          <p>
            <a href="#!" className="text-reset">Conditions of Use</a>
          </p>
          <p>
            <a href="#!" className="text-reset">Privacy Policy</a>
          </p>
        </div>

        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
          <h6 className="text-uppercase fw-bold mb-4" >Contact</h6>
          <p><AddLocationIcon style={{marginRight:'5px'}}/> Ahmedabad,Gujarat,INDIA</p>
          <p>
            <EmailIcon style={{marginRight:'5px'}}/> cinemate@123.com
          </p>
          <p><LocalPhoneIcon style={{marginRight:'5px'}}/> + 91 9558095280</p>
          <p><LocalPhoneIcon style={{marginRight:'5px'}}/> + 91 9537802922</p>
        </div>
      </div>
    </div>
  </section>


  <div className="text-center p-4" style={{backgroundColor: "rgba(0, 0, 0, 0.05)"}}>
    © {new Date().getFullYear()} Copyright:
    <a className="text-reset fw-bold" href="/">www.cinemate.com</a>
  </div>
</footer>
</Router>
    </div>
    
    </body>
    
  );
}

export default App;