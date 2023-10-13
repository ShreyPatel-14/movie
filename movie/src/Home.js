// import React, { useState } from "react";
// import Searchbar from "./Searchbar";
// import Imdb from "./Imdb";
// import { Homedata } from "./Homedata";
// function Home(props) {
//   var [text, setText] = useState("");
//   var [pagesize, setPagesize] = useState(0);
//   var [results, setResults] = useState(0);
//   function getText(e, text) {
//     e.preventDefault();
//     setText(text);
//   }
//   function getPages(pages) {
//     setPagesize(pages);
//   }
//   function getResults(res) {
//     setResults(res)
//   }
//   return (
//     <div>
//       <Searchbar getText={getText} getPages={getPages} getResults={getResults}/>
//       {!text && <Homedata />}
//       {text && <Imdb text={text} pagesize={pagesize} results={results}/>}
//     </div>
//   );
// }

// export default Home;



import React, { useState } from "react";
import Searchbar from "./Searchbar";
import Imdb from "./Imdb";
import { Homedata } from "./Homedata";
function Home(props) {
  // var [text, setText] = useState("");
  // var [pagesize, setPagesize] = useState(0);
  // var [results, setResults] = useState(0);
  // function getText(e, text) {
  //   e.preventDefault();
  //   setText(text);
  // }
  // function getPages(pages) {
  //   setPagesize(pages);
  // }
  // function getResults(res) {
  //   setResults(res)
  // }
  return (
    <div className="homedata" >
      {/* <Searchbar getText={getText} getPages={getPages} getResults={getResults}/> */}
      {!props.text && <Homedata />}
      {props.text && <Imdb text={props.text} pagesize={props.pagesize} results={props.results}/>}
    </div>
  );
}

export default Home;