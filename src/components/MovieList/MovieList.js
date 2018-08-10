import React from 'react';

import './MovieList.css';

function MovieList(props) {
  return (
    <ul className="movie-list">
      {props.children}
    </ul>
  );
}

export default MovieList;
