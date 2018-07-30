import React from 'react';
import { XSquare } from 'react-feather';

import './ListBuilderItem.css';

function ListBuilderItem(props) {

  const {
    movie,
    onRemoveClick
  } = props;

  return (
    <li className="list-builder-item">
      <div className="list-builder-item-wrapper">
        <div className="item-backdrop-wrapper">
          <div className="item-backdrop" style={{ backgroundImage: `url(${movie.backdrop.large})` }} />
          <div className="item-backdrop-overlay" />
        </div>
        <div className="item-title">
          {movie.title}
        </div>
        <div className="item-remove" onClick={onRemoveClick}>
          <XSquare />
        </div>
      </div>
    </li>
  );
}

export default ListBuilderItem;
