import React from 'react';

import './MovieGrid.css';

function MovieGrid(props) {

  const {
    children,
    ...otherProps
  } = props;

  return (
    <div className="movie-grid" {...otherProps}>
      {props.children}
    </div>
  );
}

export default MovieGrid;
