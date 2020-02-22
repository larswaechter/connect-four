import React from 'react';

import './Chat.css';
import Message from '../Message/Message';

function Chat(props) {
	const { socket, game, userID } = props;
	const { uuid, messages } = game;

	const handleSubmit = (e) => {
		e.preventDefault();
		const msg = document.getElementById('chat-message').value;

		if (msg && msg.length) {
			socket.emit('chat-message', uuid, msg);
			document.getElementById('chat-message').value = "";
		}
	};

	return (
		<div className="Chat">
			<ul id="messages">
				{messages.map((msg) => {
					return <Message msg={msg} userID={userID} />;
				})}
			</ul>
			<form action="" onSubmit={handleSubmit}>
				<div className="input-group mt-2">
					<input
						type="text"
						className="form-control"
						id="chat-message"
						autoComplete="off"
						placeholder="Enter message..."
						aria-label="Recipient's username"
						aria-describedby="button-addon2"
					></input>
					<div className="input-group-append">
						<button className="btn btn-outline-primary" type="button">
							Send
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}

export default Chat;
