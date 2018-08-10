import React from 'react';

import './MovieListItem.css';

function MovieListItem(props) {
  return (
    <li className="movie-list-item">
      <div className="title">
        {props.movie.title}
      </div>
      <img src={props.movie.poster.medium} alt={props.movie.title} />
      <p>{props.movie.overview}</p>
      <div className="trailer">
        <iframe
          title={props.movie.title}
          src={`http://www.youtube.com/embed/${props.movie.trailers[0].key}?rel=0&showinfo=0`}
          frameBorder="0"
          allowFullScreen
        />
      </div>
    </li>
  );
}

export default MovieListItem;
