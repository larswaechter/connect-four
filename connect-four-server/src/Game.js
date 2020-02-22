const Map = require('./Map');

class Game {
	constructor(uuid) {
		this.uuid = uuid;

		this.player1 = null;
		this.player2 = null;
		this.currentPlayer = null;

		this.isRunning = false;
		this.isWaitingForPlayer = true;

		this.map = new Map();

		this.messages = [];

		this.msg = '';
	}

	startGame() {
		this.currentPlayer = this.player1;
		this.msg = '';
		this.isRunning = true;
		this.isWaitingForPlayer = false;
	}

	togglePlayer() {
		this.currentPlayer =
			this.currentPlayer.id === this.player1.id ? this.player2 : this.player1;
	}

	getCurrentPlayerUsername() {
		return this.currentPlayer.username;
	}

	updateBasedOnMapStatus() {
		switch (this.map.validateMapStatus()) {
			case 0:
				this.isRunning = false;
				this.msg = `Winner is ${this.getCurrentPlayerUsername()}`;
				break;

			case 1:
				this.isRunning = false;
				this.msg = `No more moves possible!`;
				break;

			case 2:
				this.togglePlayer();
				break;
		}
	}

	getPlayerByID(id) {
		return this.player1.id === id ? this.player1 : this.player2;
	}

	addChatMessage(msg) {
		this.messages.push(msg);
	}
}

module.exports = Game;
