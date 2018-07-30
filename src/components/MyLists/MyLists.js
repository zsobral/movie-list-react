import React from 'react';

import './MyLists.css';

function MyLists(props) {
  return (
    <ul className="my-lists">
      {props.children}
    </ul>
  );
}

export default MyLists;
