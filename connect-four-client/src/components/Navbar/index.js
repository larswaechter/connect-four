import React from 'react';

import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

function Navbar(props) {
	const handleSubmit = (e) => {
		e.preventDefault();
		const uuid = document.getElementById('lobby-uuid').value;

		if (uuid && uuid.length) {
			props.history.push(`/join/${uuid}`);
		}
	};

	return (
		<div className="Navbar">
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark mt-1 mb-3">
				<Link className="navbar-brand" to="/">
					Connect Four
				</Link>

				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav mr-auto"></ul>
					<form className="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
						<input
							className="form-control mr-sm-2"
							type="text"
							placeholder="Enter Lobby UUID"
							aria-label="Search"
							id="lobby-uuid"
							required
						></input>
						<button className="btn btn-outline-success my-2 my-sm-0" type="submit">
							Join
						</button>
					</form>
				</div>
			</nav>
		</div>
	);
}

export default withRouter(Navbar);
