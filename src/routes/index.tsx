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
import CityPage from '../pages/city';
// Components
import TopNav from '../components/molecules/TopNav';
import SideNav from '../components/molecules/SideNav';
import RightNav from '../components/molecules/RightNav';

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
							<Route path="/city/:id" component={CityPage} />
							<Route path="*" component={NotFoundPage} />
						</Switch>
					</MainContentContainer>
				</div>
				<RightNav />
			</PageLayoutContainer>
		</Router>
	);
}

export default Routes;
