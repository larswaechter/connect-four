import React from 'react'

import './Column.css';

import Stone from '../Stone';

function Column(props) {
	const { board, yStones, xPos, addStone, symbol } = props

	const handleClick = () => {
		addStone(xPos)
	}

	return (
		<div className="Column col-auto" onClick={handleClick}>
			{
				yStones.map((stone, yPos) => <Stone value={board[xPos][yPos]} symbol={symbol} key={yPos} />)
			}
		</div>
	);
}

export default Column;
