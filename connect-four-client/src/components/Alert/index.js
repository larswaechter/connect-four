import React from 'react'

function Alert(props) {
	const { textBold, text, classes } = props

	return (
		<div className="Alert">
			<div className={`alert ${classes.join(' ')}`}>
				{textBold.length ? <strong>{textBold}</strong> : null} {text}
			</div>
		</div>
	);
}

Alert.defaultProps = {
	textBold: '',
	text: '',
	classes: ''
}

export default Alert;
