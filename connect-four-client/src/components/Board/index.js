import React from 'react';

import Column from '../Column';

function Board(props) {
	const { socket, game, symbol, isMyTurn } = props;
	const { map } = game;
	const { board } = map;

	const addStone = (x) => {
		if (game.isRunning && isMyTurn()) {
			socket.emit('draw', game.uuid, x);
		}
	};

	return (
		<div className="Board">
			<div className="row mx-auto" style={{ width: 'max-content', background: 'black' }}>
				{board.map((yStones, x) => (
					<Column
						board={board}
						yStones={yStones}
						xPos={x}
						addStone={addStone}
						symbol={symbol}
						key={x}
					/>
				))}
			</div>
		</div>
	);
}

export default Board;
