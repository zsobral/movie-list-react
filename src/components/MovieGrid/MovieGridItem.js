import React from 'react';

import './MovieGridItem.css';

function MovieGridItem(props) {

  const {
    movie,
    ...otherProps
  } = props;

  return (
    <div className="movie-grid-item" {...otherProps} >
      <div className="movie-poster">
        <img src={movie.poster.medium} alt={movie.title} />
      </div>
    </div>
  );
}

export default MovieGridItem;
