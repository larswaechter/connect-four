import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import './Home.css';

const SitesHome = (props) => {
	const handleSubmit = (e) => {
		e.preventDefault();
		const uuid = document.getElementById('lobby-uuid').value;

		if (uuid && uuid.length) {
			props.history.push(`/join/${uuid}`);
		}
	};

	return (
		<div className="SitesHome">
			<div className="container">
				<h3 className="mb-4">Connect Four</h3>
				<form action="" onSubmit={handleSubmit}>
					<div className="input-group mb-2">
						<input
							type="text"
							className="form-control"
							id="lobby-uuid"
							autoComplete="off"
							placeholder="Enter Lobby UUID"
							aria-label="Recipient's username"
							aria-describedby="button-addon2"
							required
						></input>
						<div className="input-group-append">
							<button className="btn btn-outline-primary" type="submit">
								Join
							</button>
						</div>
					</div>
					<div className="input-group">
						<Link className="btn btn-block btn-primary" to="/create">
							Create Lobby
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

export default withRouter(SitesHome);
