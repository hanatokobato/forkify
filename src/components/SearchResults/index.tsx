import React from 'react';

function SearchResults() {
  return (
    <div className="search-results">
      <ul className="results"></ul>

      <div className="pagination"></div>

      <p className="copyright">
        &copy; Copyright by
        <a
          className="twitter-link"
          target="_blank"
          href="https://twitter.com/jonasschmedtman"
        >
          Jonas Schmedtmann
        </a>
        . Use for learning or your portfolio. Don't use to teach. Don't claim as
        your own.
      </p>
    </div>
  );
}

export default SearchResults;
