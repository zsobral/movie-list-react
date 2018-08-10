import React from 'react';

import './MyListsItem.css';

function MyListsItem(props) {

  const {
    list,
    onClick
  } = props;

  const posters = list.movies.map(movie => (
    <img key={movie.id} alt={movie.title} src={movie.poster.medium} />
  ));

  return (
    <li onClick={onClick} className="my-lists-item">
      <div className="my-list-title">
        {list.title}
      </div>
      <div className="posters">
        {posters}
      </div>
    </li>
  );
}

export default MyListsItem;
