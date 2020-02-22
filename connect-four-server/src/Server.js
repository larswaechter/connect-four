const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const uuidv4 = require('uuid/v4');

const Game = require('./Game');
const Player = require('./Player');
const Message = require('./Message');

const games = new Map();
const sockets = new Map();

io.on('connection', function(socket) {
	console.log('User connected!');

	socket.on('create-game', (player1Username) => {
		const gameUUID = uuidv4();
		const player1ID = socket.id;

		const game = new Game(gameUUID);

		// Create and store player 1
		game.player1 = new Player(player1ID, player1Username, 1);
		sockets.set(player1ID, socket);

		games.set(gameUUID, game);

		socket.emit('init-game', game.player1.symbol);
		socket.emit('update-game', game);
	});

	socket.on('join-game', (uuid, player2Username) => {
		if (games.has(uuid)) {
			const game = games.get(uuid);

			if (game.player2 === null) {
				const player2ID = socket.id;

				// Create and store player 2
				game.player2 = new Player(player2ID, player2Username, -1);
				sockets.set(player2ID, socket);

				sockets.get(game.player2.id).emit('init-game', game.player2.symbol);

				game.startGame();
				games.set(uuid, game);

				emitGameUpdate(game.player1, game);
				emitGameUpdate(game.player2, game);
			}
		} else {
			socket.emit('not-found');
		}
	});

	socket.on('draw', (uuid, xPos) => {
		if (games.has(uuid)) {
			const game = games.get(uuid);

			if (game.isRunning) {
				console.log('User draw');

				// Valid draw
				if (game.map.addStone(xPos, game.currentPlayer.symbol)) {
					game.updateBasedOnMapStatus();
					games.set(uuid, game);
				}

				emitGameUpdate(game.player1, game);
				emitGameUpdate(game.player2, game);
			} else {
				game.msg = 'Game expired!';
				emitGameUpdate(game.player1, game);
				emitGameUpdate(game.player2, game);
			}
		} else {
			emitError(game.player1);
		}
	});

	socket.on('chat-message', (uuid, msg) => {
		if (games.has(uuid) && msg.length) {
			const game = games.get(uuid);

			const chatMessage = new Message(msg, game.getPlayerByID(socket.id), Date.now());
			game.addChatMessage(chatMessage);

			games.set(uuid, game);

			emitGameUpdate(game.player1, game);
			emitGameUpdate(game.player2, game);
		} else {
			socket.emit('not-found');
		}
	});

	socket.on('disconnect', () => {
		console.log('User disconnected!');

		games.forEach((game, key) => {
			if (game.player1 && game.player1.id === socket.id) {
				handleGameLeave(games.get(key).player2, key, socket.id);
			} else if (game.player2 && game.player2.id === socket.id) {
				handleGameLeave(games.get(key).player1, key, socket.id);
			}
		});
	});
});

http.listen(3000, function() {
	console.log('listening on *:3000');
});

function isPlayerConnected(player) {
	return player && sockets.has(player.id);
}

function emitGameUpdate(player, game) {
	if (isPlayerConnected(player)) sockets.get(player.id).emit('update-game', game);
}

function emitError(player) {
	if (player && sockets.has(game.player.id)) sockets.get(game.player.id).emit('not-found');
}

function handleGameLeave(player, gameKey, socketID) {
	if (player !== null) {
		const game = games.get(gameKey);
		game.isRunning = false;

		emitGameUpdate(player, game);
		sockets.get(player.id).emit('oponent-left');
	}

	games.delete(gameKey);
	sockets.delete(socketID);
}
