import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import './Game.css';

import Alert from '../../components/Alert';
import Board from '../../components/Board';

import socketIOClient from 'socket.io-client';
import Navbar from '../../components/Navbar';
import Chat from '../../components/Chat';

class SitesGame extends Component {
	constructor(props) {
		super(props);

		this.state = {
			lobbyID: props.match.params.uuid,
			userID: 0,
			username: 'Lars',

			game: null,
			socket: null,
			status: 'Loading game...'
		};
	}

	componentDidMount = () => {
		console.log(process.env.REACT_APP_WS_URL);

		const socket = socketIOClient(process.env.REACT_APP_WS_URL);

		socket.on('connect', () => {
			this.setState({ socket, userID: socket.id }, this.setWebsocketListeners);
		});
	};

	setWebsocketListeners = () => {
		const { lobbyID, socket, username } = this.state;

		socket.on('init-game', (symbol) => {
			this.setState({
				symbol,
				status: ''
			});
		});

		socket.on('update-game', (game) => {
			console.log('update-game');
			this.setState({ game });
		});

		socket.on('oponent-left', () => {
			document.getElementById('chat-message').setAttribute('disabled', true);
			this.setState({
				status: 'Your oponent has left the game!'
			});
		});

		socket.on('not-found', () => {
			this.setState({
				status: 'Game not found!'
			});
		});

		// Join / Create Game
		if (lobbyID) socket.emit('join-game', lobbyID, username);
		else socket.emit('create-game', username);
	};

	isMyTurn = () => {
		const { game, userID } = this.state;
		return game.currentPlayer && game.currentPlayer.id === userID;
	};

	render() {
		const { userID, socket, game, status, symbol } = this.state;
		const { match } = this.props;

		const board =
			socket !== null && game !== null ? (
				<Board
					socket={socket}
					game={game}
					lobbyID={match.params.uuid}
					userID={userID}
					symbol={symbol}
					isMyTurn={this.isMyTurn}
				/>
			) : null;

		const chat =
			socket !== null && game !== null ? (
				<Chat socket={socket} game={game} userID={userID} />
			) : null;

		let alert = null;

		if (game && game.isWaitingForPlayer) {
			alert = (
				<Alert
					textBold={game.uuid}
					text=" - Waiting for another player to join!"
					classes={['alert-secondary']}
				/>
			);
		} else if (game && game.isRunning) {
			alert = this.isMyTurn() ? (
				<Alert text="It`s your turn!" classes={['alert-success']} />
			) : (
				<Alert text="It`s your opponent`s turn!" classes={['alert-warning']} />
			);
		} else if (status.length) {
			alert = <Alert text={status} classes={['alert-secondary']} />;
		} else if (game && game.msg.length) {
			alert = <Alert text={game.msg} classes={['alert-secondary']} />;
		}

		return (
			<div className="SitesGame">
				<div className="container">
					<Navbar />
					<div className="row">
						<div className="col-12">{alert}</div>
					</div>
					<div className="row">
						<div className="col-auto">{board}</div>
						<div className="col">{chat}</div>
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(SitesGame);
