import React, { useState } from "react";
import Search from "./components/Search";
import axios from "axios";
import Results from "./components/Results";
import Popup from "./components/Popup";

function App() {
  const [state, setState] = useState({
    s: "",
    results: [],
    selected: {}
  });

  const apiurl = "http://www.omdbapi.com/?apikey=d80c08e0";

  const handleInput = e => {
    let s = e.target.value;
    setState(prev => {
      return { ...prev, s: s };
    });
  };

  const search = e => {
    if (e.key === "Enter") {
      axios.get(apiurl + "&s=" + state.s).then(({ data }) => {
        let results = data.Search;
        console.log(results);
        setState(prev => {
          return { ...prev, results: results };
        });
      });
    }
  };

  const openPopup = id => {
    axios.get(apiurl + "&i=" + id).then(({ data }) => {
      let result = data;

      setState(prev => {
        return { ...prev, selected: result };
      });
    });
  };

  const closePopup = () => {
    setState(prevState => {
      return { ...prevState, selected: {} };
    });
  };

  return (
    <div className="App">
      <header>
        <h1>Movie Database</h1>
      </header>
      <main>
        <Search handleInput={handleInput} search={search} />
        <Results results={state.results} openPopup={openPopup} />
        {typeof state.selected.Title != "undefined" ? (
          <Popup selected={state.selected} closePopup={closePopup} />
        ) : (
          false
        )}
      </main>
    </div>
  );
}

export default App;
