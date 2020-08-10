import React from "react";
import Result from "./Result";

function Results({ results, openPopup }) {
  return (
    <div>
      {typeof results != "undefined" ? (
        <section className="results">
          {results.map(result => (
            <Result key={result.imdbID} result={result} openPopup={openPopup} />
          ))}
        </section>
      ) : (
        <div className="movie-name">Please Enter valid Movie name</div>
      )}
    </div>
  );
}

export default Results;
