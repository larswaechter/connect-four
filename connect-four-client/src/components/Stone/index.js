import React from 'react'

import './Stone.css';

function Stone(props) {
  const { value, symbol } = props;

  let color;

  if (value === 0) color = ''
  else if (value === symbol) color = 'bg-success';
  else if (value !== symbol) color = 'bg-danger';

  return (
    <div className={`Stone ${color}`}></div>
  );
}

export default Stone;
