import React from 'react';
import {
	Route,
	Switch,
	BrowserRouter as Router,
} from 'react-router-dom';
import {
	PageLayoutContainer,
	MainContentContainer,
} from './styled-components';
// Pages
import IndexPage from '../pages/index';
import NotFoundPage from '../pages/not-found';
import FavoritesPage from '../pages/favorites';
// Components
import TopNav from '../components/molecules/TopNav';
import SideNav from '../components/molecules/SideNav';
import PageLayout from '../components/molecules/PageLayout';

const Routes = () => {
	return (
		<Router>
			<PageLayoutContainer>
				<SideNav />
				<div>
					<TopNav  />
					<MainContentContainer>
						<Switch>
							<Route exact path="/" component={IndexPage} />
							<Route path="/favorites" component={FavoritesPage} />
							<Route path="*" component={NotFoundPage} />
						</Switch>
					</MainContentContainer>
				</div>
			</PageLayoutContainer>
		</Router>
	);
}

export default Routes;
