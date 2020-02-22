class Map {
	constructor() {
		this.board = Map.generateBoard();
	}

	// Create 7x6 Matrix
	static generateBoard() {
		const board = [];

		for (let i = 0; i < 7; i++) {
			board[i] = [];

			for (let k = 0; k < 6; k++) {
				board[i][k] = 0;
			}
		}

		return board;
	}

	hasWinner() {
		const board = this.board;

		// Check vertically
		for (let i = 0; i < board.length; i++)
			for (let k = 0; k < board[i].length - 3; k++)
				if (Math.abs(board[i][k] + board[i][k + 1] + board[i][k + 2] + board[i][k + 3]) === 4)
					return true;

		// Check horizontally
		for (let i = 0; i < board[0].length; i++)
			for (let k = 0; k < board.length - 3; k++)
				if (Math.abs(board[k][i] + board[k + 1][i] + board[k + 2][i] + board[k + 3][i]) === 4)
					return true;

		// Check diagonal asc
		for (let i = 3; i < board.length; i++)
			for (let k = 0; k < board[i].length - 3; k++)
				if (
					Math.abs(
						board[i][k] + board[i - 1][k + 1] + board[i - 2][k + 2] + board[i - 3][k + 3]
					) === 4
				)
					return true;

		// Check diagonal desc
		for (let i = 3; i < board.length; i++)
			for (let k = 3; k < board[i].length; k++)
				if (
					Math.abs(
						board[i][k] + board[i - 1][k - 1] + board[i - 2][k - 2] + board[i - 3][k - 3]
					) === 4
				)
					return true;

		return false;
	}

	isColFull(col) {
		for (let i = 0; i < this.board[col].length; i++) if (this.board[col][i] === 0) return false;

		return true;
	}

	noMovesPossible() {
		for (let i = 0; i < this.board.length; i++) if (!this.isColFull(i)) return false;

		return true;
	}

	addStone(x, symbol) {
		if (!this.isColFull(x)) {
			const col = this.board[x];

			for (let i = col.length - 1; i >= 0; i--) {
				const currentField = col[i];
				const currentFieldBelow = col[i + 1];

				if (currentField === 0 && currentFieldBelow !== 0) {
					this.board[x][i] = symbol;
					return true;
				}
			}
		}

		return false;
	}

	validateMapStatus() {
		if (this.hasWinner()) {
			return 0;
		} else if (this.noMovesPossible()) {
			return 1;
		} else {
			// Next player
			return 2;
		}
	}
}

module.exports = Map;
