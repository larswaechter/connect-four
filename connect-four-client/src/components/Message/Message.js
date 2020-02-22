import React from 'react'

function Message(props) {
	const { msg, userID } = props

	const isMyMessage = (msg) => {
		return msg.author.id === userID;
	};

	return (
	<li className={`Message ${isMyMessage(msg) ? 'own' : ''}`}>{msg.author.username}: {msg.text}</li>
	);
}

Message.defaultProps = {
	textBold: '',
	text: '',
	classes: ''
}

export default Message;
