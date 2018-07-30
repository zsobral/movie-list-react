import React from 'react';

import './ListBuilder.css';

function ListBuilder(props) {

  const {
    children
  } = props;

  return (
    <ul className="list-builder">
      {children}
    </ul>
  );
}

export default ListBuilder;
