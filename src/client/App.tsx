import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Home from './pages/Home';
import Details from './pages/Details';
import Edit from './pages/Edit';

const App: React.FC<IAppProps> = () => {
	return(
		<BrowserRouter>
			<Container>
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
					<Route exact path="/chirps/details/:chirpid">
						<Details />
					</Route>
					<Route exact path="/chirps/edit/:chirpid">
						<Edit />
					</Route>
					<Route>
						{() => <h1>404</h1>}
					</Route>
				</Switch>
			</Container>
		</BrowserRouter>
	);
}

interface IAppProps {}

export default App;
