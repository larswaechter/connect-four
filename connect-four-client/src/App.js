import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';

import SitesHome from './sites/Home';
import SitesGame from './sites/Game';

function App() {
	return (
		<Router>
			<div className="App">
				<Switch>
					<Route exact path="/">
						<SitesHome />
					</Route>
					<Route exact path="/create">
						<SitesGame />
					</Route>
					<Route exact path="/join/:uuid">
						<SitesGame />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
