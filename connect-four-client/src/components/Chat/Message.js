import React from 'react';

function Message(props) {
	const { msg, userID } = props;

	const isMyMessage = (msg) => {
		return msg.author.id === userID;
	};

	const message = isMyMessage(msg) ? (
		<li className="own">Me: {msg.text}</li>
	) : (
		<li>
			{msg.author.username} : {msg.text}
		</li>
	);

	return <div className="Message">{message}</div>;
}

Message.defaultProps = {
	textBold: '',
	text: '',
	classes: ''
};

export default Message;
